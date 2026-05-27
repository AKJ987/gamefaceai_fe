import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useFlow } from '../../utils/FlowContext';
import './CaptureImagePage.css'

export function CaptureImagePage() {
  const navigate = useNavigate();
  const { nextStep, formData, setFormData  } = useFlow();

  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const redirectGenerateImagePage = (event) => {
    event.preventDefault();
    nextStep();
    navigate('/generate-image')
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        setError(null);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 640, facingMode: "user" }
        });
        streamRef.current = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setIsCameraActive(true);
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setError("Camera access denied. Please check your browser permissions.");
      }
    };

    if (!capturedImage){
      startCamera();
    }

    // Cleanup stream on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturedImage]);

  // Capture Snapshot
  const captureSelfie = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions to match video aspect ratio
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      // Draw the current video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to image URL data string
      const dataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(dataUrl);
      
      canvas.toBlob((blob) => {
        if (blob) {
          setFormData({
            ...formData,
            image: blob
          });
        }
      }, 'image/jpeg');

      setIsCameraActive(false);
    }
  };

  // Retake Photo Reset
  const retakeSelfie = () => {
    setCapturedImage(null);
    setFormData({
      ...formData,
      image: null
    });
  };

  return (
    <main className="page">
      {/* Main UI Card */}
      <section className="glass-panel capture-panel">
        <header className="capture-header">
          <h1 className="page-title">Biometric Scan</h1>
          <p className="page-description">
            Sync your neural link. Capture a clear, front-facing selfie to synthesize your data footprint into the final visual rendering.
          </p>
        </header>

        {/* HUD Camera Feed Wrapper */}
        <div className="hud-viewfinder-wrapper">
          <div className="hud-ring-outer"></div>
          <div className="hud-ring-inner"></div>
          <div className="hud-bracket top-left"></div>
          <div className="hud-bracket top-right"></div>
          <div className="hud-bracket bottom-left"></div>
          <div className="hud-bracket bottom-right"></div>

          <div className="viewfinder-core">
            {error ? (
              <div className="camera-error-message">{error}</div>
            ) : capturedImage ? (
              <img src={capturedImage} alt="Captured preview" className="viewfinder-element captured-preview" />
            ) : (
              <video ref={videoRef} autoPlay playsInline muted className="viewfinder-element live-video" />
            )}
          </div>
        </div>

        {/* Hidden processing canvas element */}
        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

        {/* Shutter Toggle Controls */}
        <div className="shutter-control-box">
          {!capturedImage ? (
            <button type="button" onClick={captureSelfie} disabled={!isCameraActive} className="btn-shutter capture">
              <span className="shutter-dot"></span>
              <span className="shutter-label">Capture Matrix</span>
            </button>
          ) : (
            <button type="button" onClick={retakeSelfie} className="btn-shutter retake">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              <span>Retake Data</span>
            </button>
          )}
        </div>

        {/* Global Next Route Action */}
        <div className="form-actions">
          <button className="btn-primary" disabled={!capturedImage} onClick={redirectGenerateImagePage}>
            <span>Generate AI Identity</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
}
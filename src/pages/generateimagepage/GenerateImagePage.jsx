import { useState, useEffect } from 'react';
import axios from 'axios';
import { useFlow } from '../../utils/FlowContext';
import './GenerateImagePage.css'

export function GenerateImagePage() {
  const { formData } = useFlow();

  const [status, setStatus] = useState('processing'); // 'processing' | 'success' | 'error'
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loadingText, setLoadingText] = useState('Initializing Core...');

  const { name, gender, style, game, image } = formData;

  // Simulated API call sequence for cyberpunk text effects
  useEffect(() => {
    const textPhases = [
      "Initializing Neural Core...",
      "Extracting biometric data tokens...",
      "Injecting Generative AI weights...",
      "Synthesizing latent space matrix...",
      "Compiling final profile identity..."
    ];

    let phaseIndex = 0;
    const interval = setInterval(() => {
      if (phaseIndex < textPhases.length - 1) {
        phaseIndex++;
        setLoadingText(textPhases[phaseIndex]);
      }
    }, 1800);

    const fetchGeneratedIdentity = async () => {
      try {
        const formDataToSend = new FormData();

        formDataToSend.append("name", name);
        formDataToSend.append("gender", gender);
        formDataToSend.append("visual_style", style);
        formDataToSend.append("game", game);
        formDataToSend.append("image", image);

        const response = await axios.post('/api/v1/game/face/ai/', formDataToSend);
        const base64Image = `data:image/png;base64,${response.data.image}`;
        
        setGeneratedImage(base64Image);
        setStatus('success');
        clearInterval(interval);
      } catch (err) {
        console.error(err);
        setStatus('error');
        clearInterval(interval);
      }
    };

    fetchGeneratedIdentity();
    return () => clearInterval(interval);

  }, [name, gender, style, game, image]);

  // Safe client-side anchor fallback download mechanism
  const handleDownload = () => {
    if (!generatedImage) return;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = generatedImage;
    downloadAnchor.download = `${name}.png`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  return (
    <main className="page">
      <section className="glass-panel output-panel">
        <header className="output-header">
          <h1 className="page-title">Identity Synthesis</h1>
          <p className="page-description">
            The grid has processed your neural signature. Your augmented profile file is fully generated and compiled below.
          </p>
        </header>

        {/* Dynamic Display Canvas Frame */}
        <div className={`display-canvas-card ${status}`}>
          {status !== 'success' && (
            <div className="corner-tag-id">SYS_REC_77</div>
          )}
          <span className="card-glare-line"></span>

          {status === 'processing' && (
            <div className="cyber-loader-container">
              <div className="loader-scanner-bar"></div>
              <div className="spinner-cube-mesh">
                <div className="cube-element"></div>
                <div className="cube-element"></div>
                <div className="cube-element"></div>
                <div className="cube-element"></div>
              </div>
              <div className="terminal-log-output">
                <span className="terminal-prompt">&gt;&gt;</span> {loadingText}
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="error-state-box">
              <div className="error-icon">▲</div>
              <h3>SYNTHESIS_CRASH</h3>
              <p>Neural link broken during generative calculation loop.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="image-reveal-wrapper">
              <img src={generatedImage} alt="Generated Neon Avatar Identity" className="compiled-output-render" />
            </div>
          )}
        </div>

        {/* Contextual Primary Action Controls */}
        <div className="action-button-group">
          {status === 'success' && (
            <button type="button" onClick={handleDownload} className="btn-primary btn-download">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              <span>Download File Asset</span>
            </button>
          )}

          {status === 'error' && (
            <button type="button" onClick={() => window.location.reload()} className="btn-primary error-retry">
              <span>Reboot Process Sequence</span>
            </button>
          )}
        </div>

        {/* Generate New Identity — Cyberpunk CTA */}
        {status === 'success' && (
          <button
            type="button"
            className="btn-cyber-regen"
            onClick={() => window.location.reload()}
          >
            <span className="cyber-regen-glitch" aria-hidden="true">GENERATE NEW IDENTITY</span>
            <span className="cyber-regen-label">
              <svg className="cyber-regen-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 4v6h-6"/>
                <path d="M1 20v-6h6"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              GENERATE NEW IDENTITY
            </span>
            <span className="cyber-regen-corner cyber-regen-corner--tl"/>
            <span className="cyber-regen-corner cyber-regen-corner--br"/>
          </button>
        )}

      </section>
    </main>
  );
}
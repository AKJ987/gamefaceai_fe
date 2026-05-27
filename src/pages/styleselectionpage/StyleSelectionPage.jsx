import { useNavigate } from 'react-router';
import { useFlow } from '../../utils/FlowContext';
import './StyleSelectionPage.css'

export function StyleSelectionPage() {
    const navigate = useNavigate();
    const { nextStep, formData, setFormData } = useFlow();

    const updateStyle = (event) => {
        setFormData({
            ...formData,
            style: event.target.value
        });
    }

    const redirectGamePage = (event) => {
        event.preventDefault();
        nextStep();
        navigate('/game');
    };

    return (
        <main className="page">
            <section className="glass-panel selection-panel">

                <header className="selection-header">
                    <h1 className="page-title">Choose Your Aesthetic</h1>
                    <p className="page-description">
                        Select the visual blueprint for your AI generation. This style will dictate how your final avatar blends with your gaming universe.
                    </p>
                </header>

                <form action="/next-page-route" method="POST" className="style-form">

                    <div className="style-grid">

                        <div className="style-card-wrapper">
                            <input type="radio" name="style_choice" id="style_ghibli" value="ghibli" className="sr-only" required onChange={updateStyle} />
                                <label htmlFor="style_ghibli" className="style-card">
                                    <div className="card-inner">
                                        <h2 className="style-name">Ghibli</h2>
                                        <div className="style-image-container">
                                            <img src="src/assets/ghibili.png" alt="Ghibli Style Preview" className="style-image" />
                                        </div>
                                        <div className="selection-badge">Selected</div>
                                    </div>
                                </label>
                        </div>

                        <div className="style-card-wrapper">
                            <input type="radio" name="style_choice" id="style_lego" value="lego" className="sr-only" onChange={updateStyle} />
                                <label htmlFor="style_lego" className="style-card">
                                    <div className="card-inner">
                                        <h2 className="style-name">Lego</h2>
                                        <div className="style-image-container">
                                            <img src="src/assets/lego.png" alt="Lego Style Preview" className="style-image" />
                                        </div>
                                        <div className="selection-badge">Selected</div>
                                    </div>
                                </label>
                        </div>

                        <div className="style-card-wrapper">
                            <input type="radio" name="style_choice" id="style_action_figure" value="action_figure" className="sr-only" onChange={updateStyle} />
                                <label htmlFor="style_action_figure" className="style-card">
                                    <div className="card-inner">
                                        <h2 className="style-name">Action Figure</h2>
                                        <div className="style-image-container">
                                            <img src="src/assets/action_figure.png" alt="Action Figure Style Preview" className="style-image" />
                                        </div>
                                        <div className="selection-badge">Selected</div>
                                    </div>
                                </label>
                        </div>

                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary" onClick={redirectGamePage}  disabled={!formData.style}>
                            <span>Continue Journey</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>

                </form>
            </section>

        </main>
    );
}
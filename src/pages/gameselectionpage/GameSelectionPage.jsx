import { useNavigate } from 'react-router';
import { useFlow } from '../../utils/FlowContext';
import './GameSelectionPage.css'
import unchartedImg from '../../assets/uncharted.jpg';
import cyberpunkImg from '../../assets/cyberpunk.jpg';
import ghostOfTsushimaImg from '../../assets/ghost_of_tsushima.jpg';
import mafiaImg from '../../assets/mafia.jpg';

import readDeadRedemptionImg from '../../assets/read_dead_redemption.jpg';
import gtaViceCityImg from '../../assets/gta_vice_city.png';
import totalOverdoseImg from '../../assets/total_overdose.jpg';
import sleepingDogsImg from '../../assets/sleeping_dogs.jpg';
import assassinsCreedImg from '../../assets/assassin_creed.jpg';

export function GameSelectionPage() {
    const navigate = useNavigate();
    const { nextStep, formData, setFormData } = useFlow();

    const updateGame = (event) => {
        setFormData({
            ...formData,
            game: event.target.value
        });
    }

    const redirectCaptureImagePage = (event) => {
        event.preventDefault();
        nextStep();
        navigate('/capture-image');
    };

    return (
        <main className="page">
            <section className="glass-panel selection-panel">

                <header className="selection-header">
                    <h1 className="page-title">Select Universe</h1>
                    <p className="page-description">
                        Choose the gaming world your avatar will inhabit. Your selection injects distinct thematic elements, gear, and atmospheric lighting into your final AI render.
                    </p>
                </header>

                <form action="/next-page-route" method="POST" className="game-form">

                    <div className="game-grid">

                        <div className="game-card-wrapper">
                            <input type="radio" name="game_choice" id="game_1" value="uncharted" className="sr-only" required onChange={updateGame} />
                                <label htmlFor="game_1" className="game-card">
                                    <div className="card-inner">
                                        <div className="game-image-container">
                                            <img src={unchartedImg} alt="Game Universe Preview" className="game-image" />
                                        </div>
                                        <h2 className="game-name">Uncharted 4</h2>
                                        <div className="selection-badge">Linked</div>
                                    </div>
                                </label>
                        </div>

                        <div className="game-card-wrapper">
                            <input type="radio" name="game_choice" id="game_2" value="cyberpunk" className="sr-only" onChange={updateGame} />
                                <label htmlFor="game_2" className="game-card">
                                    <div className="card-inner">
                                        <div className="game-image-container">
                                            <img src={cyberpunkImg} alt="Game Universe Preview" className="game-image" />
                                        </div>
                                        <h2 className="game-name">Cyberpunk 2077</h2>
                                        <div className="selection-badge">Linked</div>
                                    </div>
                                </label>
                        </div>

                        <div className="game-card-wrapper">
                            <input type="radio" name="game_choice" id="game_3" value="ghost_of_tsushima" className="sr-only" onChange={updateGame} />
                                <label htmlFor="game_3" className="game-card">
                                    <div className="card-inner">
                                        <div className="game-image-container">
                                            <img src={ghostOfTsushimaImg} alt="Game Universe Preview" className="game-image" />
                                        </div>
                                        <h2 className="game-name">Ghost Of Tsushima</h2>
                                        <div className="selection-badge">Linked</div>
                                    </div>
                                </label>
                        </div>

                        <div className="game-card-wrapper">
                            <input type="radio" name="game_choice" id="game_4" value="mafia" className="sr-only" onChange={updateGame} />
                                <label htmlFor="game_4" className="game-card">
                                    <div className="card-inner">
                                        <div className="game-image-container">
                                            <img src={mafiaImg} alt="Game Universe Preview" className="game-image" />
                                        </div>
                                        <h2 className="game-name">Mafia 3</h2>
                                        <div className="selection-badge">Linked</div>
                                    </div>
                                </label>
                        </div>

                        <div className="game-card-wrapper">
                            <input type="radio" name="game_choice" id="game_5" value="read_dead_redemption" className="sr-only" onChange={updateGame} />
                                <label htmlFor="game_5" className="game-card">
                                    <div className="card-inner">
                                        <div className="game-image-container">
                                            <img src={readDeadRedemptionImg} alt="Game Universe Preview" className="game-image" />
                                        </div>
                                        <h2 className="game-name">Read Dead Redemption 2</h2>
                                        <div className="selection-badge">Linked</div>
                                    </div>
                                </label>
                        </div>

                        <div className="game-card-wrapper">
                            <input type="radio" name="game_choice" id="game_6" value="gta_vice_city" className="sr-only" onChange={updateGame} />
                                <label htmlFor="game_6" className="game-card">
                                    <div className="card-inner">
                                        <div className="game-image-container">
                                            <img src={gtaViceCityImg} alt="Game Universe Preview" className="game-image" />
                                        </div>
                                        <h2 className="game-name">GTA Vice City</h2>
                                        <div className="selection-badge">Linked</div>
                                    </div>
                                </label>
                        </div>

                        <div className="game-card-wrapper">
                            <input type="radio" name="game_choice" id="game_7" value="total_overdose" className="sr-only" onChange={updateGame} />
                                <label htmlFor="game_7" className="game-card">
                                    <div className="card-inner">
                                        <div className="game-image-container">
                                            <img src={totalOverdoseImg} alt="Game Universe Preview" className="game-image" />
                                        </div>
                                        <h2 className="game-name">Total Overdose</h2>
                                        <div className="selection-badge">Linked</div>
                                    </div>
                                </label>
                        </div>

                        <div className="game-card-wrapper">
                            <input type="radio" name="game_choice" id="game_8" value="sleeping_dogs" className="sr-only" onChange={updateGame} />
                                <label htmlFor="game_8" className="game-card">
                                    <div className="card-inner">
                                        <div className="game-image-container">
                                            <img src={sleepingDogsImg} alt="Game Universe Preview" className="game-image" />
                                        </div>
                                        <h2 className="game-name">Sleeping Dogs</h2>
                                        <div className="selection-badge">Linked</div>
                                    </div>
                                </label>
                        </div>

                        <div className="game-card-wrapper">
                            <input type="radio" name="game_choice" id="game_9" value="assassins_creed" className="sr-only" onChange={updateGame} />
                                <label htmlFor="game_9" className="game-card">
                                    <div className="card-inner">
                                        <div className="game-image-container">
                                            <img src={assassinsCreedImg} alt="Game Universe Preview" className="game-image" />
                                        </div>
                                        <h2 className="game-name">Assassin's Creed</h2>
                                        <div className="selection-badge">Linked</div>
                                    </div>
                                </label>
                        </div>

                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary" onClick={redirectCaptureImagePage} disabled={!formData.game}>
                            <span>Initialize Camera</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                <circle cx="12" cy="13" r="4"></circle>
                            </svg>
                        </button>
                    </div>

                </form>
            </section>

        </main>
    );
}
import { useNavigate } from 'react-router';
import { useFlow } from '../../utils/FlowContext';
import './LandingPage.css';

export function LandingPage() {
    const navigate = useNavigate();
    const { nextStep } = useFlow();

    const redirectUserPage = () => {
        nextStep();
        navigate('/user');
    };

    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1 className="cyber-title">Game Face AI</h1>
                <p className="cyber-description">
                    Transform your reality. Step into the matrix, pick your ultimate visual style,
                    and let our neural networks forge your custom gaming avatar.
                </p>
                <button className="cyber-btn" onClick={redirectUserPage}>
                    Create Your Character
                </button>
            </div>
        </div>
    );
};
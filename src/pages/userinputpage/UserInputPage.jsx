import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useFlow } from '../../utils/FlowContext';
import './UserInputPage.css';

export function UserInputPage() {
    const navigate = useNavigate();
    const { nextStep, formData, setFormData } = useFlow();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Standard input changes
    const updateFormData = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };

    // Custom dropdown selection handler maintaining same functionality
    const handleSelectGender = (value) => {
        setFormData({ ...formData, gender: value });
        setIsOpen(false);
    };

    // Close dropdown if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const redirectStylePage = (event) => {
        event.preventDefault();
        nextStep();
        navigate('/style')
    };

    return (
        <div className="form-container">
            <div className="form-content">
                <h2 className="form-title">Identity Input</h2>
                <p className="form-description">
                    Establish your network credentials before commencing the avatar synchronization process.
                </p>

                <form className="cyber-form" onSubmit={redirectStylePage}>
                    <div className="form-group">
                        <label htmlFor="name">User Handle / Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="cyber-input"
                            placeholder="ENTER NAME"
                            autoComplete="off"
                            required
                            value={formData.name}
                            onChange={updateFormData}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Biological Profile</label>
                        
                        {/* Custom Cyberpunk Dropdown UI */}
                        <div className="custom-cyber-dropdown" ref={dropdownRef}>
                            <div 
                                className={`cyber-select-trigger ${isOpen ? 'active' : ''} ${!formData.gender ? 'placeholder' : ''}`}
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {formData.gender ? formData.gender.toUpperCase() : 'SELECT GENDER...'}
                                <span className="arrow-indicator">▼</span>
                            </div>
                            
                            {isOpen && (
                                <ul className="cyber-options-menu">
                                    <li 
                                        className="cyber-option" 
                                        onClick={() => handleSelectGender('male')}
                                    >
                                        MALE
                                    </li>
                                    <li 
                                        className="cyber-option" 
                                        onClick={() => handleSelectGender('female')}
                                    >
                                        FEMALE
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Note: changed to type="submit" execution pattern natively handled via standard submission profiles */}
                    <button type="submit" className="cyber-next-btn" disabled={!formData.name || !formData.gender}>
                        Initialize Sequence
                    </button>
                </form>
            </div>
        </div>
    );
}
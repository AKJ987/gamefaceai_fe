import { createContext, useContext, useState } from 'react';

const FlowContext = createContext();

const STEPS = ['/', '/user', '/style', '/game', '/capture-image', '/generate-image'];

export function FlowProvider({ children }) {
    const [currentStep, setCurrentStep] = useState(0);

    // GLOBAL FORM DATA
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        style: '',
        game: '',
        image: null
    });

    const nextStep = () => setCurrentStep(prev => prev + 1);

    const isStepAllowed = (path) => {
        const stepIndex = STEPS.indexOf(path);
        return stepIndex <= currentStep;
    };

    return (
        <FlowContext.Provider value={{ nextStep, isStepAllowed, formData, setFormData }}>
            {children}
        </FlowContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFlow = () => useContext(FlowContext);
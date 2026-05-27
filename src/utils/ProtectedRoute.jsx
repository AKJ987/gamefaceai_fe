import { Navigate, useLocation } from 'react-router';
import { useFlow } from './FlowContext';

export default function ProtectedRoute({ children }) {
    const { isStepAllowed } = useFlow();
    const location = useLocation();

    if (!isStepAllowed(location.pathname)) {
        return <Navigate to="/" replace />;
    }

    return children;
}
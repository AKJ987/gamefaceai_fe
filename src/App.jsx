import { Routes, Route } from 'react-router';
import './App.css';
import { LandingPage } from './pages/landingpage/LandingPage';
import { UserInputPage } from './pages/userinputpage/UserInputPage';
import { StyleSelectionPage } from './pages/styleselectionpage/StyleSelectionPage';
import { GameSelectionPage } from './pages/gameselectionpage/GameSelectionPage';
import { CaptureImagePage } from './pages/captureimagepage/CaptureImagePage';
import { GenerateImagePage } from './pages/generateimagepage/GenerateImagePage';
import { FlowProvider } from './utils/FlowContext';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {

  return (
    <FlowProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<ProtectedRoute><UserInputPage /></ProtectedRoute>} />
        <Route path="/style" element={<ProtectedRoute><StyleSelectionPage /></ProtectedRoute>} />
        <Route path="/game" element={<ProtectedRoute><GameSelectionPage /></ProtectedRoute>} />
        <Route path="/capture-image" element={<ProtectedRoute><CaptureImagePage /></ProtectedRoute>} />
        <Route path="/generate-image" element={<ProtectedRoute><GenerateImagePage /></ProtectedRoute>} />
      </Routes>
    </FlowProvider>
  )
}

export default App

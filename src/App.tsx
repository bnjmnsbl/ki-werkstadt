import { Routes, Route, Navigate } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import Home from './pages/Home'
import CardSelection from './pages/CardSelection'
import IdeaForm from './pages/IdeaForm'
import Review from './pages/Review'
import Done from './pages/Done'

export default function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/cards" element={<CardSelection />} />
        <Route path="/play/idea" element={<IdeaForm />} />
        <Route path="/play/review" element={<Review />} />
        <Route path="/play/done" element={<Done />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </GameProvider>
  )
}

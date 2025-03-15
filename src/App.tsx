import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import APIForm from './components/APIForm';
import GradientBackground from './components/GradientBackground';

function App() {
  return (
    <Router>
      <GradientBackground />
      <div className="relative min-h-screen flex flex-col z-0">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<APIForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BackgroundGradient from './components/BackgroundGradient';
import Navbar from './components/Navbar';
import APIForm from './components/APIForm';

const CreatePage: React.FC = () => {
  return (
    <>
      <BackgroundGradient />
      <Navbar />
      <div className="relative z-10">
        <APIForm />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreatePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BackgroundGradient from './components/BackgroundGradient';
import Navbar from './components/Navbar';
import APIForm from './components/APIForm';
import ProductForm from './components/ProductForm';
import ProductSetupForm from './components/ProductSetupForm';
import EnterpriseCreationForm from './components/EnterpriseCreationForm';

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

const CreateProductPage: React.FC = () => {
  return (
    <>
      <BackgroundGradient />
      <Navbar />
      <div className="relative z-10">
        <ProductForm />
      </div>
    </>
  );
};

const ProductSetupPage: React.FC = () => {
  return (
    <>
      <BackgroundGradient />
      <Navbar />
      <div className="relative z-10">
        <ProductSetupForm />
      </div>
    </>
  );
};

const EnterpriseCreationPage: React.FC = () => {
  return (
    <>
      <BackgroundGradient />
      <Navbar />
      <div className="relative z-10">
        <EnterpriseCreationForm />
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
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/product-setup" element={<ProductSetupPage />} />
        <Route path="/enterprise-creation" element={<EnterpriseCreationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
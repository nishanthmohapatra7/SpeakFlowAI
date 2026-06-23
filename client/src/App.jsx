import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/common/CustomCursor';
import BackgroundFlow from './components/common/BackgroundFlow';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import Features from './pages/Features';
import FeatureDetail from './pages/FeatureDetail';
import AICoach from './pages/AICoach';
import Resources from './pages/Resources';
import About from './pages/About';


function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CustomCursor />
          <div className="min-h-screen bg-violet-50/50 dark:bg-[#0f0a1e] transition-colors duration-300 relative overflow-x-hidden">
            <BackgroundFlow />
            <Navbar />



            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/features" element={<Features />} />
              <Route path="/features/:slug" element={<FeatureDetail />} />
              <Route path="/ai-coach" element={<AICoach />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

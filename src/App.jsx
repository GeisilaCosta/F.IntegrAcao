import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './i18n';

// Modais e páginas
import AuthModal from './components/AuthModal';
import PrivateRoute from './components/PrivateRoute';
import ChatIntegration from './components/ChatIntegration';


// Landing page componentes
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import ChartsSection from './components/ChartsSection';
import ChatSection from './components/ChatSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Páginas protegidas
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import PainelVulneravel from './components/PainelVulneravel';
import PainelApoiador from './components/PainelApoiador';

function App() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userInfo = localStorage.getItem('userInfo');

    if (token && userInfo) {
      try {
        setUser(JSON.parse(userInfo));
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userInfo');
      }
    }
  }, []);

  const handleAuthSuccess = (authData) => {
    setUser(authData.userInfo);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const isAuthenticated = !!user;

  // Landing page renderizada em "/"
  const LandingPageView = () => (
    <div className="App">
      <Header onShowAuth={() => setShowAuthModal(true)} />
      <main>
        <HeroSection onShowAuth={() => setShowAuthModal(true)} />
        <StatsSection />
        <ChartsSection />
        <FeaturesSection />
        <ChatSection />
        <ContactSection />
      </main>
      <Footer />
      <AuthModal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<LandingPageView />} />
        <Route path="/unauthorized" element={<div className="p-5 text-center"><h4>Acesso não autorizado</h4></div>} />

        {/* Rotas protegidas para usuários autenticados */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<Dashboard user={user} onLogout={handleLogout} />} />
          <Route path="/chat" element={<ChatIntegration />} />
          <Route path="/painel-vulneravel" element={<PainelVulneravel />} />
          <Route path="/painel-apoiador" element={<PainelApoiador />} />

        </Route>

        {/* Rotas restritas para administradores */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} allowedRoles={['ADMINISTRADOR']} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>

        {/* Rota fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


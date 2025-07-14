import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './i18n';

// Import components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import ChartsSection from './components/ChartsSection';
import ChatSection from './components/ChatSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';

function App() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Verificar se usuário está logado
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

  // Se usuário está logado, mostrar dashboard
  if (user) {
    return (
      <div className="App">
        <Dashboard user={user} onLogout={handleLogout} />
      </div>
    );
  }

  // Se não está logado, mostrar landing page
  return (
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
}

export default App;


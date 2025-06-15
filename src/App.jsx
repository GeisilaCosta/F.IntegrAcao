import React from 'react';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './i18n';

// Import components
import Header from './components/Header.jsx';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatsSection from './components/StatsSection';
import ChartsSection from './components/ChartsSection';
import ChatSection from './components/ChatSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <ChartsSection />
        <FeaturesSection />
        <ChatSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
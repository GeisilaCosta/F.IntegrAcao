import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Heart, Menu, X, User, MessageCircle } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Replace with actual auth logic

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'offers', href: '#offers' },
    { key: 'requests', href: '#requests' },
    { key: 'contact', href: '#contact' },
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`transition-all ${isScrolled ? 'bg-white bg-opacity-75 shadow-sm' : 'bg-transparent'}`}
    >
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-2 fw-bold">
          {/* <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
               style={{ width: 40, height: 40 }}>
            <Heart className="text-white" size={20} />
          </div> */}
          {/* <span className="text-primary fs-4">IntegrAção</span> */}
          <img src="public\logo1IntegrAcao.png" alt="" style={{ width: 70, height: 70 }}/>
        </Navbar.Brand>

        {/* Mobile Menu Button */}
        <div className="d-flex align-items-center gap-3 d-lg-none " >
          <LanguageSelector />
          <Button
            variant="outline-black"
            size="sm"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Navigation Content */}
        <Navbar.Collapse in={isMobileMenuOpen} className="justify-content-between">
          {/* Main Navigation */}
          <Nav className="mx-auto mx-lg-0">
            {navItems.map((item) => (
              <Nav.Link 
                key={item.key}
                href={item.href}
                className="fw-medium px-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </Nav.Link>
            ))}
          </Nav>

          {/* Right-side Actions */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {/* Desktop Language Selector */}
            <div className="d-none d-lg-block">
              <LanguageSelector />
            </div>
            
            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="d-flex align-items-center gap-2">
                <Button variant="outline-primary" size="sm" className="d-flex align-items-center gap-1">
                  <MessageCircle size={16} />
                  <span className="d-none d-md-inline">{t('nav.messages')}</span>
                </Button>
                <Button variant="outline-primary" size="sm" className="d-flex align-items-center gap-1">
                  <User size={16} />
                  <span className="d-none d-md-inline">{t('nav.profile')}</span>
                </Button>
                <Button variant="outline-danger" size="sm">
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Button variant="outline-dark" size="sm">
                  {t('nav.login')}
                </Button>
                <Button variant="dark" size="sm">
                  {t('nav.register')}
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
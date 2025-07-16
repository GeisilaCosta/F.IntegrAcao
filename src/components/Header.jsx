import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { Menu, X, User, LogIn, UserPlus } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Header = ({ onShowAuth }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar 
      expand="lg" 
      className={`fixed-top transition-all ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}
      style={{
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-3">
          <span className="text-gradient">IntegrAção</span>
        </Navbar.Brand>

        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"
          onClick={toggleMenu}
          className="border-0"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="fw-medium">
              {t('nav.home')}
            </Nav.Link>
            <Nav.Link href="#about" className="fw-medium">
              {t('nav.about')}
            </Nav.Link>
            <Nav.Link href="#features" className="fw-medium">
              {t('nav.features')}
            </Nav.Link>
            <Nav.Link href="#contact" className="fw-medium">
              {t('nav.contact')}
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3">
            <LanguageSelector />
            
            <Dropdown>
              <Dropdown.Toggle 
                variant="outline-primary" 
                className="d-flex align-items-center gap-2"
              >
                <User size={16} />
                Entrar
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={onShowAuth}>
                  <LogIn size={16} className="me-2" />
                  Fazer Login
                </Dropdown.Item>
                <Dropdown.Item onClick={onShowAuth}>
                  <UserPlus size={16} className="me-2" />
                  Criar Conta
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

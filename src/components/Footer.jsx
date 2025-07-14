import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'offers', href: '#offers' },
    { key: 'requests', href: '#requests' },
    { key: 'contact', href: '#contact' },
  ];

  return (
    <footer className="py-5  mt-5 bg-black" >
      <Container>
        <Row className="g-4">
          {/* Brand and Description */}
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="d-flex align-items-center justify-content-center bg-primary rounded-circle" 
                   style={{ width: '40px', height: '40px' }}>
                <Heart className="text-white" size={20} />
              </div>
              <span className="text-primary fs-4 fw-bold">IntegrAção</span>
            </div>
            {/* <p className="text-muted mb-3"> */}
            <p className="text-secondary mb-3">
              {t('footer.description')}
            </p>
            <div className="d-flex gap-2">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline-light"
                  size="sm"
                  className="rounded-circle p-2"
                  href={social.href}
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </Button>
              ))}
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <h6 className="text-primary mb-3">{t('footer.links')}</h6>
            <ul className="list-unstyled">
              {quickLinks.map((link) => (
                <li key={link.key} className="mb-2">
                  <a 
                    href={link.href} 
                    className="text-secondary text-decoration-none"
                    style={{ transition: 'color 0.3s ease' }}
                    onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                    onMouseLeave={(e) => e.target.style.color = '#6c757d'}
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Help Types */}
          <Col lg={3} md={6}>
            <h6 className="text-primary mb-3">Tipos de Ajuda</h6>
            <ul className="list-unstyled ">
              {['housing', 'job', 'health', 'education', 'legal'].map((type) => (
                <li key={type} className="mb-2 text-secondary">
                  <span className="text-secondary">{t(`helpType.${type}`)}</span>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6}>
            <h6 className="text-primary mb-3">{t('footer.contact')}</h6>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-2 text-secondary">
                <Mail size={16} />
                <span>contato@integracao.com</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-secondary">
                <Phone size={16} />
                <span>+55 (11) 9999-9999</span>
              </div>
              <div className="d-flex align-items-center gap-2 text-secondary">
                <MapPin size={16} />
                <span>São Paulo, Brasil</span>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="my-4 border-secondary" />

        {/* Bottom Section */}
        <Row className="align-items-center">
          <Col md={4}>
          <img src="public/Logo loja de semijoia simples e circular minimalista verde-escuro (1).png" className="img-fluid " style={{ maxWidth: '80px', marginLeft: '60px' }} alt="" />
            <p className="text-secondary mb-0">
             Desenvolvido Por Geisila Costa
            </p>
          </Col>
          {/* <Col md={3}>
            <p className="text-secondary mb-0">
             Desenvolvido Por Geisila Costa
            </p>
          </Col> */}
           <Col md={4}>
            <p className="text-secondary mb-0">
             © 2025 IntegrAção. {t('footer.rights')}
            </p>
          </Col>
          <Col md={4} className="text-md-end">
            <div className="d-flex justify-content-md-end gap-3 mt-3 mt-md-0">
              <a href="#" className="text-secondary text-decoration-none small">
                Política de Privacidade
              </a>
              <a href="#" className="text-secondary text-decoration-none small">
                Termos de Uso
              </a>
              <a href="#" className="text-secondary text-decoration-none small">
                Cookies
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;


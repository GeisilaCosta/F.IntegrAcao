import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="hero-gradient text-white py-5" >
      <Container className="h-100">
        <Row className="align-items-center h-100 py-5">
          <Col lg={6} className="animate-fade-in-up">
            <h1 className="display-4 fw-bold mb-4 lh-1">
              {t('hero.title')}
            </h1>
            <p className="lead mb-4 opacity-90">
              {t('hero.subtitle')}
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
              <Button 
                size="lg" 
                className="btn-integracao d-flex align-items-center gap-2 px-4 py-3"
                style={{ borderRadius: '12px' }}
              >
                {t('hero.cta.primary')}
                <ArrowRight size={20} />
              </Button>
              <Button 
                variant="outline-light" 
                size="lg" 
                className="d-flex align-items-center gap-2 px-4 py-3"
                style={{ borderRadius: '12px', borderWidth: '2px' }}
              >
                <Play size={20} />
                {t('hero.cta.secondary')}
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="d-flex flex-wrap gap-4 text-center text-sm-start">
              <div>
                <div className="h4 fw-bold mb-0">1000+</div>
                <small className="opacity-75">Usuários Ativos</small>
              </div>
              <div>
                <div className="h4 fw-bold mb-0">500+</div>
                <small className="opacity-75">Ofertas de Ajuda</small>
              </div>
              <div>
                <div className="h4 fw-bold mb-0">200+</div>
                <small className="opacity-75">Conexões Realizadas</small>
              </div>
            </div>
          </Col>
          
          <Col lg={6} className="text-center animate-slide-in-left">
            <div className="position-relative">
              {/* Placeholder for hero image/illustration */}
              <div 
                className="bg-white bg-opacity-10 rounded-4 p-5 backdrop-blur"
                style={{ minHeight: '400px' }}
              >
                <div className="d-flex align-items-center justify-content-center h-100">
                  <div className="text-center">
                    <div className="bg-white bg-opacity-20 rounded-circle p-4 mb-3 mx-auto" 
                         style={{ width: '150px', height: '150px' }}>
                      <div className="d-flex align-items-center justify-content-center h-100">
                        {/* <span className="display-1">🤝</span> */}
                        <span className="display-1"><img src=".\public\logo1IntegrAcao.png" alt="logo"  style={{ width: '140px', height: '150px' }}/></span>
                      </div>
                    </div>
                    <h4 className="mb-3">Conectando Vidas</h4>
                    <p className="opacity-75">
                      Uma plataforma que une corações e transforma realidades
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="position-absolute top-0 start-0 translate-middle">
                <div className="bg-secondary rounded-circle p-3 animate-pulse-custom">
                  {/* <span className="fs-4">💡</span> */}
                  <span className="fs-4">❤️</span> 
                </div>
              </div>
              <div className="position-absolute top-0 end-0 translate-middle-y">
                <div className="bg-success rounded-circle p-3 animate-pulse-custom" style={{ animationDelay: '1s' }}>
                  {/* <span className="fs-4">❤️</span> */}
                  <span className="fs-4">🤝</span>
                </div>
              </div>
              <div className="position-absolute bottom-0 start-50 translate-middle-x">
                <div className="bg-info rounded-circle p-3 animate-pulse-custom" style={{ animationDelay: '2s' }}>
                  <span className="fs-4">🌟</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Wave separator */}
      <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '100px', overflow: 'hidden' }}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="position-absolute bottom-0 start-0 w-100 h-100"
          style={{ fill: '#ffffff' }}
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                opacity=".25"
          />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                opacity=".5"
          />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;



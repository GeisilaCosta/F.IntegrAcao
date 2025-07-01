import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className="hero-gradient text-white py-5" style={{ marginTop: '76px', minHeight: '90vh' }}>
      <Container className="h-100">
        <Row className="align-items-center h-100 py-5">
          <Col lg={6}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 
                variants={itemVariants}
                className="display-4 fw-bold mb-4 lh-1"
              >
                {t('hero.title')}
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="lead mb-4 opacity-90"
              >
                {t('hero.subtitle')}
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="d-flex flex-column flex-sm-row gap-3 mb-5"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="btn-integracao d-flex align-items-center gap-2 px-4 py-3"
                    style={{ borderRadius: '12px' }}
                  >
                    {t('hero.cta.primary')}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={20} />
                    </motion.div>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline-light" 
                    size="lg" 
                    className="d-flex align-items-center gap-2 px-4 py-3"
                    style={{ borderRadius: '12px', borderWidth: '2px' }}
                  >
                    <Play size={20} />
                    {t('hero.cta.secondary')}
                  </Button>
                </motion.div>
              </motion.div>
              
              {/* Trust indicators with animation */}
              <motion.div 
                variants={itemVariants}
                className="d-flex flex-wrap gap-4 text-center text-sm-start"
              >
                {[
                  { number: '1000+', label: 'Usuários Ativos' },
                  { number: '500+', label: 'Ofertas de Ajuda' },
                  { number: '200+', label: 'Conexões Realizadas' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
                  >
                    <motion.div 
                      className="h4 fw-bold mb-0"
                      animate={{ 
                        textShadow: [
                          "0 0 0px rgba(255,255,255,0.5)",
                          "0 0 10px rgba(255,255,255,0.8)",
                          "0 0 0px rgba(255,255,255,0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {stat.number}
                    </motion.div>
                    <small className="opacity-75">{stat.label}</small>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </Col>
          
          <Col lg={6} className="text-center">
            <motion.div 
              className="position-relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Main illustration container */}
              <motion.div 
                className="bg-white bg-opacity-10 rounded-4 p-5 backdrop-blur"
                style={{ minHeight: '400px' }}
                whileHover={{ 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                  y: -10
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="d-flex align-items-center justify-content-center h-100">
                  <div className="text-center">
                    <motion.div 
                      className="bg-white bg-opacity-20 rounded-circle p-4 mb-3 mx-auto" 
                      style={{ width: '120px', height: '120px' }}
                      variants={pulseVariants}
                      animate="animate"
                    >
                      <div className="d-flex align-items-center justify-content-center h-100">
                        <span className="display-1">🤝</span>
                      </div>
                    </motion.div>
                    
                    <motion.h4 
                      className="mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      Conectando Vidas
                    </motion.h4>
                    
                    <motion.p 
                      className="opacity-75"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >
                      Uma plataforma que une corações e transforma realidades
                    </motion.p>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating elements with enhanced animations */}
              <motion.div 
                className="position-absolute top-0 start-0 translate-middle"
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '0s' }}
              >
                <motion.div 
                  className="bg-warning rounded-circle p-3"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="fs-4">💡</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="position-absolute top-0 end-0 translate-middle-y"
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '1s' }}
              >
                <motion.div 
                  className="bg-success rounded-circle p-3"
                  whileHover={{ scale: 1.2, rotate: -360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="fs-4">❤️</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="position-absolute bottom-0 start-50 translate-middle-x"
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '2s' }}
              >
                <motion.div 
                  className="bg-info rounded-circle p-3"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="fs-4">🌟</span>
                </motion.div>
              </motion.div>
              
              {/* Additional floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="position-absolute"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                    width: '8px',
                    height: '8px',
                    background: 'rgba(255,255,255,0.6)',
                    borderRadius: '50%'
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </motion.div>
          </Col>
        </Row>
      </Container>
      
      {/* Animated wave separator */}
      <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '100px', overflow: 'hidden' }}>
        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="position-absolute bottom-0 start-0 w-100 h-100"
          style={{ fill: '#ffffff' }}
          animate={{
            x: [-50, 50, -50]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                opacity=".25"
          />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                opacity=".5"
          />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </motion.svg>
      </div>
    </section>
  );
};

export default HeroSection;
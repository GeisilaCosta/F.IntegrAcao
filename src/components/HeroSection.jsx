import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = ({ onShowAuth }) => {
  const { t } = useTranslation();

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
      transition: { duration: 0.6, ease: "easeOut" }
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
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.h1 variants={itemVariants} className="display-4 fw-bold mb-4 lh-1">
                {t('hero.title')}
              </motion.h1>
              <motion.p variants={itemVariants} className="lead mb-4 opacity-90">
                {t('hero.subtitle')}
              </motion.p>

              <motion.div variants={itemVariants} className="d-flex flex-column flex-sm-row gap-3 mb-5">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="btn-integracao d-flex align-items-center gap-2 px-4 py-3"
                    style={{ borderRadius: '12px' }}
                    onClick={onShowAuth}
                  >
                    {t('hero.cta.primary')}
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight size={20} />
                    </motion.div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

              {/* Indicadores de confiança */}
              <motion.div variants={itemVariants} className="d-flex flex-wrap gap-4 text-center text-sm-start">
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
              <motion.div 
                className="bg-white bg-opacity-10 rounded-4 p-5 backdrop-blur"
                style={{ minHeight: '400px' }}
                whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.2)", y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="d-flex align-items-center justify-content-center h-100">
                  <div className="text-center">
                    <motion.div 
                      className="bg-white bg-opacity-20 rounded-circle p-4 mb-3 mx-auto" 
                      style={{ width: '170px', height: '160px' }}
                      variants={pulseVariants}
                      animate="animate"
                    >
                      <div className="d-flex align-items-center justify-content-center h-100">
                        {/* <span className="display-1">🤝</span> */}
                         <span className="display-1"><img src=".\public\logo1IntegrAcao.png" alt="logo"  style={{ width: '140px', height: '150px' }}/></span>
                      </div>
                    </motion.div>

                    <motion.h4 className="mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                      Conectando Vidas
                    </motion.h4>
                    <motion.p className="opacity-75" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
                      Uma plataforma que une corações e transforma realidades
                    </motion.p>
                  </div>
                </div>
              </motion.div>

              {/* Floating emojis */}
              {[
                { pos: 'top-0 start-0', icon: '💡', color: 'bg-warning', delay: 0 },
                { pos: 'top-0 end-0', icon: '❤️', color: 'bg-success', delay: 1 },
                { pos: 'bottom-0 start-50', icon: '🌟', color: 'bg-info', delay: 2 }
              ].map((float, i) => (
                <motion.div
                  key={i}
                  className={`position-absolute ${float.pos} translate-middle${float.pos.includes('start-50') ? '-x' : ''}`}
                  variants={floatingVariants}
                  animate="animate"
                  style={{ animationDelay: `${float.delay}s` }}
                >
                  <motion.div 
                    className={`${float.color} rounded-circle p-3`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="fs-4">{float.icon}</span>
                  </motion.div>
                </motion.div>
              ))}

              {/* Floating dots */}
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
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* <path d="M0,0V46.29c47.79,22.2..." opacity=".25" />
          <path d="M0,0V15.81C13,36.92..." opacity=".5" />
          <path d="M0,0V5.63C149.93,59..." /> */}
        </motion.svg>
      </div>
    </section>
  );
};

export default HeroSection;

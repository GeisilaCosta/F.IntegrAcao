import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { HandHeart, Users, MessageSquare, Shield, Search, Star } from 'lucide-react';
import { BsHeart } from 'react-icons/bs';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: HandHeart,
      title: t('features.help.title'),
      description: t('features.help.description'),
      color: 'primary'
    },
    {
      icon: Users,
      title: t('features.offer.title'),
      description: t('features.offer.description'),
      color: 'success'
    },
    {
      icon: MessageSquare,
      title: t('features.connect.title'),
      description: t('features.connect.description'),
      color: 'info'
    },
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Plataforma segura com verificação de usuários e sistema de avaliações.',
      color: 'warning'
    },
    {
      icon: Search,
      title: 'Busca Inteligente',
      description: 'Encontre ofertas e pedidos de ajuda por localização, tipo e urgência.',
      color: 'danger'
    },
    {
      icon: Star,
      title: 'Avaliações',
      description: 'Sistema de avaliações para garantir confiança entre usuários.',
      color: 'secondary'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      rotateX: -15
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const cardHoverVariants = {
    rest: { 
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: { 
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Row className="text-center mb-5">
            <Col>
              <motion.h2 
                className="display-6 fw-bold mb-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {t('features.title')}
              </motion.h2>
              <motion.p 
                className="lead text-muted"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {t('features.subtitle')}
              </motion.p>
            </Col>
          </Row>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} lg={4} md={6}>
                <motion.div
                  variants={cardVariants}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div
                    variants={cardHoverVariants}
                    style={{ height: '100%' }}
                  >
                    <Card className="card-hover border-0 h-100">
                      <Card.Body className="p-4">
                        <motion.div 
                          className={`feature-icon bg-${feature.color} mb-3`}
                          variants={iconVariants}
                        >
                          <feature.icon className="text-white" size={24} />
                        </motion.div>
                        
                        <motion.h5 
                          className="fw-bold mb-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          {feature.title}
                        </motion.h5>
                        
                        <motion.p 
                          className="text-muted mb-0"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          {feature.description}
                        </motion.p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Decorative animated elements */}
        <div className="position-relative mt-5">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              className="d-inline-block p-4 rounded-circle"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <BsHeart size={32} />

            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;


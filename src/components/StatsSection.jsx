import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Users, Heart, MessageCircle, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: Users,
      number: '1,234',
      label: t('stats.users'),
      color: 'primary'
    },
    {
      icon: Heart,
      number: '567',
      label: t('stats.offers'),
      color: 'success'
    },
    {
      icon: MessageCircle,
      number: '890',
      label: t('stats.connections'),
      color: 'info'
    },
    {
      icon: TrendingUp,
      number: '45',
      label: t('stats.cities'),
      color: 'warning'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const numberVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.3
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-5 bg-light">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Nosso Impacto
              </motion.h2>
              <motion.p 
                className="lead text-muted"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Números que mostram como estamos transformando vidas
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
            {stats.map((stat, index) => (
              <Col key={index} lg={3} md={6}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Card className="stats-card border-0 h-100">
                    <Card.Body className="text-center">
                      <motion.div 
                        className={`feature-icon bg-${stat.color} mx-auto mb-3`}
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        <stat.icon className="text-white" size={24} />
                      </motion.div>
                      
                      <motion.div 
                        className={`stats-number text-${stat.color}`}
                        variants={numberVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {stat.number}
                      </motion.div>
                      
                      <motion.h6 
                        className="text-muted mb-0"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {stat.label}
                      </motion.h6>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Animated background elements */}
        <div className="position-relative">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="position-absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: '4px',
                height: '4px',
                background: `var(--integracao-${['primary', 'success', 'info', 'warning'][i % 4]})`,
                borderRadius: '50%',
                opacity: 0.3
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;


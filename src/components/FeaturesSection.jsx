import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { HandHeart, Users, MessageSquare, Shield, Search, Star } from 'lucide-react';

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

  return (
    <section id="about" className="py-5 text-black ">
      <Container>
        <Row className="text-center  mb-5">
          <Col className='animate-fade-in-up border-blue'>
            <h2 className="display-6  fw-bold mb-3">{t('features.title')}</h2>
            <p className="lead text-muted">
              {t('features.subtitle')}
            </p>
          </Col>
        </Row>
        
        <Row className="g-4 ">
          {features.map((feature, index) => (
            <Col key={index} lg={4} md={6}>
              <Card className="card-hover border-0 h-100">
                <Card.Body className="p-4">
                  <div className={`feature-icon bg-${feature.color} mb-3`}>
                    <feature.icon className="text-white" size={24} />
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;
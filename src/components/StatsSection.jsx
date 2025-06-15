import React from 'react';
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

  return (
    <section className="py-5 bg-secondary-subtle">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-6 fw-bold mb-3">Nosso Impacto</h2>
            <p className="lead text-muted">
              Números que mostram como estamos transformando vidas
            </p>
          </Col>
        </Row>
        
        <Row className="g-4">
          {stats.map((stat, index) => (
            <Col key={index} lg={3} md={6}>
              <Card className="stats-card border-0 h-100">
                <Card.Body className="text-center">
                  <div className={`feature-icon bg-${stat.color} mx-auto mb-3`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div className={`stats-number text-${stat.color}`}>
                    {stat.number}
                  </div>
                  <h6 className="text-muted mb-0">{stat.label}</h6>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default StatsSection;


import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
  };

  return (
    <section id="contact" className="py-5 bg-light">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-6 fw-bold mb-3">{t('nav.contact')}</h2>
            <p className="lead text-muted">
              Entre em contato conosco. Estamos aqui para ajudar!
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Contact Form */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4">Envie uma Mensagem</h5>
                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>{t('form.name')}</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Seu nome completo"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>{t('form.email')}</Form.Label>
                        <Form.Control 
                          type="email" 
                          placeholder="seu@email.com"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>{t('form.phone')}</Form.Label>
                        <Form.Control 
                          type="tel" 
                          placeholder="(11) 99999-9999"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Assunto</Form.Label>
                        <Form.Select>
                          <option>Selecione um assunto</option>
                          <option>Dúvidas sobre a plataforma</option>
                          <option>Suporte técnico</option>
                          <option>Parcerias</option>
                          <option>Denúncia</option>
                          <option>Outros</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Mensagem</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          rows={5}
                          placeholder="Descreva sua mensagem..."
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Button 
                        type="submit" 
                        className="btn-integracao d-flex align-items-center gap-2"
                      >
                        <Send size={16} />
                        Enviar Mensagem
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Info */}
          <Col lg={4}>
            <div className="h-100">
              {/* Contact Details */}
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4">Informações de Contato</h5>
                  
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="bg-primary rounded-circle p-2">
                      <Mail className="text-white" size={16} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">Email</h6>
                      <p className="text-muted mb-0">contato@integracao.com</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="bg-success rounded-circle p-2">
                      <Phone className="text-white" size={16} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">Telefone</h6>
                      <p className="text-muted mb-0">+55 (11) 9999-9999</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <div className="bg-info rounded-circle p-2">
                      <MapPin className="text-white" size={16} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">Endereço</h6>
                      <p className="text-muted mb-0">
                        São Paulo, SP<br />
                        Brasil
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Office Hours */}
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-4">Horário de Atendimento</h5>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium">Segunda - Sexta</span>
                      <span className="text-muted">9h - 18h</span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium">Sábado</span>
                      <span className="text-muted">9h - 14h</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium">Domingo</span>
                      <span className="text-muted">Fechado</span>
                    </div>
                  </div>

                  <hr className="my-3" />
                  
                  <div className="text-center">
                    <small className="text-muted">
                      💬 Chat online disponível 24/7
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Row className="mt-5">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-4">Perguntas Frequentes</h5>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <h6 className="fw-bold">Como funciona a plataforma?</h6>
                      <p className="text-muted small mb-0">
                        A IntegrAção conecta pessoas em vulnerabilidade com apoiadores dispostos a ajudar.
                      </p>
                    </div>
                    <div className="mb-3">
                      <h6 className="fw-bold">É gratuito para usar?</h6>
                      <p className="text-muted small mb-0">
                        Sim, nossa plataforma é completamente gratuita para todos os usuários.
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <h6 className="fw-bold">Como posso me tornar um apoiador?</h6>
                      <p className="text-muted small mb-0">
                        Basta se cadastrar como apoiador e começar a publicar ofertas de ajuda.
                      </p>
                    </div>
                    <div className="mb-3">
                      <h6 className="fw-bold">A plataforma é segura?</h6>
                      <p className="text-muted small mb-0">
                        Sim, temos sistema de verificação de usuários e avaliações para garantir segurança.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;



import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { User, Mail, Phone, MapPin, Pencil, Star } from 'lucide-react';
import { userService, reviewService } from '../services/apiServices';

const UserProfile = ({ user, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [score, setScore] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoadingReviews(true);
    try {
      const data = await reviewService.getReviewsByUser(user.id);
      setReviews(data || []);
      if (data?.length) {
        const avg = (data.reduce((acc, r) => acc + r.nota, 0) / data.length).toFixed(1);
        setScore(avg);
      }
    } catch (err) {
      console.error('Erro ao carregar avaliações:', err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const updated = await userService.updateProfile(formData);
      localStorage.setItem('userInfo', JSON.stringify(updated));
      setSuccess('Perfil atualizado com sucesso!');
      onUpdate(updated);
      setShowModal(false);
    } catch (err) {
      setError('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h5>👤 Seu Perfil</h5>
            <Button size="sm" variant="outline-primary" onClick={() => setShowModal(true)}>
              <Pencil size={14} className="me-2" /> Editar Perfil
            </Button>
          </div>
          <Row className="mt-3">
            <Col md={6}>
              <p><User size={16} className="me-2" /> <strong>Nome:</strong> {user.nome}</p>
              <p><Mail size={16} className="me-2" /> <strong>Email:</strong> {user.email}</p>
              <p><Phone size={16} className="me-2" /> <strong>Telefone:</strong> {user.telefone || 'Não informado'}</p>
              {score && (
                <p>
                  <Star size={16} className="me-2 text-warning" />
                  <strong>Reputação:</strong> {score}/5
                </p>
              )}
            </Col>
            <Col md={6}>
              <p><MapPin size={16} className="me-2" /> <strong>Localização:</strong> {user.cidade || '---'}, {user.estado || '---'}</p>
              <p><strong>Tipo:</strong>{' '}
                <Badge bg={user.tipo === 'APOIADOR_VOLUNTARIO' ? 'success' : 'info'}>
                  {user.tipo.replace('_', ' ')}
                </Badge>
              </p>
            </Col>
          </Row>

          {/* Avaliações recebidas */}
          <hr />
          <h6 className="fw-bold mb-3">📝 Avaliações Recebidas</h6>
          {loadingReviews ? (
            <Spinner animation="border" size="sm" />
          ) : reviews.length === 0 ? (
            <p className="text-muted">Este usuário ainda não recebeu avaliações.</p>
          ) : (
            <ul className="list-unstyled">
              {reviews.map((r) => (
                <li key={r.id} className="mb-2">
                  <div className="d-flex align-items-center">
                    <Star size={14} className="text-warning me-2" />
                    <strong>{r.nota}/5</strong> — {r.comentario}
                  </div>
                  <small className="text-muted">por {r.autorNome}</small>
                </li>
              ))}
            </ul>
          )}
        </Card.Body>
      </Card>

      {/* Modal para editar perfil */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control name="nome" value={formData.nome} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control name="telefone" value={formData.telefone} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cidade</Form.Label>
              <Form.Control name="cidade" value={formData.cidade} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control name="estado" value={formData.estado} onChange={handleChange} />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserProfile;


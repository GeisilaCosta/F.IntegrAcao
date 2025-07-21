import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { requestService } from '../services/apiServices';

const helpTypes = [
  'MORADIA', 'EMPREGO', 'SAUDE', 'EDUCACAO',
  'ALIMENTACAO', 'TRANSPORTE', 'JURIDICO', 'OUTROS'
];

const urgencias = ['ALTA', 'MEDIA', 'BAIXA'];

const CreateRequestModal = ({ show, onHide, userId, onSuccess }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipoAjuda: '',
    localizacao: '',
    urgencia: 'MEDIA'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async e => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    await requestService.createRequest({
      titulo: formData.titulo,
      descricao: formData.descricao,
      tiposAjuda: formData.tipoAjuda,        // ✔️ alinhado com enum TiposAjuda
      tiposUrgencia: formData.urgencia,      // ✔️ enum TiposUrgencia
      endereco: formData.localizacao,        // ✔️ corresponde ao campo da entidade

      // relacionamentos
      usuario: { id: userId }                
    });

    onSuccess();
    onHide();
  } catch (err) {
    setError('Erro ao criar pedido. Tente novamente.');
  } finally {
    setLoading(false);
  }
};

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>📢 Criar Pedido de Ajuda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Ex: Preciso de apoio jurídico"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              name="descricao"
              rows={3}
              value={formData.descricao}
              onChange={handleChange}
              required
              placeholder="Explique sua necessidade com clareza..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Ajuda</Form.Label>
            <Form.Select
              name="tipoAjuda"
              value={formData.tipoAjuda}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              {helpTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Urgência</Form.Label>
            <Form.Select
              name="urgencia"
              value={formData.urgencia}
              onChange={handleChange}
              required
            >
              {urgencias.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Localização</Form.Label>
            <Form.Control
              name="localizacao"
              value={formData.localizacao}
              onChange={handleChange}
              required
              placeholder="Cidade ou bairro"
            />
          </Form.Group>
          <Button type="submit" variant="success" disabled={loading}>
            {loading ? 'Enviando...' : 'Criar Pedido'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateRequestModal;

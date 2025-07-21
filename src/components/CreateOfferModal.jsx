import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { offerService } from '../services/apiServices';

const helpTypes = [
  'MORADIA', 'EMPREGO', 'SAUDE', 'EDUCACAO',
  'ALIMENTACAO', 'TRANSPORTE', 'JURIDICO', 'OUTROS'
];

const CreateOfferModal = ({ show, onHide, userId, onSuccess }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    tipoAjuda: '',
    localizacao: ''
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
    await offerService.createOffer({
      titulo: formData.titulo,
      descricao: formData.descricao,
      tiposAjuda: formData.tipoAjuda,       // ✅ nome correto no backend
      endereco: formData.localizacao,       // ✅ corresponde ao campo 'endereco' da entidade
      usuario: { id: userId }               // ✅ associa o apoiador à oferta
    });

    onSuccess(); // ✅ dispara recarregamento ou alerta de sucesso
    onHide();    // ✅ fecha o modal
  } catch (err) {
    setError('Erro ao criar oferta. Tente novamente.');
  } finally {
    setLoading(false);
  }
};


  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>📦 Criar Oferta de Ajuda</Modal.Title>
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
              placeholder="Ex: Ajuda com alimentação"
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
              placeholder="Detalhe como você pretende ajudar..."
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
            <Form.Label>Localização</Form.Label>
            <Form.Control
              name="localizacao"
              value={formData.localizacao}
              onChange={handleChange}
              required
              placeholder="Cidade ou bairro"
            />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Criando...' : 'Criar Oferta'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateOfferModal;

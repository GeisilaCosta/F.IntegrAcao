import React, { useEffect, useState } from 'react';
import {
  Container, Card, ListGroup, Badge, ProgressBar, Toast, Button, Row, Col
} from 'react-bootstrap';
import { HelpCircle, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { pedidoService, avaliacaoService } from '../services/apiServices';

const PainelVulneravel = () => {
  const [pedidos, setPedidos] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Simulação de chamadas à API
    const fetchPedidos = async () => {
      const result = await pedidoService.listarMeusPedidos(); // seu endpoint real
      setPedidos(result);
    };

    const fetchAvaliacoes = async () => {
      const result = await avaliacaoService.avaliacoesRecebidas(); // seu endpoint real
      setAvaliacoes(result);
    };

    fetchPedidos();
    fetchAvaliacoes();

    // Exemplo: alerta de interação recebida
    const alerta = setTimeout(() => {
      setShowToast(true);
    }, 3000);

    return () => clearTimeout(alerta);
  }, []);

  return (
    <Container className="mt-4">
      <h2><HelpCircle className="me-2" size={32} /> Painel de Ajuda</h2>

      {/* Minhas Solicitações */}
      <Card className="my-4">
        <Card.Header>📌 Minhas Solicitações</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {pedidos.map((pedido) => (
              <ListGroup.Item key={pedido.id}>
                <strong>{pedido.titulo}</strong> — {pedido.descricao}
                <Badge bg={
                  pedido.status === 'CONCLUIDO' ? 'success'
                    : pedido.status === 'ACEITO' ? 'primary'
                    : 'warning'
                } className="ms-2">{pedido.status}</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Avaliações recebidas */}
      <Card className="mb-4">
        <Card.Header>⭐ Avaliações Recebidas</Card.Header>
        <Card.Body>
          {avaliacoes.length === 0 ? (
            <p>Você ainda não recebeu avaliações.</p>
          ) : (
            <ListGroup variant="flush">
              {avaliacoes.map((av) => (
                <ListGroup.Item key={av.id}>
                  <Row>
                    <Col md={8}>
                      <strong>{av.autor.nome}</strong>: {av.comentario}
                    </Col>
                    <Col md={4} className="text-end">
                      <Badge bg="info">{av.nota} <Star size={16} /></Badge>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>

      {/* Alerta simulando notificação */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={8000}
        autohide
        bg="light"
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header closeButton>
          <AlertCircle className="me-2 text-warning" />
          <strong className="me-auto">Nova Interação</strong>
        </Toast.Header>
        <Toast.Body>Um voluntário aceitou seu pedido de ajuda! 💙</Toast.Body>
      </Toast>

      
    </Container>
  );
};

export default PainelVulneravel;

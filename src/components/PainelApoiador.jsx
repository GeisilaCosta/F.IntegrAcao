import React, { useEffect, useState } from 'react';
import {
  Container, Card, ListGroup, Badge, ProgressBar, Toast, Button, Row, Col
} from 'react-bootstrap';
import { HeartHandshake, Star, AlertCircle, ClipboardList } from 'lucide-react';
import { pedidoService, avaliacaoService } from '../services/apiServices';

const PainelApoiador = () => {
  const [pedidosDisponiveis, setPedidosDisponiveis] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchPedidos = async () => {
      const result = await pedidoService.listarPedidosDisponiveis(); // seu endpoint
      setPedidosDisponiveis(result);
    };

    const fetchAvaliacoes = async () => {
      const result = await avaliacaoService.avaliacoesRecebidas(); // voluntário sendo avaliado
      setAvaliacoes(result);
    };

    fetchPedidos();
    fetchAvaliacoes();

    // Simulação de alerta de novo pedido compatível
    const alerta = setTimeout(() => {
      setShowToast(true);
    }, 4000);

    return () => clearTimeout(alerta);
  }, []);

  return (
    <Container className="mt-4">
      <h2><HeartHandshake className="me-2" size={32} /> Painel do Apoiador</h2>

      {/* Pedidos disponíveis */}
      <Card className="my-4">
        <Card.Header>📋 Pedidos de Ajuda Disponíveis</Card.Header>
        <Card.Body>
          <ListGroup>
            {pedidosDisponiveis.map((pedido) => (
              <ListGroup.Item key={pedido.id}>
                <strong>{pedido.titulo}</strong>: {pedido.descricao}
                <Button variant="outline-success" size="sm" className="float-end">
                  Oferecer Ajuda
                </Button>
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
            <p>Você ainda não foi avaliado por beneficiários.</p>
          ) : (
            <ListGroup variant="flush">
              {avaliacoes.map((av) => (
                <ListGroup.Item key={av.id}>
                  <Row>
                    <Col md={8}>
                      <strong>{av.usuarioAvaliado.nome}</strong>: {av.comentario}
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

      {/* Alerta de novo pedido */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={9000}
        autohide
        bg="light"
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header closeButton>
          <AlertCircle className="me-2 text-primary" />
          <strong className="me-auto">Novo Pedido Compatível</strong>
        </Toast.Header>
        <Toast.Body>Há um pedido de ajuda que se encaixa na sua área de atuação!</Toast.Body>
      </Toast>

      
    </Container>
  );
};

export default PainelApoiador;

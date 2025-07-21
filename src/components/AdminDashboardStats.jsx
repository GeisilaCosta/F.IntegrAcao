import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { adminService } from '../services/apiServices';

const AdminDashboardStats = () => {
  const [loading, setLoading] = useState(true);
  const [resumo, setResumo] = useState({ usuarios: 0, ofertas: 0, pedidos: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await adminService.getDashboardStats();
        setResumo({
          usuarios: stats.totalUsuarios,
          ofertas: stats.totalOfertas,
          pedidos: stats.totalPedidos
        });
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <Row><Col className="text-center"><Spinner animation="border" /></Col></Row>;
  }

  return (
    <Row className="mb-4">
      <Col md={4}>
        <Card className="text-center border-info">
          <Card.Body>
            <Card.Title>Usuários Cadastrados</Card.Title>
            <h2>{resumo.usuarios}</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center border-success">
          <Card.Body>
            <Card.Title>Ofertas de Ajuda</Card.Title>
            <h2>{resumo.ofertas}</h2>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center border-danger">
          <Card.Body>
            <Card.Title>Pedidos de Ajuda</Card.Title>
            <h2>{resumo.pedidos}</h2>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminDashboardStats;


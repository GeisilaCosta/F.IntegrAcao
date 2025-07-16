import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Tabs, Tab, Button, Badge } from 'react-bootstrap';
import { adminService, offerService, requestService } from '../services/apiServices';
import { Shield, Users, FileWarning, Filter } from 'lucide-react';

const AdminPanel = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('usuarios');

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchOffers();
    fetchRequests();
  }, []);

  const fetchStats = async () => {
    const data = await adminService.getStatistics();
    setStats(data);
  };

  const fetchUsers = async () => {
    const userList = await adminService.getUsers();
    setUsers(userList);
  };

  const fetchOffers = async () => {
    const data = await offerService.getOffers();
    setOffers(data);
  };

  const fetchRequests = async () => {
    const data = await requestService.getRequests();
    setRequests(data);
  };

  const handleModerate = async (contentId, action) => {
    try {
      await adminService.moderateContent(contentId, action);
      fetchUsers();
      fetchOffers();
      fetchRequests();
    } catch (err) {
      console.error('Erro ao moderar:', err);
    }
  };

  const getBadgeColor = (type) => {
    const map = {
      'APOIADOR_VOLUNTARIO': 'success',
      'PESSOA_VULNERABILIDADE': 'info',
      'ADMINISTRADOR': 'dark'
    };
    return map[type] || 'secondary';
  };

  return (
    <Container className="py-5">
      <Row className="mb-4 text-center">
        <Col>
          <h2 className="fw-bold"><Shield size={28} className="me-2" /> Painel Administrativo</h2>
          <p className="text-muted">Monitoramento e moderação</p>
        </Col>
      </Row>

      {/* Estatísticas */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <h6><Users size={16} className="me-2" />Usuários</h6>
              <h4 className="fw-bold">{stats?.totalUsuarios || '...'}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h6><Filter size={16} className="me-2" />Ofertas</h6>
              <h4 className="fw-bold">{stats?.totalOfertas || '...'}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h6><FileWarning size={16} className="me-2" />Pedidos</h6>
              <h4 className="fw-bold">{stats?.totalPedidos || '...'}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Aba de gerenciamento */}
      <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-3">
        <Tab eventKey="usuarios" title="Usuários">
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Cidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.nome}</td>
                  <td>{u.email}</td>
                  <td><Badge bg={getBadgeColor(u.tipo)}>{u.tipo.replace('_', ' ')}</Badge></td>
                  <td>{u.cidade || '---'}</td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => handleModerate(u.id, 'suspender')}>Suspender</Button>{' '}
                    <Button variant="outline-success" size="sm" onClick={() => handleModerate(u.id, 'reativar')}>Ativar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="ofertas" title="Ofertas">
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((o) => (
                <tr key={o.id}>
                  <td>{o.titulo}</td>
                  <td>{o.descricao}</td>
                  <td><Badge bg="primary">{o.tipoAjuda}</Badge></td>
                  <td><Badge bg="secondary">{o.status}</Badge></td>
                  <td>
                    <Button variant="outline-warning" size="sm" onClick={() => handleModerate(o.id, 'pausar')}>Pausar</Button>{' '}
                    <Button variant="outline-danger" size="sm" onClick={() => handleModerate(o.id, 'remover')}>Remover</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="pedidos" title="Pedidos">
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Urgência</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.titulo}</td>
                  <td>{r.descricao}</td>
                  <td><Badge bg="info">{r.tipoAjuda}</Badge></td>
                  <td><Badge bg={r.urgencia === 'ALTA' ? 'danger' : r.urgencia === 'MEDIA' ? 'warning' : 'secondary'}>{r.urgencia}</Badge></td>
                  <td><Badge bg="secondary">{r.status}</Badge></td>
                  <td>
                    <Button variant="outline-warning" size="sm" onClick={() => handleModerate(r.id, 'pausar')}>Pausar</Button>{' '}
                    <Button variant="outline-danger" size="sm" onClick={() => handleModerate(r.id, 'remover')}>Remover</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminPanel;


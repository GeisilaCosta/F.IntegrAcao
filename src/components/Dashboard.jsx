import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Modal, Alert } from 'react-bootstrap';
import { Plus, Search, Filter, MapPin, Clock, User, Heart, MessageCircle } from 'lucide-react';
import { offerService, requestService, applicationService } from '../services/apiServices';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('offers');
  const [offers, setOffers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [myOffers, setMyOffers] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const helpTypes = [
    'MORADIA', 'EMPREGO', 'SAUDE', 'EDUCACAO', 
    'ALIMENTACAO', 'TRANSPORTE', 'JURIDICO', 'OUTROS'
  ];

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'offers') {
        const offersData = await offerService.getOffers();
        setOffers(offersData);
      } else if (activeTab === 'requests') {
        const requestsData = await requestService.getRequests();
        setRequests(requestsData);
      } else if (activeTab === 'my-offers') {
        const myOffersData = await offerService.getOffersByUser(user.id);
        setMyOffers(myOffersData);
      } else if (activeTab === 'my-requests') {
        const myRequestsData = await requestService.getRequestsByUser(user.id);
        setMyRequests(myRequestsData);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (offerId) => {
    try {
      await applicationService.createApplication({
        ofertaId: offerId,
        mensagem: 'Gostaria de ajudar com esta oferta!'
      });
      alert('Candidatura enviada com sucesso!');
      loadData();
    } catch (error) {
      alert('Erro ao enviar candidatura. Tente novamente.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getTypeColor = (type) => {
    const colors = {
      'MORADIA': 'primary',
      'EMPREGO': 'success',
      'SAUDE': 'danger',
      'EDUCACAO': 'info',
      'ALIMENTACAO': 'warning',
      'TRANSPORTE': 'secondary',
      'JURIDICO': 'dark',
      'OUTROS': 'light'
    };
    return colors[type] || 'secondary';
  };

  const getStatusColor = (status) => {
    const colors = {
      'ATIVO': 'success',
      'PAUSADO': 'warning',
      'CONCLUIDO': 'secondary',
      'CANCELADO': 'danger'
    };
    return colors[status] || 'secondary';
  };

  const filteredItems = (items) => {
    return items.filter(item => {
      const matchesSearch = item.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !filterType || item.tipoAjuda === filterType;
      return matchesSearch && matchesType;
    });
  };

  const renderOfferCard = (offer, showActions = true) => (
    <Card key={offer.id} className="mb-3 h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="fw-bold mb-0">{offer.titulo}</h6>
          <Badge bg={getTypeColor(offer.tipoAjuda)}>
            {offer.tipoAjuda}
          </Badge>
        </div>
        
        <p className="text-muted mb-3">{offer.descricao}</p>
        
        <div className="d-flex align-items-center gap-3 mb-3 small text-muted">
          <span>
            <MapPin size={14} className="me-1" />
            {offer.localizacao}
          </span>
          <span>
            <Clock size={14} className="me-1" />
            {formatDate(offer.dataPublicacao)}
          </span>
          <span>
            <User size={14} className="me-1" />
            {offer.apoiador?.nome}
          </span>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <Badge bg={getStatusColor(offer.status)}>
            {offer.status}
          </Badge>
          
          {showActions && user.tipoUsuario === 'VULNERAVEL' && (
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => handleApply(offer.id)}
            >
              <Heart size={14} className="me-1" />
              Candidatar-se
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  const renderRequestCard = (request, showActions = true) => (
    <Card key={request.id} className="mb-3 h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="fw-bold mb-0">{request.titulo}</h6>
          <div className="d-flex gap-2">
            <Badge bg={getTypeColor(request.tipoAjuda)}>
              {request.tipoAjuda}
            </Badge>
            {request.urgencia === 'ALTA' && (
              <Badge bg="danger">Urgente</Badge>
            )}
          </div>
        </div>
        
        <p className="text-muted mb-3">{request.descricao}</p>
        
        <div className="d-flex align-items-center gap-3 mb-3 small text-muted">
          <span>
            <MapPin size={14} className="me-1" />
            {request.localizacao}
          </span>
          <span>
            <Clock size={14} className="me-1" />
            {formatDate(request.dataPublicacao)}
          </span>
          <span>
            <User size={14} className="me-1" />
            {request.usuarioVulneravel?.nome}
          </span>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <Badge bg={getStatusColor(request.status)}>
            {request.status}
          </Badge>
          
          {showActions && user.tipoUsuario === 'APOIADOR' && (
            <Button
              size="sm"
              variant="outline-success"
              onClick={() => {/* Implementar oferta de ajuda */}}
            >
              <MessageCircle size={14} className="me-1" />
              Oferecer Ajuda
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="py-4">
      {/* Header do Dashboard */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Bem-vindo, {user.nome}!</h2>
              <p className="text-muted mb-0">
                {user.tipoUsuario === 'VULNERAVEL' ? 
                  'Encontre ajuda para suas necessidades' : 
                  'Ajude pessoas em sua comunidade'
                }
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="primary"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus size={16} className="me-2" />
                {user.tipoUsuario === 'VULNERAVEL' ? 'Pedir Ajuda' : 'Oferecer Ajuda'}
              </Button>
              <Button variant="outline-secondary" onClick={onLogout}>
                Sair
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Filtros */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar por título ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            {helpTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button variant="outline-primary" className="w-100">
            <Filter size={16} className="me-2" />
            Filtrar
          </Button>
        </Col>
      </Row>

      {/* Navegação por Tabs */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex gap-2 border-bottom">
            <Button
              variant={activeTab === 'offers' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('offers')}
              className="border-0 rounded-0"
            >
              Ofertas Disponíveis
            </Button>
            <Button
              variant={activeTab === 'requests' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('requests')}
              className="border-0 rounded-0"
            >
              Pedidos de Ajuda
            </Button>
            <Button
              variant={activeTab === 'my-offers' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('my-offers')}
              className="border-0 rounded-0"
            >
              Minhas Ofertas
            </Button>
            <Button
              variant={activeTab === 'my-requests' ? 'primary' : 'outline-primary'}
              onClick={() => setActiveTab('my-requests')}
              className="border-0 rounded-0"
            >
              Meus Pedidos
            </Button>
          </div>
        </Col>
      </Row>

      {/* Conteúdo das Tabs */}
      <Row>
        {loading ? (
          <Col className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </Col>
        ) : (
          <>
            {activeTab === 'offers' && (
              <>
                {filteredItems(offers).length === 0 ? (
                  <Col className="text-center py-5">
                    <p className="text-muted">Nenhuma oferta encontrada.</p>
                  </Col>
                ) : (
                  filteredItems(offers).map(offer => (
                    <Col key={offer.id} lg={4} md={6} className="mb-3">
                      {renderOfferCard(offer)}
                    </Col>
                  ))
                )}
              </>
            )}

            {activeTab === 'requests' && (
              <>
                {filteredItems(requests).length === 0 ? (
                  <Col className="text-center py-5">
                    <p className="text-muted">Nenhum pedido encontrado.</p>
                  </Col>
                ) : (
                  filteredItems(requests).map(request => (
                    <Col key={request.id} lg={4} md={6} className="mb-3">
                      {renderRequestCard(request)}
                    </Col>
                  ))
                )}
              </>
            )}

            {activeTab === 'my-offers' && (
              <>
                {myOffers.length === 0 ? (
                  <Col className="text-center py-5">
                    <p className="text-muted">Você ainda não criou nenhuma oferta.</p>
                    <Button
                      variant="primary"
                      onClick={() => setShowCreateModal(true)}
                    >
                      Criar Primeira Oferta
                    </Button>
                  </Col>
                ) : (
                  myOffers.map(offer => (
                    <Col key={offer.id} lg={4} md={6} className="mb-3">
                      {renderOfferCard(offer, false)}
                    </Col>
                  ))
                )}
              </>
            )}

            {activeTab === 'my-requests' && (
              <>
                {myRequests.length === 0 ? (
                  <Col className="text-center py-5">
                    <p className="text-muted">Você ainda não criou nenhum pedido.</p>
                    <Button
                      variant="primary"
                      onClick={() => setShowCreateModal(true)}
                    >
                      Criar Primeiro Pedido
                    </Button>
                  </Col>
                ) : (
                  myRequests.map(request => (
                    <Col key={request.id} lg={4} md={6} className="mb-3">
                      {renderRequestCard(request, false)}
                    </Col>
                  ))
                )}
              </>
            )}
          </>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;


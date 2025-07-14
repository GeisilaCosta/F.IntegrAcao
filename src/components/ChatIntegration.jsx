import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Alert } from 'react-bootstrap';
import { MessageCircle, Users, BarChart3, Activity, Send, User, Bot } from 'lucide-react';
import io from 'socket.io-client';

const ChatIntegration = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('general');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);

  const rooms = [
    { id: 'general', name: 'Chat Geral', icon: MessageCircle, color: 'primary' },
    { id: 'support', name: 'Suporte', icon: Bot, color: 'success' },
    { id: 'offers', name: 'Ofertas', icon: Users, color: 'info' }
  ];

  useEffect(() => {
    // Conectar ao serviço de chat
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setConnected(true);
      console.log('Conectado ao chat!');
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
      console.log('Desconectado do chat');
    });

    newSocket.on('room_joined', (data) => {
      setIsJoined(true);
      console.log('Entrou na sala:', data);
    });

    newSocket.on('new_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('user_typing', (data) => {
      if (data.is_typing) {
        setTypingUsers(prev => [...prev.filter(u => u !== data.username), data.username]);
      } else {
        setTypingUsers(prev => prev.filter(u => u !== data.username));
      }
    });

    // Buscar analytics
    fetchAnalytics();

    return () => {
      newSocket.close();
    };
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chat/analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Erro ao buscar analytics:', error);
    }
  };

  const joinRoom = () => {
    if (socket && username.trim()) {
      socket.emit('join_room', {
        room_id: currentRoom,
        username: username.trim()
      });
      
      // Buscar histórico da sala
      fetchRoomHistory(currentRoom);
    }
  };

  const fetchRoomHistory = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/chat/history/${roomId}`);
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && newMessage.trim() && isJoined) {
      socket.emit('send_message', {
        room_id: currentRoom,
        message: newMessage.trim(),
        username: username
      });
      setNewMessage('');
    }
  };

  const handleTyping = (isTyping) => {
    if (socket && isJoined) {
      socket.emit('typing', {
        room_id: currentRoom,
        username: username,
        is_typing: isTyping
      });
    }
  };

  const switchRoom = (roomId) => {
    setCurrentRoom(roomId);
    setMessages([]);
    setIsJoined(false);
    if (socket && username.trim()) {
      socket.emit('join_room', {
        room_id: roomId,
        username: username.trim()
      });
      fetchRoomHistory(roomId);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section className="py-5">
      <Container>
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-6 fw-bold mb-3">Chat em Tempo Real</h2>
            <p className="lead text-muted">
              Conecte-se com a comunidade IntegrAção
            </p>
          </Col>
        </Row>

        {/* Status de Conexão */}
        <Row className="mb-4">
          <Col>
            <Alert variant={connected ? 'success' : 'warning'}>
              <Activity size={16} className="me-2" />
              {connected ? 'Conectado ao chat' : 'Conectando...'}
              {analytics && (
                <span className="ms-3">
                  <Users size={16} className="me-1" />
                  {analytics.active_users} usuários online
                </span>
              )}
            </Alert>
          </Col>
        </Row>

        <Row>
          {/* Salas de Chat */}
          <Col lg={3} className="mb-4">
            <Card>
              <Card.Header>
                <h6 className="mb-0">Salas de Chat</h6>
              </Card.Header>
              <Card.Body className="p-0">
                {rooms.map((room) => {
                  const IconComponent = room.icon;
                  return (
                    <div
                      key={room.id}
                      className={`p-3 border-bottom cursor-pointer ${
                        currentRoom === room.id ? 'bg-light' : ''
                      }`}
                      onClick={() => switchRoom(room.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center">
                        <div className={`bg-${room.color} rounded-circle p-2 me-3`}>
                          <IconComponent className="text-white" size={16} />
                        </div>
                        <div>
                          <div className="fw-medium">{room.name}</div>
                          {analytics && analytics.messages_by_room[room.id] && (
                            <small className="text-muted">
                              {analytics.messages_by_room[room.id]} mensagens
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>

            {/* Analytics */}
            {analytics && (
              <Card className="mt-3">
                <Card.Header>
                  <h6 className="mb-0">
                    <BarChart3 size={16} className="me-2" />
                    Estatísticas
                  </h6>
                </Card.Header>
                <Card.Body>
                  <div className="mb-2">
                    <small className="text-muted">Total de Mensagens</small>
                    <div className="fw-bold">{analytics.total_messages}</div>
                  </div>
                  <div className="mb-2">
                    <small className="text-muted">Usuários Ativos</small>
                    <div className="fw-bold">{analytics.active_users}</div>
                  </div>
                  <div>
                    <small className="text-muted">Salas Ativas</small>
                    <div className="fw-bold">{Object.keys(analytics.messages_by_room).length}</div>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>

          {/* Chat Principal */}
          <Col lg={9}>
            <Card style={{ height: '600px' }}>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                  {rooms.find(r => r.id === currentRoom)?.name || 'Chat'}
                </h6>
                <Badge bg="secondary">{messages.length} mensagens</Badge>
              </Card.Header>

              {!isJoined ? (
                <Card.Body className="d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <h5>Entre no Chat</h5>
                    <Form onSubmit={(e) => { e.preventDefault(); joinRoom(); }}>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Seu nome"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Button 
                        type="submit" 
                        variant="primary"
                        disabled={!connected || !username.trim()}
                      >
                        Entrar na Sala
                      </Button>
                    </Form>
                  </div>
                </Card.Body>
              ) : (
                <>
                  {/* Mensagens */}
                  <Card.Body 
                    className="overflow-auto"
                    style={{ height: '450px' }}
                  >
                    {messages.map((message) => (
                      <div key={message.id} className="mb-3">
                        <div className="d-flex align-items-start gap-2">
                          <div className={`rounded-circle p-2 ${
                            message.type === 'bot' ? 'bg-success' : 'bg-primary'
                          }`}>
                            {message.type === 'bot' ? (
                              <Bot className="text-white" size={16} />
                            ) : (
                              <User className="text-white" size={16} />
                            )}
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <span className="fw-medium">{message.username}</span>
                              <small className="text-muted">
                                {formatTime(message.timestamp)}
                              </small>
                              {message.type === 'bot' && (
                                <Badge bg="success" className="small">Bot</Badge>
                              )}
                            </div>
                            <div>{message.message}</div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Indicador de digitação */}
                    {typingUsers.length > 0 && (
                      <div className="text-muted small">
                        {typingUsers.join(', ')} {typingUsers.length === 1 ? 'está' : 'estão'} digitando...
                      </div>
                    )}
                  </Card.Body>

                  {/* Input de Mensagem */}
                  <Card.Footer>
                    <Form onSubmit={sendMessage}>
                      <div className="d-flex gap-2">
                        <Form.Control
                          type="text"
                          placeholder="Digite sua mensagem..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onFocus={() => handleTyping(true)}
                          onBlur={() => handleTyping(false)}
                        />
                        <Button 
                          type="submit" 
                          variant="primary"
                          disabled={!newMessage.trim()}
                        >
                          <Send size={16} />
                        </Button>
                      </div>
                    </Form>
                  </Card.Footer>
                </>
              )}
            </Card>
          </Col>
        </Row>

        {/* Informações do Chat */}
        <Row className="mt-4">
          <Col>
            <Card className="bg-light">
              <Card.Body>
                <h6 className="fw-bold mb-3">💡 Como usar o chat:</h6>
                <Row>
                  <Col md={4}>
                    <div className="mb-2">
                      <strong>Chat Geral:</strong> Conversa livre da comunidade
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-2">
                      <strong>Suporte:</strong> Tire dúvidas com nosso bot inteligente
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="mb-2">
                      <strong>Ofertas:</strong> Compartilhe e encontre ajuda
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

export default ChatIntegration;


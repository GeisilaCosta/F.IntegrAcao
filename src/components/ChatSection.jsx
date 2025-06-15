import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Send, User, Bot, Smile } from 'lucide-react';

const ChatSection = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Bem-vindo ao IntegrAção. Como posso ajudá-lo hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        'Obrigado pela sua mensagem! Nossa equipe entrará em contato em breve.',
        'Posso ajudá-lo a encontrar ofertas de ajuda na sua região.',
        'Para criar um pedido de ajuda, você precisa estar logado na plataforma.',
        'Temos várias categorias de ajuda disponíveis: moradia, emprego, saúde, educação e muito mais.',
        'Nossa plataforma conecta pessoas que precisam de ajuda com apoiadores dispostos a ajudar.'
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="text-center mb-4">
              <h2 className="display-6 fw-bold mb-3">Chat de Suporte</h2>
              <p className="lead text-muted">
                Converse conosco e tire suas dúvidas sobre a plataforma
              </p>
            </div>

            <Card className="chat-container shadow-sm">
              <div className="chat-messages">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}
                  >
                    <div className="d-flex align-items-start gap-2 mb-2">
                      <div className={`rounded-circle p-2 ${
                        message.sender === 'user' ? 'bg-primary' : 'bg-secondary'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="text-white" size={16} />
                        ) : (
                          <Bot className="text-white" size={16} />
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-medium small text-muted mb-1">
                          {message.sender === 'user' ? 'Você' : 'Suporte IntegrAção'}
                        </div>
                        <div>{message.text}</div>
                        <div className="small text-muted mt-1">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="message received">
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle p-2 bg-secondary">
                        <Bot className="text-white" size={16} />
                      </div>
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input">
                <Form onSubmit={handleSendMessage}>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="border-0 bg-light"
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      className="d-flex align-items-center gap-2"
                      disabled={!newMessage.trim() || isTyping}
                    >
                      <Send size={16} />
                    </Button>
                  </div>
                </Form>
              </div>
            </Card>

            <div className="text-center mt-3">
              <small className="text-muted">
                💡 Este é um chat de demonstração. Em produção, seria integrado com um sistema de chat real.
              </small>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .typing-indicator {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 8px 12px;
        }
        
        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #6c757d;
          animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default ChatSection;


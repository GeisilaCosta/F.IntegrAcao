import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Send, User, Bot, Smile, MessageCircle } from 'lucide-react';

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

  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  const typingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const chatContainerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-5 bg-light">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="d-inline-block mb-3"
                >
                  <div className="bg-primary rounded-circle p-3">
                    <MessageCircle className="text-white" size={32} />
                  </div>
                </motion.div>
                
                <motion.h2 
                  className="display-6 fw-bold mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Chat de Suporte
                </motion.h2>
                
                <motion.p 
                  className="lead text-muted"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Converse conosco e tire suas dúvidas sobre a plataforma
                </motion.p>
              </div>

              <motion.div
                variants={chatContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="chat-container shadow-sm">
                  <div className="chat-messages">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          variants={messageVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}
                        >
                          <div className="d-flex align-items-start gap-2 mb-2">
                            <motion.div 
                              className={`rounded-circle p-2 ${
                                message.sender === 'user' ? 'bg-primary' : 'bg-secondary'
                              }`}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {message.sender === 'user' ? (
                                <User className="text-white" size={16} />
                              ) : (
                                <Bot className="text-white" size={16} />
                              )}
                            </motion.div>
                            <div className="flex-grow-1">
                              <div className="fw-medium small text-muted mb-1">
                                {message.sender === 'user' ? 'Você' : 'Suporte IntegrAção'}
                              </div>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                {message.text}
                              </motion.div>
                              <div className="small text-muted mt-1">
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    <AnimatePresence>
                      {isTyping && (
                        <motion.div 
                          className="message received"
                          variants={typingVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          <div className="d-flex align-items-center gap-2">
                            <div className="rounded-circle p-2 bg-secondary">
                              <Bot className="text-white" size={16} />
                            </div>
                            <div className="typing-indicator">
                              <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                              />
                              <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                              />
                              <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div ref={messagesEndRef} />
                  </div>

                  <motion.div 
                    className="chat-input"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Form onSubmit={handleSendMessage}>
                      <div className="d-flex gap-2">
                        <motion.div
                          className="flex-grow-1"
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Form.Control
                            type="text"
                            placeholder="Digite sua mensagem..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="border-0 bg-light"
                          />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            type="submit"
                            variant="primary"
                            className="d-flex align-items-center gap-2"
                            disabled={!newMessage.trim() || isTyping}
                          >
                            <motion.div
                              animate={!newMessage.trim() ? {} : { x: [0, 5, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <Send size={16} />
                            </motion.div>
                          </Button>
                        </motion.div>
                      </div>
                    </Form>
                  </motion.div>
                </Card>
              </motion.div>

              <motion.div 
                className="text-center mt-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <small className="text-muted">
                  💡 Este é um chat de demonstração. Em produção, seria integrado com um sistema de chat real.
                </small>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
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
        }
      `}</style>
    </section>
  );
};

export default ChatSection;


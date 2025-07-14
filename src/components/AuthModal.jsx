import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal, Tab, Tabs } from 'react-bootstrap';
import { User, Mail, Lock, UserPlus, LogIn, Eye, EyeOff } from 'lucide-react';
import { authService } from '../services/apiServices';

const AuthModal = ({ show, onHide, onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    telefone: '',
    endereco: '',
    tipoUsuario: 'VULNERAVEL'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login({
        email: formData.email,
        senha: formData.senha
      });

      // Salvar token no localStorage
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userInfo', JSON.stringify(response.userInfo));

      setSuccess('Login realizado com sucesso!');
      setTimeout(() => {
        onAuthSuccess(response);
        onHide();
      }, 1000);

    } catch (error) {
      setError('Email ou senha incorretos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.register({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        telefone: formData.telefone,
        endereco: formData.endereco,
        tipoUsuario: formData.tipoUsuario
      });

      setSuccess('Cadastro realizado com sucesso! Faça login para continuar.');
      setTimeout(() => {
        setActiveTab('login');
        setFormData(prev => ({ ...prev, nome: '', telefone: '', endereco: '' }));
      }, 2000);

    } catch (error) {
      setError('Erro ao criar conta. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      senha: '',
      nome: '',
      telefone: '',
      endereco: '',
      tipoUsuario: 'VULNERAVEL'
    });
    setError('');
    setSuccess('');
  };

  useEffect(() => {
    if (show) {
      resetForm();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {activeTab === 'login' ? 'Entrar na Plataforma' : 'Criar Conta'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="login" title={
            <span><LogIn size={16} className="me-2" />Entrar</span>
          }>
            <Form onSubmit={handleLogin}>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <Mail size={16} className="me-2" />
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <Lock size={16} className="me-2" />
                      Senha
                    </Form.Label>
                    <div className="position-relative">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="senha"
                        value={formData.senha}
                        onChange={handleInputChange}
                        placeholder="Sua senha"
                        required
                      />
                      <Button
                        variant="link"
                        className="position-absolute end-0 top-0 border-0"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ zIndex: 10 }}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-grid">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </div>
            </Form>
          </Tab>

          <Tab eventKey="register" title={
            <span><UserPlus size={16} className="me-2" />Cadastrar</span>
          }>
            <Form onSubmit={handleRegister}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <User size={16} className="me-2" />
                      Nome Completo
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="Seu nome completo"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <Mail size={16} className="me-2" />
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <Lock size={16} className="me-2" />
                      Senha
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="senha"
                      value={formData.senha}
                      onChange={handleInputChange}
                      placeholder="Mínimo 6 caracteres"
                      minLength={6}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                      type="text"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      placeholder="Seu endereço completo"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tipo de Usuário</Form.Label>
                    <Form.Select
                      name="tipoUsuario"
                      value={formData.tipoUsuario}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="VULNERAVEL">Pessoa em Vulnerabilidade</option>
                      <option value="APOIADOR">Apoiador/Voluntário</option>
                    </Form.Select>
                    <Form.Text className="text-muted">
                      Escolha "Pessoa em Vulnerabilidade" se precisa de ajuda, ou "Apoiador" se quer ajudar outros.
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-grid">
                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Criando conta...' : 'Criar Conta'}
                </Button>
              </div>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
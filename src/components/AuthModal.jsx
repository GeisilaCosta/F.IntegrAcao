import React, { useState, useCallback, useEffect } from 'react';
import {
  Container, Row, Col, Card, Form, Button, Alert, Modal, Tab, Tabs
} from 'react-bootstrap';
import {
  User, Mail, Lock, UserPlus, LogIn, Eye, EyeOff
} from 'lucide-react';
import { authService } from '../services/apiServices';
import { userService } from '../services/apiServices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AuthModal = ({ show, onHide, onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
  email: '',
  senha: '',
  nome: '',
  telefone: '',
  endereco: '',
  tipo: '' // padrão inicial
});

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const navigate = useNavigate();

// 🧠 Função interna para traduzir mensagens de erro
const translateError = (message) => {
  if (!message) return 'Erro desconhecido.';
  const msg = message.toLowerCase();

  if (msg.includes('401')) return 'Email ou senha inválidos.';
  if (msg.includes('403')) return 'Acesso negado. Você não tem permissão.';
  if (msg.includes('500')) return 'Erro interno no servidor.';
  if (msg.includes('timeout')) return 'Tempo de conexão expirado. Verifique sua internet.';
  return message;
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

    // ✅ Salvar token e dados do usuário
    localStorage.setItem('authToken', response.token);
 localStorage.setItem('userInfo', JSON.stringify({
  id: response.id,
  tipo: response.tipo,
  nome: response.nome
}));


console.log('🔁 Resposta completa do backend:', response);

    console.log('🔐 Token:', localStorage.getItem('authToken'));
    console.log('👤 Dados:', localStorage.getItem('userInfo'));

    // ✅ Redirecionamento com base no tipo recebido
const tipoNormalizado = response.tipoUsuario?.trim()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toUpperCase();

switch (tipoNormalizado) {
  case 'VULNERAVEL':
    toast.success(`👋 Olá, ${response.nome}! Esperamos te ajudar no que precisar.`);
    navigate('/painel-vulneravel');
    break;

  case 'APOIADOR':
    toast.success(`🙌 Bem-vindo(a), ${response.nome}! Sua solidariedade transforma vidas.`);
    navigate('/painel-apoiador');
    break;

  case 'ADMINISTRADOR':
    toast.success(`🎉 Bem-vindo, ${response.nome}! Painel administrativo acessado com sucesso.`);
    navigate('/painel-interno-secreto');
    break;

  default:
    setError('Tipo de usuário não reconhecido.');
    return;
}


    // ✅ Atualiza estado no App e fecha modal
    onAuthSuccess(response);
    onHide();
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Erro desconhecido.';
    setError(translateError(message));
  } finally {
    setLoading(false);
  }
};

const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');

  try {
    const response = await authService.register({
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      telefone: formData.telefone,
      endereco: formData.endereco,
     tipoUsuario: formData.tipo
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .trim()
  .toUpperCase()

    });

    setSuccess(`✅ ${response.nome}, seu cadastro foi criado com sucesso!`);

    // limpa campos e troca para aba login
    setTimeout(() => {
      setActiveTab('login');
      resetForm();
    }, 2000);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    setError(`⚠️ ${message.includes('409') ? 'Email já cadastrado.' : 'Erro ao registrar. Verifique os campos.'}`);
  } finally {
    setLoading(false);
  }
};

const resetForm = useCallback(() => {
  setFormData({
    email: '',
    senha: '',
    nome: '',
    telefone: '',
    endereco: '',
    tipo: ''
  });
  setError('');
  setSuccess('');
}, []);

useEffect(() => {
  if (show) resetForm();
}, [show, resetForm]);


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
          {/* Login Tab */}
          <Tab eventKey="login" title={
            <span><LogIn size={16} className="me-2" />Entrar</span>
          }>
            <Form onSubmit={handleLogin}>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label><Mail size={16} className="me-2" />Email</Form.Label>
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
                    <Form.Label><Lock size={16} className="me-2" />Senha</Form.Label>
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
                <Button type="submit" variant="primary" size="lg" disabled={loading}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </div>
            </Form>
          </Tab>

          {/* Cadastro Tab */}
          <Tab eventKey="register" title={
            <span><UserPlus size={16} className="me-2" />Cadastrar</span>
          }>
            <Form onSubmit={handleRegister}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label><User size={16} className="me-2" />Nome Completo</Form.Label>
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
                    <Form.Label><Mail size={16} className="me-2" />Email</Form.Label>
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
                    <Form.Label><Lock size={16} className="me-2" />Senha</Form.Label>
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
  name="tipo"
  value={formData.tipo}
  onChange={handleInputChange}
>
  <option value="">Selecione seu perfil</option>
  <option value="VULNERÁVEL">Pessoa em Vulnerabilidade</option>
  <option value="APOIADOR">Apoiador/Voluntário</option>
</Form.Select>


    <Form.Text className="text-muted">
      Escolha "Pessoa em Vulnerabilidade" se precisa de ajuda, ou "Apoiador" se quer ajudar outros.
    </Form.Text>
  </Form.Group>
</Col>
              </Row>
              <div className="d-grid">
                <Button type="submit" variant="success" size="lg" disabled={loading}>
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

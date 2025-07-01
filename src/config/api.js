// Configurações da API para integração com backend
const API_CONFIG = {
  // URL base do backend Spring Boot
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  
  // Endpoints da API
  ENDPOINTS: {
    // Autenticação
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout'
    },
    
    // Usuários
    USERS: {
      PROFILE: '/usuarios/perfil',
      UPDATE: '/usuarios/atualizar',
      LIST: '/usuarios',
      DELETE: '/usuarios'
    },
    
    // Ofertas de Ajuda
    OFFERS: {
      LIST: '/ofertas',
      CREATE: '/ofertas',
      UPDATE: '/ofertas',
      DELETE: '/ofertas',
      BY_USER: '/ofertas/usuario',
      BY_TYPE: '/ofertas/tipo',
      BY_LOCATION: '/ofertas/localizacao'
    },
    
    // Pedidos de Ajuda
    REQUESTS: {
      LIST: '/pedidos',
      CREATE: '/pedidos',
      UPDATE: '/pedidos',
      DELETE: '/pedidos',
      BY_USER: '/pedidos/usuario',
      BY_TYPE: '/pedidos/tipo',
      BY_URGENCY: '/pedidos/urgencia'
    },
    
    // Candidaturas
    APPLICATIONS: {
      LIST: '/candidaturas',
      CREATE: '/candidaturas',
      UPDATE: '/candidaturas',
      DELETE: '/candidaturas',
      BY_OFFER: '/candidaturas/oferta',
      BY_USER: '/candidaturas/usuario'
    },
    
    // Mensagens
    MESSAGES: {
      LIST: '/mensagens',
      SEND: '/mensagens',
      CONVERSATION: '/mensagens/conversa',
      MARK_READ: '/mensagens/marcar-lida'
    },
    
    // Avaliações
    REVIEWS: {
      LIST: '/avaliacoes',
      CREATE: '/avaliacoes',
      BY_USER: '/avaliacoes/usuario'
    },
    
    // Administração
    ADMIN: {
      STATS: '/admin/estatisticas',
      USERS: '/admin/usuarios',
      REPORTS: '/admin/relatorios',
      MODERATE: '/admin/moderar'
    }
  },
  
  // Headers padrão
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  
  // Timeout para requisições (em ms)
  TIMEOUT: 10000,
  
  // Configurações de paginação
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100
  }
};

// Função para obter headers com token de autenticação
export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    ...API_CONFIG.DEFAULT_HEADERS,
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Função para construir URL completa
export const buildUrl = (endpoint, params = {}) => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  // Adicionar parâmetros de query se existirem
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      queryParams.append(key, value);
    }
  });
  
  const queryString = queryParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }
  
  return url;
};

// Função para fazer requisições HTTP
export const apiRequest = async (endpoint, options = {}) => {
  const url = buildUrl(endpoint, options.params);
  
  const config = {
    method: options.method || 'GET',
    headers: getAuthHeaders(),
    ...options,
    ...(options.body && { body: JSON.stringify(options.body) })
  };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export default API_CONFIG;
// URL fixa diretamente no código
const BASE_URL = 'http://localhost:8080/api'; // 🔁 ajuste se estiver em produção

const API_CONFIG = {
  BASE_URL,

  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/registro',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout'
    },
    USERS: {
      PROFILE: '/usuarios/perfil',
      UPDATE: '/usuarios/atualizar',
      LIST: '/usuarios',
      DELETE: '/usuarios'
    },
    OFFERS: {
      LIST: '/ofertas',
      CREATE: '/ofertas',
      UPDATE: '/ofertas',
      DELETE: '/ofertas',
      BY_USER: '/ofertas/usuario',
      BY_TYPE: '/ofertas/tipo',
      BY_LOCATION: '/ofertas/localizacao'
    },
    REQUESTS: {
      LIST: '/pedidos',
      CREATE: '/pedidos',
      UPDATE: '/pedidos',
      DELETE: '/pedidos',
      BY_USER: '/pedidos/usuario',
      BY_TYPE: '/pedidos/tipo',
      BY_URGENCY: '/pedidos/urgencia'
    },
    APPLICATIONS: {
      LIST: '/candidaturas',
      CREATE: '/candidaturas',
      UPDATE: '/candidaturas',
      DELETE: '/candidaturas',
      BY_OFFER: '/candidaturas/oferta',
      BY_USER: '/candidaturas/usuario'
    },
    MESSAGES: {
      LIST: '/mensagens',
      SEND: '/mensagens',
      CONVERSATION: '/mensagens/conversa',
      MARK_READ: '/mensagens/marcar-lida'
    },
    REVIEWS: {
      LIST: '/avaliacoes',
      CREATE: '/avaliacoes',
      BY_USER: '/avaliacoes/usuario'
    },
    ADMIN: {
      STATS: '/admin/estatisticas',
      USERS: '/admin/usuarios',
      REPORTS: '/admin/relatorios',
      MODERATE: '/admin/moderar'
    }
  },

  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },

  TIMEOUT: 10000,

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
  const token = localStorage.getItem('authToken');

  // Monta a URL com parâmetros
  const buildUrl = (endpoint, params) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.append(key, value)
      );
    }
    return url.toString();
  };

  const url = buildUrl(endpoint, options.params);

 const config = {
  method: options.method || 'GET',
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }) // só inclui se existir
  },
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
import API_CONFIG, { apiRequest } from '../config/api';



// Serviços de Autenticação
export const authService = {
  login: async (credentials) => {
    return apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: credentials
    });
  },
  
  register: async (userData) => {
    return apiRequest(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: userData
    });
  },
  
  logout: async () => {
    const result = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST'
    });
    localStorage.removeItem('authToken');
    return result;
  },
  
  refreshToken: async () => {
    return apiRequest(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
      method: 'POST'
    });
  }
};

// Serviços de Usuários
export const userService = {
  getProfile: async () => {
    return apiRequest(API_CONFIG.ENDPOINTS.USERS.PROFILE);
  },
  
  updateProfile: async (userData) => {
    return apiRequest(API_CONFIG.ENDPOINTS.USERS.UPDATE, {
      method: 'PUT',
      body: userData
    });
  },
  
  getUsers: async (params = {}) => {
    return apiRequest(API_CONFIG.ENDPOINTS.USERS.LIST, { params });
  }
};

// Serviços de Ofertas de Ajuda
export const offerService = {
  getOffers: async (params = {}) => {
    return apiRequest(API_CONFIG.ENDPOINTS.OFFERS.LIST, { params });
  },
  
  createOffer: async (offerData) => {
    return apiRequest(API_CONFIG.ENDPOINTS.OFFERS.CREATE, {
      method: 'POST',
      body: offerData
    });
  },
  
  updateOffer: async (id, offerData) => {
    return apiRequest(`${API_CONFIG.ENDPOINTS.OFFERS.UPDATE}/${id}`, {
      method: 'PUT',
      body: offerData
    });
  },
  
  deleteOffer: async (id) => {
    return apiRequest(`${API_CONFIG.ENDPOINTS.OFFERS.DELETE}/${id}`, {
      method: 'DELETE'
    });
  },
  
  getOffersByUser: async (userId) => {
    return apiRequest(`${API_CONFIG.ENDPOINTS.OFFERS.BY_USER}/${userId}`);
  },
  
  getOffersByType: async (type) => {
    return apiRequest(API_CONFIG.ENDPOINTS.OFFERS.BY_TYPE, {
      params: { tipo: type }
    });
  }
};

// Serviços de Pedidos de Ajuda
export const requestService = {
  getRequests: async (params = {}) => {
    return apiRequest(API_CONFIG.ENDPOINTS.REQUESTS.LIST, { params });
  },
  
  createRequest: async (requestData) => {
    return apiRequest(API_CONFIG.ENDPOINTS.REQUESTS.CREATE, {
      method: 'POST',
      body: requestData
    });
  },
  
  updateRequest: async (id, requestData) => {
    return apiRequest(`${API_CONFIG.ENDPOINTS.REQUESTS.UPDATE}/${id}`, {
      method: 'PUT',
      body: requestData
    });
  },
  
  deleteRequest: async (id) => {
    return apiRequest(`${API_CONFIG.ENDPOINTS.REQUESTS.DELETE}/${id}`, {
      method: 'DELETE'
    });
  },
  
  getRequestsByUser: async (userId) => {
    return apiRequest(`${API_CONFIG.ENDPOINTS.REQUESTS.BY_USER}/${userId}`);
  }
};

// Serviços de Candidaturas
export const applicationService = {
  getApplications: async (params = {}) => {
    return apiRequest(API_CONFIG.ENDPOINTS.APPLICATIONS.LIST, { params });
  },
  
  createApplication: async (applicationData) => {
    return apiRequest(API_CONFIG.ENDPOINTS.APPLICATIONS.CREATE, {
      method: 'POST',
      body: applicationData
    });
  },
  
  updateApplication: async (id, status) => {
    return apiRequest(`${API_CONFIG.ENDPOINTS.APPLICATIONS.UPDATE}/${id}`, {
      method: 'PUT',
      body: { status }
    });
  },
  
  getApplicationsByOffer: async (offerId) => {
    return apiRequest(`${API_CONFIG.ENDPOINTS.APPLICATIONS.BY_OFFER}/${offerId}`);
  }
};

// Serviços de Mensagens
export const messageService = {
  getMessages: async (conversationId) => {
    return apiRequest(`${API_CONFIG.ENDPOINTS.MESSAGES.CONVERSATION}/${conversationId}`);
  },
  
  sendMessage: async (messageData) => {
    return apiRequest(API_CONFIG.ENDPOINTS.MESSAGES.SEND, {
      method: 'POST',
      body: messageData
    });
  },
  
  markAsRead: async (messageId) => {
    return apiRequest(`${API_CONFIG.ENDPOINTS.MESSAGES.MARK_READ}/${messageId}`, {
      method: 'PUT'
    });
  }
};

// Serviços de Avaliações
export const reviewService = {
  getReviews: async (params = {}) => {
    return apiRequest(API_CONFIG.ENDPOINTS.REVIEWS.LIST, { params });
  },
  
  createReview: async (reviewData) => {
    return apiRequest(API_CONFIG.ENDPOINTS.REVIEWS.CREATE, {
      method: 'POST',
      body: reviewData
    });
  },
  
  getReviewsByUser: async (userId) => {
    return apiRequest(`${API_CONFIG.ENDPOINTS.REVIEWS.BY_USER}/${userId}`);
  }
};

// Serviços de Administração
export const adminService = {
  getStatistics: async () => {
    return apiRequest(API_CONFIG.ENDPOINTS.ADMIN.STATS);
  },
  
  getUsers: async (params = {}) => {
    return apiRequest(API_CONFIG.ENDPOINTS.ADMIN.USERS, { params });
  },
  
  getReports: async (params = {}) => {
    return apiRequest(API_CONFIG.ENDPOINTS.ADMIN.REPORTS, { params });
  },
  
  moderateContent: async (contentId, action) => {
    return apiRequest(API_CONFIG.ENDPOINTS.ADMIN.MODERATE, {
      method: 'POST',
      body: { contentId, action }
    });
  }
};

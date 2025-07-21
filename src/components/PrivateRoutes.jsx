import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, roles = [], children }) => {
  if (!user) {
    // Usuário não autenticado: redireciona para página inicial ou login
    return <Navigate to="/" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.tipo)) {
    // Usuário sem permissão: redireciona para página "não autorizado"
    return <Navigate to="/unauthorized" replace />;
  }

  // Usuário autorizado: renderiza componente
  return children;
};

export default PrivateRoute;

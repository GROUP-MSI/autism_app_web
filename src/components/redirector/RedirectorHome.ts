
import React from 'react';
import { useNavigate, useLocation  } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

export function RedirectorHome() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (location.pathname !== "/home" &&
        location.pathname !== "/customer" &&
        location.pathname !== "/worker" &&
        location.pathname !== "/admin") {
      
      if(isAuthenticated)
        navigate('/admin')
      else
        navigate('/home');
    }



  }, [navigate, location]);

  return null; // No necesitamos renderizar nada
}

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoadingValidate } from '../loading/LoadingValidate';


export const PrivateAdminRoute: React.FC<{element: React.ReactElement}> = ({ element }) =>
{
  const { isAuthenticated, loading, admin, worker, customer} = useAuth();
  
  if (loading)
    return <LoadingValidate />;

  if (isAuthenticated == false) 
    return <Navigate to="/home" replace />;

  if(worker == 'false' && customer == 'false' && admin == 'false' && isAuthenticated == true)  return <Navigate to="/register" replace />;
  if(worker == 'true') return <Navigate to="/worker" replace />;
  if(customer == 'true') return <Navigate to="/customer" replace />;


  return element
}

export const PrivateHomeRoute: React.FC<{element: React.ReactElement}> = ({ element }) =>
{
  const { isAuthenticated, loading, admin, worker, customer} = useAuth();
  
  if (loading)
    return <LoadingValidate />;

  if(worker == 'false' && customer == 'false' && admin == 'false' && isAuthenticated == true)  return <Navigate to="/register" replace />;
  if(admin == 'true') return <Navigate to="/admin" replace />;
  if(worker == 'true') return <Navigate to="/worker" replace />;
  if(customer == 'true') return <Navigate to="/customer" replace />;


  return element
}


export const PrivateRegisterRoute: React.FC<{element: React.ReactElement}> = ({ element }) =>
  {
    const { isAuthenticated, loading, admin, worker, customer} = useAuth();
    
    if (loading)
      return <LoadingValidate />;
  
    if (isAuthenticated == false) 
      return <Navigate to="/home" replace />;
  
    if(admin == 'true') return <Navigate to="/admin" replace />;
    if(worker == 'true') return <Navigate to="/worker" replace />;
    if(customer == 'true') return <Navigate to="/customer" replace />;
  
    return element
  }

export const PrivateCustomerRoute: React.FC<{element: React.ReactElement}> = ({ element }) =>
{
  const { isAuthenticated, loading, admin, worker, customer} = useAuth();
  
  if (loading)
    return <LoadingValidate />;

  if (isAuthenticated == false) 
    return <Navigate to="/home" replace />;

  if(admin == 'true') return <Navigate to="/admin" replace />;
  if(worker == 'true' && customer == 'false') return <Navigate to="/worker" replace />;
  
  if(worker == 'false' && customer == 'false' && admin == 'false' && isAuthenticated == true)  return <Navigate to="/register" replace />;

  return element
}

  
export const PrivateWorkerRoute: React.FC<{element: React.ReactElement}> = ({ element }) =>
{
  const { isAuthenticated, loading, admin, worker, customer} = useAuth();
  
  if (loading)
    return <LoadingValidate />;

  if (isAuthenticated == false) 
    return <Navigate to="/home" replace />;


  if(admin == 'true') return <Navigate to="/admin" replace />;
  if(worker == 'false' && customer == 'true') return <Navigate to="/customer" replace />;

  if(worker == 'false' && customer == 'false' && admin == 'false' && isAuthenticated)  return <Navigate to="/register" replace />;

  return element
}
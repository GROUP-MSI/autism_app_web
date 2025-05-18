import { basicApi } from '../AspApi';
import type {LoginData, LoginResponse } from '../../interfaces/IAuth';
// import { ManageErrorAxios } from '../../utils/ManageErrorAxios';


export const loginServ= async (loginData : LoginData) => 
{
  try
  {
    const response = await basicApi.post<LoginResponse>('v1/auth/login', loginData);
    // console.log(response.data);
    localStorage.setItem('token', response.data.currentToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('user',  JSON.stringify(response.data.user));

    
    return response.data;

  }catch(error)
  {
    // if (axios.isAxiosError(error)) {
    //   ManageErrorAxios(error);
    // }
    // console.log(error);
    throw error;
  }
}

export const googleLoginService = async (token : string) => 
{
  try
  {
    const response = await basicApi.post<LoginResponse>('v1/auth/google-login', {token});
    // console.log(response.data);
    localStorage.setItem('token', response.data.currentToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('user',  JSON.stringify(response.data.user));

    return response.data;
  }catch(error)
  {
    // if (axios.isAxiosError(error)) {
    //   ManageErrorAxios(error);
    // }
    // console.log(error);
    throw error;
  }
}
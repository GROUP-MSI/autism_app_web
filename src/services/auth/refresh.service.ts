import type { LoginResponse, RefresTokenData } from "../../interfaces/IAuth";
import { basicApi } from "../AspApi";


export const refreshTokenService = async (refresh : RefresTokenData): Promise<LoginResponse> => 
  {
    try
    {
      console.log(refresh);
      const response = await basicApi.post<LoginResponse>('v1/auth/refresh-token', refresh);
      console.log(response.data);
      localStorage.setItem('token', response.data.currentToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user',  JSON.stringify(response.data.user));
      return response.data;
    }catch(error)
    {
      localStorage.clear();
      // if (axios.isAxiosError(error)) {
      //   ManageErrorAxios(error);
      // }
      // console.log(error);
      throw error;
    }
  }
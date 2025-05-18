
export interface LoginResponse {
  user : UserAuthResponse;
  currentToken: string;
  refreshToken: string;
}

export interface UserAuthResponse
{
  id : number;
  name : string;
  email : string;
  photo : string;
  firstName : string;
  dadLastName : string;
  momLastName : string;
  age : number;
  ci : string;
}

export interface RefresTokenData
{
  tokenExpired  : string
  refreshToken : string
}

export interface LoginData {
  nameOrGmail: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  init: boolean;
  setUser: (user : UserAuthResponse) => void
  user: UserAuthResponse;
  admin : string;
  worker : string;
  customer : string;
  rols : number [];
  login: (loginData: LoginData) => Promise<void>;
  loginGoogle: (token : string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export interface AppSectionItem
{
  name: string;
  page: string;
  icon: string;
  link: string;
  numGroup: number;
}

export interface rolsAdmin
{
  id: number;
  name: string;
  color: string;
  hasRol: boolean;
}

export interface PermissionRols
{
  id: number;
  name: string;
  hasPermission : boolean;
}
export interface PermissionList
{
  id: number;
  name: string;
  description: string;
}

export interface PermissionDetail
{
  name: string;
  description: string;
}

export interface DecodedToken {
  exp: number;
  admin: string;
  worker: string;
  customer: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;

  login: (data: LoginRequest) => Promise<void>;

  logout: () => void;
  setAuthError: (er:string | null) => void;
}
export interface User {
  id?: string | number;
  name?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string; // optionally store JWT in real app
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

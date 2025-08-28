export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // hashed
  createdAt: string;
  updatedAt: string;
}

export interface UserWithoutPassword {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface AuthSession {
  userId: string;
  email: string;
  name: string;
  expiresAt: number;
}

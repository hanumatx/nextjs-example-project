import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { findUserByEmail, findUserById, createUser } from './database';
import { User, UserWithoutPassword, LoginCredentials, SignupData, AuthSession } from '@/types/auth';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);
const SALT_ROUNDS = 12;
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Create JWT token
export async function createToken(payload: AuthSession): Promise<string> {
  return new SignJWT({
    userId: payload.userId,
    email: payload.email,
    name: payload.name,
    expiresAt: payload.expiresAt,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(new Date(payload.expiresAt))
    .sign(JWT_SECRET);
}

// Verify JWT token
export async function verifyToken(token: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Validate payload structure
    if (
      typeof payload.userId === 'string' &&
      typeof payload.email === 'string' &&
      typeof payload.name === 'string' &&
      typeof payload.expiresAt === 'number'
    ) {
      return {
        userId: payload.userId,
        email: payload.email,
        name: payload.name,
        expiresAt: payload.expiresAt,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Sign up user
export async function signUp(data: SignupData): Promise<{ user: UserWithoutPassword; token: string }> {
  // Hash password
  const hashedPassword = await hashPassword(data.password);
  
  // Create user
  const user = await createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  // Create session
  const session: AuthSession = {
    userId: user.id,
    email: user.email,
    name: user.name,
    expiresAt: Date.now() + SESSION_DURATION,
  };

  const token = await createToken(session);

  return { user, token };
}

// Sign in user
export async function signIn(credentials: LoginCredentials): Promise<{ user: UserWithoutPassword; token: string }> {
  // Find user
  const user = await findUserByEmail(credentials.email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Verify password
  const isValidPassword = await verifyPassword(credentials.password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }

  // Create session
  const session: AuthSession = {
    userId: user.id,
    email: user.email,
    name: user.name,
    expiresAt: Date.now() + SESSION_DURATION,
  };

  const token = await createToken(session);

  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}

// Get current user from request
export async function getCurrentUser(request: NextRequest): Promise<UserWithoutPassword | null> {
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }

  const session = await verifyToken(token);
  if (!session || session.expiresAt < Date.now()) {
    return null;
  }

  const user = await findUserById(session.userId);
  if (!user) {
    return null;
  }

  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Get current user from server components
export async function getCurrentUserServer(): Promise<UserWithoutPassword | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    return null;
  }

  const session = await verifyToken(token);
  if (!session || session.expiresAt < Date.now()) {
    return null;
  }

  const user = await findUserById(session.userId);
  if (!user) {
    return null;
  }

  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Set auth cookie
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000, // Convert to seconds
    path: '/',
  });
}

// Clear auth cookie
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}

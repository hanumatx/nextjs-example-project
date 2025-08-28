import fs from 'fs/promises';
import path from 'path';
import { User, UserWithoutPassword } from '@/types/auth';

const DB_PATH = path.join(process.cwd(), 'src/data/users.json');

// Initialize database file if it doesn't exist
async function initializeDB() {
  try {
    await fs.access(DB_PATH);
  } catch {
    // File doesn't exist, create it with empty array
    await fs.writeFile(DB_PATH, JSON.stringify([], null, 2));
  }
}

// Read all users from database
export async function getAllUsers(): Promise<User[]> {
  await initializeDB();
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data) as User[];
  } catch (error) {
    console.error('Error reading users database:', error);
    return [];
  }
}

// Write users to database
async function writeUsers(users: User[]): Promise<void> {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing to users database:', error);
    throw new Error('Failed to save user data');
  }
}

// Find user by email
export async function findUserByEmail(email: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
}

// Find user by ID
export async function findUserById(id: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find(user => user.id === id) || null;
}

// Create new user
export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserWithoutPassword> {
  const users = await getAllUsers();
  
  // Check if user already exists
  const existingUser = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const newUser: User = {
    id: generateId(),
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);

  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

// Update user
export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<UserWithoutPassword | null> {
  const users = await getAllUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await writeUsers(users);

  // Return user without password
  const { password, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
}

// Delete user
export async function deleteUser(id: string): Promise<boolean> {
  const users = await getAllUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  
  if (filteredUsers.length === users.length) {
    return false; // User not found
  }

  await writeUsers(filteredUsers);
  return true;
}

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

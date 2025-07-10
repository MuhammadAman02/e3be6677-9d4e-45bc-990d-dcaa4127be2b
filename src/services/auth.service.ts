import jwt from 'jsonwebtoken';
import { env } from '../config/env';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123@admin';

export async function authenticateUser(username: string, password: string): Promise<string | null> {
  console.log(`Authentication attempt for username: ${username}`);
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { username: ADMIN_USERNAME, role: 'admin' },
      env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Authentication successful');
    return token;
  }
  
  console.log('Authentication failed');
  return null;
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    console.log('Token verification failed:', error);
    return null;
  }
}
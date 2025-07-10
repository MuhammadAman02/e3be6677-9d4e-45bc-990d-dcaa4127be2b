import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../services/auth.service';

export async function authenticateToken(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).send({ error: 'Access token required' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(403).send({ error: 'Invalid or expired token' });
    }

    // Add user info to request for use in handlers
    (req as any).user = decoded;
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(403).send({ error: 'Invalid token' });
  }
}
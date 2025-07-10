import { FastifyRequest, FastifyReply } from 'fastify';
import { authenticateUser } from '../services/auth.service';

export async function loginHandler(
  req: FastifyRequest<{ Body: { username: string; password: string } }>,
  res: FastifyReply
) {
  try {
    const { username, password } = req.body;
    
    const token = await authenticateUser(username, password);
    
    if (!token) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    
    res.status(200).send({
      token,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
}
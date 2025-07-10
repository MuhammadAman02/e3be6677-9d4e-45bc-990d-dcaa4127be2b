import { FastifyInstance } from 'fastify';
import { loginHandler } from '../controllers/auth.controller';
import { loginSchema } from '../schemas/auth.schema';

export async function authRoutes(app: FastifyInstance) {
  // POST /api/login - Login endpoint
  app.post('/api/login', {
    schema: loginSchema,
    handler: loginHandler,
  });
}
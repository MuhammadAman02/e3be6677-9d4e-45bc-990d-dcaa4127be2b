import { FastifyInstance } from 'fastify';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controllers/user.controller';
import {
  createUserSchema,
  getUsersSchema,
  getUserByIdSchema,
  updateUserSchema,
  deleteUserSchema,
} from '../schemas/user.schema';
import { authenticateToken } from '../middleware/auth.middleware';

export async function userRoutes(app: FastifyInstance) {
  // POST /api/users - Create a new user (public)
  app.post('/api/users', {
    schema: createUserSchema,
    handler: createUserHandler,
  });

  // GET /api/users - Get all users (protected)
  app.get('/api/users', {
    schema: getUsersSchema,
    preHandler: authenticateToken,
    handler: getAllUsersHandler,
  });

  // GET /api/users/:id - Get user by ID (protected)
  app.get('/api/users/:id', {
    schema: getUserByIdSchema,
    preHandler: authenticateToken,
    handler: getUserByIdHandler,
  });

  // PUT /api/users/:id - Update user (protected)
  app.put('/api/users/:id', {
    schema: updateUserSchema,
    preHandler: authenticateToken,
    handler: updateUserHandler,
  });

  // DELETE /api/users/:id - Delete user (protected)
  app.delete('/api/users/:id', {
    schema: deleteUserSchema,
    preHandler: authenticateToken,
    handler: deleteUserHandler,
  });
}
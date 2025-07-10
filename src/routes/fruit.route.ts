import { FastifyInstance } from 'fastify';
import { getFruitsHandler, getFruitByIdHandler } from '../controllers/fruit.controller';
import { getFruitsSchema } from '../schemas/fruit.schema';
import { authenticateToken } from '../middleware/auth.middleware';

export async function fruitRoutes(app: FastifyInstance) {
  // GET /api/fruits - Get all fruits (protected)
  app.get('/api/fruits', {
    schema: getFruitsSchema,
    preHandler: authenticateToken,
    handler: getFruitsHandler,
  });

  // GET /api/fruits/:id - Get fruit by ID (protected)
  app.get('/api/fruits/:id', {
    schema: {
      tags: ["Fruits"],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      security: [{ bearerAuth: [] }]
    },
    preHandler: authenticateToken,
    handler: getFruitByIdHandler,
  });
}
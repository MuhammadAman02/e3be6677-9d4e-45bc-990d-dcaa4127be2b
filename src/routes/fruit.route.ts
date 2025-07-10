import { FastifyInstance } from 'fastify';
import { getFruitsHandler, getFruitByIdHandler } from '../controllers/fruit.controller';
import { getFruitsSchema } from '../schemas/fruit.schema';

export async function fruitRoutes(app: FastifyInstance) {
  // GET /api/fruits - Get all fruits
  app.get('/api/fruits', {
    schema: getFruitsSchema,
    handler: getFruitsHandler,
  });

  // GET /api/fruits/:id - Get fruit by ID
  app.get('/api/fruits/:id', {
    schema: {
      tags: ["Fruits"],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      }
    },
    handler: getFruitByIdHandler,
  });
}
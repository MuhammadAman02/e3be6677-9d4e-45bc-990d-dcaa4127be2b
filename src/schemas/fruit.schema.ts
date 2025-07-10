import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const FruitZod = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  category: z.string(),
});

const GetFruitsResponseZod = z.array(FruitZod);

// Fastify-compatible JSON schema
export const getFruitsSchema = {
  tags: ["Fruits"],
  response: {
    200: zodToJsonSchema(GetFruitsResponseZod),
  },
};
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const LoginZod = z.object({
  username: z.string(),
  password: z.string(),
});

const LoginResponseZod = z.object({
  token: z.string(),
  message: z.string(),
});

const ErrorResponseZod = z.object({
  error: z.string(),
});

// Fastify-compatible JSON schemas
export const loginSchema = {
  tags: ["Authentication"],
  body: zodToJsonSchema(LoginZod),
  response: {
    200: zodToJsonSchema(LoginResponseZod),
    401: zodToJsonSchema(ErrorResponseZod),
  },
};
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const CreateUserZod = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().optional(),
});

const UpdateUserZod = z.object({
  username: z.string().min(3).max(50).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.string().optional(),
});

const UserResponseZod = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const GetUsersResponseZod = z.array(UserResponseZod);

const ErrorResponseZod = z.object({
  error: z.string(),
});

const DeleteUserResponseZod = z.object({
  message: z.string(),
  user: z.object({
    id: z.string().uuid(),
    username: z.string(),
    email: z.string().email(),
  }),
});

// Fastify-compatible JSON schemas
export const createUserSchema = {
  tags: ["Users"],
  body: zodToJsonSchema(CreateUserZod),
  response: {
    201: zodToJsonSchema(UserResponseZod),
    400: zodToJsonSchema(ErrorResponseZod),
  },
};

export const getUsersSchema = {
  tags: ["Users"],
  security: [{ bearerAuth: [] }],
  response: {
    200: zodToJsonSchema(GetUsersResponseZod),
    401: zodToJsonSchema(ErrorResponseZod),
    403: zodToJsonSchema(ErrorResponseZod),
  },
};

export const getUserByIdSchema = {
  tags: ["Users"],
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' }
    },
    required: ['id']
  },
  response: {
    200: zodToJsonSchema(UserResponseZod),
    404: zodToJsonSchema(ErrorResponseZod),
    401: zodToJsonSchema(ErrorResponseZod),
    403: zodToJsonSchema(ErrorResponseZod),
  },
};

export const updateUserSchema = {
  tags: ["Users"],
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' }
    },
    required: ['id']
  },
  body: zodToJsonSchema(UpdateUserZod),
  response: {
    200: zodToJsonSchema(UserResponseZod),
    400: zodToJsonSchema(ErrorResponseZod),
    404: zodToJsonSchema(ErrorResponseZod),
    401: zodToJsonSchema(ErrorResponseZod),
    403: zodToJsonSchema(ErrorResponseZod),
  },
};

export const deleteUserSchema = {
  tags: ["Users"],
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' }
    },
    required: ['id']
  },
  response: {
    200: zodToJsonSchema(DeleteUserResponseZod),
    404: zodToJsonSchema(ErrorResponseZod),
    401: zodToJsonSchema(ErrorResponseZod),
    403: zodToJsonSchema(ErrorResponseZod),
  },
};
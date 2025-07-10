import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  CreateUserData,
  UpdateUserData,
} from '../services/user.service';

export async function createUserHandler(
  req: FastifyRequest<{ Body: CreateUserData }>,
  res: FastifyReply
) {
  try {
    const user = await createUser(req.body);
    console.log(`User created: ${user.username}`);
    res.status(201).send(user);
  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(400).send({ error: error.message });
  }
}

export async function getAllUsersHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const users = await getAllUsers();
    console.log(`Returning ${users.length} users`);
    res.status(200).send(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    res.status(500).send({ error: 'Failed to fetch users' });
  }
}

export async function getUserByIdHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    console.log(`Returning user: ${user.username}`);
    res.status(200).send(user);
  } catch (error: any) {
    console.error('Error fetching user:', error);
    res.status(500).send({ error: 'Failed to fetch user' });
  }
}

export async function updateUserHandler(
  req: FastifyRequest<{ Params: { id: string }; Body: UpdateUserData }>,
  res: FastifyReply
) {
  try {
    const user = await updateUser(req.params.id, req.body);
    console.log(`User updated: ${user.username}`);
    res.status(200).send(user);
  } catch (error: any) {
    console.error('Error updating user:', error);
    if (error.message === 'User not found') {
      return res.status(404).send({ error: error.message });
    }
    res.status(400).send({ error: error.message });
  }
}

export async function deleteUserHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) {
  try {
    const user = await deleteUser(req.params.id);
    console.log(`User deleted: ${user.username}`);
    res.status(200).send({ message: 'User deleted successfully', user });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    if (error.message === 'User not found') {
      return res.status(404).send({ error: error.message });
    }
    res.status(500).send({ error: 'Failed to delete user' });
  }
}
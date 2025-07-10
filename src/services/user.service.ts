import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { prisma } from '../config/database';

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  role?: string;
}

export interface UpdateUserData {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
}

export async function createUser(userData: CreateUserData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  try {
    return await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'user',
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const field = error.meta?.target as string[];
      throw new Error(`${field?.[0] || 'Field'} already exists`);
    }
    throw new Error('Failed to create user');
  }
}

export async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { username },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function updateUser(id: string, userData: UpdateUserData) {
  const updateData: any = { ...userData };
  
  if (userData.password) {
    updateData.password = await bcrypt.hash(userData.password, 10);
  }

  try {
    return await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const field = error.meta?.target as string[];
        throw new Error(`${field?.[0] || 'Field'} already exists`);
      }
      if (error.code === 'P2025') {
        throw new Error('User not found');
      }
    }
    throw new Error('Failed to update user');
  }
}

export async function deleteUser(id: string) {
  try {
    return await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      throw new Error('User not found');
    }
    throw new Error('Failed to delete user');
  }
}
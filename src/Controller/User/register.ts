import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import {RegisterInput} from '../../interfaces';
import {Request} from 'express';
const prisma = new PrismaClient();




export async function registerUser(req:Request): Promise<void> {
  const { email, name, password } = req.body;

  // Hash de la contraseña con bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Crear usuario en la base de datos utilizando Prisma
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    console.log('Usuario registrado con éxito');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
  } finally {
    // Cierra la conexión de Prisma al finalizar
    await prisma.$disconnect();
  }
}

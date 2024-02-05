import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { LoginInput } from '../../interfaces';
import { Request } from 'express';

const prisma = new PrismaClient();

export async function loginUser(req:Request): Promise<void> {
  const { email, password } = req.body;

  try {
    // Obtener el usuario de la base de datos por su email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log('Usuario no encontrado');
      return;
    }

    // Verificar que la contraseña no sea nula y luego utilizar bcrypt
    if (user.password !== null) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        console.log('Inicio de sesión exitoso');
      } else {
        console.log('Contraseña incorrecta');
      }
    } else {
      console.log('Contraseña no válida');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  } finally {
    // Cierra la conexión de Prisma al finalizar
    await prisma.$disconnect();
  }
}

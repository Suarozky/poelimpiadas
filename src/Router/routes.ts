import {loginUser} from '../Controller/User/login';
import {registerUser} from '../Controller/User/register';
import express, { Request, Response } from 'express';
export const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    try {
      await loginUser(req.body);
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  });

    router.post('/register', async (req: Request, res: Response) => {
        try {
          await registerUser(req.body);
          res.status(201).json({ message: 'Registro exitoso' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error en el registro' });
        }
      });
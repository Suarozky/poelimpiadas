// src/app.ts
import express from 'express';
import {router} from './Router/routes';

const app = express();
const port = 3000;

app.use('/users', router);

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

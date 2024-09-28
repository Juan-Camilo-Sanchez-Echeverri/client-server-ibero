import express from 'express';
const router = express.Router();

let users = []; // Almacenamiento en memoria

// Ruta GET para obtener los usuarios
router.get('/users', (req, res) => {
  res.json(users);
});

// Ruta POST para agregar un usuario
router.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

export default router;

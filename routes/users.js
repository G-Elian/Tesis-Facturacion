// routes/usuarios.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Registrar nuevo usuario
router.post('/', (req, res) => {
  const { cedula, nombre, correo, telefono, direccion, saldo } = req.body;

  if (!cedula || !nombre) {
    return res.status(400).json({ error: 'Cédula y nombre son obligatorios' });
  }

  const sql = 'INSERT INTO users (cedula, nombre, correo, telefono, direccion, saldo) VALUES (?, ?, ?, ?, ?, ?)';
  const valores = [cedula, nombre, correo, telefono, direccion, saldo || 0.00];

  db.query(sql, valores, (err, result) => {
    if (err) {
      console.error('Error al crear usuario:', err);
      return res.status(500).json({ error: 'Error en la base de datos' });
    }
    res.json({ message: 'Usuario registrado correctamente', id: result.insertId });
  });
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 👇 Aquí va tu ruta
const usuariosRoutes = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRoutes);

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});

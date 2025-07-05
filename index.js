const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Importar todas las rutas
const usuariosRoutes = require('./routes/usuarios');
const facturasRoutes = require('./routes/facturas');
const adminsRoutes = require('./routes/admins');
const paymentsRoutes = require('./routes/payments');
const notificationsRoutes = require('./routes/notifications');
const perfilRoutes = require('./routes/perfil');
const anomaliesRoutes = require('./routes/anomalies');

// Usar las rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/facturas', facturasRoutes);
app.use('/api/admins', adminsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/perfil', perfilRoutes);
app.use('/api/anomalies', anomaliesRoutes);

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});

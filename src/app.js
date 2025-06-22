const express = require('express');
require('dotenv').config();
const app = express();
const pool = require('./config/db');

app.use(express.json());

// Ruta básica para probar conexión
const ciRoutes = require('./routes/ciRoutes');

app.use('/api/cis', ciRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

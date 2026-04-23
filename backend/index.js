const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // Mandamos a llamar al "traductor" de MySQL

const app = express();
const puerto = 3000;

app.use(cors());
app.use(express.json());

// 1. Configuración de la base de datos
const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root', // El usuario por defecto en MySQL suele ser 'root'
  password: 'caradeAba9', // Pon aquí tu contraseña real de MySQL
  database: 'kiosco_digital' // El nombre de la BD donde creaste la tabla
});

// Probar la conexión
conexion.connect((error) => {
  if (error) {
    console.error('Error conectando a la base de datos:', error.message);
    return;
  }
  console.log('¡Conectado exitosamente a la base de datos MySQL!');
});

app.get('/', (req, res) => {
  res.send('¡El servidor del Kiosco Civil está encendido y listo para operar!');
});

// 2. NUEVA RUTA: El puente para pedir los juzgados
app.get('/api/juzgados', (req, res) => {
  const consultaSQL = 'SELECT * FROM juzgado'; // La misma consulta que usarías en SQL
  
  conexion.query(consultaSQL, (error, resultados) => {
    if (error) {
      console.error('Error al consultar la tabla:', error);
      res.status(500).json({ error: 'Hubo un problema al buscar los datos' });
      return;
    }
    // Si todo sale bien, transformamos las filas de SQL a JSON y las enviamos
    res.json(resultados); 
  });
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}...`);
});
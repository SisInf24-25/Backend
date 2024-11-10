const app = require('./app');
const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'test') { // Evita iniciar el servidor en modo de prueba
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}
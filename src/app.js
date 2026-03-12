/**
 * Configuración de la aplicación Express
 */

const express = require('express');
const tareaRoutes = require('./routes/tarea.routes');
const { fail } = require('./utils/response.util')

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para parsear datos de formularios (opcional)
app.use(express.urlencoded({ extended: true }));

// Middleware de logging (opcional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

//Middleware para recibir tipo de respuesta (json o text)
app.use((req, res, next) => {
  const format = String(req.query.format || 'json').toLowerCase();
  res.locals.format = format === 'text' ? 'text' : 'json';
  next();
});

// Rutas
app.use('/api/tareas', tareaRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'API de Tareas - Práctica MVC con Express',
    version: '1.0.0',
    endpoints: {
      getAll: 'GET /api/tareas',
      getById: 'GET /api/tareas/:id',
      create: 'POST /api/tareas',
      updateFull: 'PUT /api/tareas/:id',
      updatePartial: 'PATCH /api/tareas/:id',
      delete: 'DELETE /api/tareas/:id',
      getByTitle: 'GET /api/tareas/buscar'
    }
  });
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  return fail(res, 'Ruta no encontrada', 404);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  return fail(res, 'Error interno del servidor', 500, { error: err.message });
});

module.exports = app;
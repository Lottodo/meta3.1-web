/**
 * Controlador de Tareas
 * Maneja las peticiones HTTP y responde con JSON
 */

const tareaModel = require('../models/tarea.model');
const { ok, fail } = require('../utils/response.util')

// GET /api/tareas - Obtener todas las tareas
const obtenerTodas = (req, res) => {
  try {
    const tareas = tareaModel.obtenerTodas();
    return ok(res, tareas, 200, { count: tareas.length });
  } catch (error) {
    return fail(res, 'Error al obtener las tareas', 500, { error: error.message });
  }
};

// GET /api/tareas/:id - Obtener una tarea por ID
const obtenerPorId = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return fail(res, 'ID inválido. Debe ser un número', 400);
    }
    
    const tarea = tareaModel.obtenerPorId(id);
    
    if (!tarea) {
      return fail(res, `Tarea con ID ${id} no encontrada`, 404);
    }
    
    return ok(res, tarea);
  } catch (error) {
    return fail(res, 'Error al obtener la tarea', 500, { error: error.message });
  }
};

// POST /api/tareas - Crear una nueva tarea
const crear = (req, res) => {
  try {
    const { titulo, completada } = req.body;
    
    // Validar datos requeridos
    if (!titulo) {
      return fail(res, 'El campo "titulo" es requerido', 400);
    }
    
    const nuevaTarea = tareaModel.crear({ titulo, completada });
    
    return ok(res, nuevaTarea, 201, { message: 'Tarea creada exitosamente' });
  } catch (error) {
    return fail(res, 'Error al crear la tarea', 500, { error: error.message });
  }
};

// PUT /api/tareas/:id - Actualizar tarea completamente
const actualizarCompleta = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { titulo, completada } = req.body;
    
    if (isNaN(id)) {
      return fail(res, 'ID inválido. Debe ser un número', 400);
    }
    
    // Validar datos requeridos
    if (!titulo) {
      return fail(res, 'El campo "titulo" es requerido', 400);
    }
    
    const tareaActualizada = tareaModel.actualizarCompleta(id, { titulo, completada });
    
    if (!tareaActualizada) {
      return fail(res, `Tarea con ID ${id} no encontrada`, 404);
    }

    return ok(res, tareaActualizada, 200, { message: 'Tarea actualizada completamente' });
  } catch (error) {
    return fail(res, 'Error al actualizar la tarea', 500, { error: error.message });
  }
};

// PATCH /api/tareas/:id - Actualizar tarea parcialmente
const actualizarParcial = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const datosParciales = req.body;
    
    if (isNaN(id)) {
      return fail(res, 'ID inválido. Debe ser un número', 400);
    }
    
    // Si no hay datos para actualizar
    if (Object.keys(datosParciales).length === 0) {
      return fail(res, 'Debe enviar al menos un campo para actualizar', 400);
    }
    
    const tareaActualizada = tareaModel.actualizarParcial(id, datosParciales);
    
    if (!tareaActualizada) {
      return fail(res, `Tarea con ID ${id} no encontrada`, 404);
    }

    return ok(res, tareaActualizada, 200, { message: 'Tarea actualizada parcialmente' });
  } catch (error) {
    return fail(res, 'Error al actualizar la tarea', 500, { error: error.message });
  }
};

// DELETE /api/tareas/:id - Eliminar una tarea
const eliminar = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return fail(res, 'ID inválido. Debe ser un número', 400);
    }
    
    const tareaEliminada = tareaModel.eliminar(id);
    
    if (!tareaEliminada) {
      return fail(res, `Tarea con ID ${id} no encontrada`, 404);
    }

    return ok(res, tareaEliminada, 200, { message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    return fail(res, 'Error al eliminar la tarea', 500, { error: error.message });
  }
};

// GET /api/tareas/:id - Obtener una tarea por ID
const obtenerPorTitulo = (req, res) => {
  try {
    const query = req.query.q;
    
    const tarea = tareaModel.obtenerPorTitulo(query);
    
    if (!tarea) {
      return fail(res, `Tarea con título que incluya ${query} no encontrada`, 404);
    }

    return ok(res, tarea);
  } catch (error) {
    return fail(res, 'Error al obtener la tarea', 500, { error: error.message });
  }
};

// Exportar todos los métodos del controlador
module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizarCompleta,
  actualizarParcial,
  eliminar,
  obtenerPorTitulo
};

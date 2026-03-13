# API de Tareas - Meta 3.1

Una API REST desarrollada con **Express.js** siguiendo el patrón **MVC (Modelo-Vista-Controlador)** para gestionar tareas. Este proyecto es una práctica de desarrollo backend con Node.js.

## Descripción del Proyecto

Este proyecto implementa una API REST completa para la gestión de tareas con las siguientes características:

- CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Búsqueda de tareas por título
- Actualización parcial (PATCH) y completa (PUT)
- Estructura MVC ordenada
- Middleware de logging automático
- Respuestas en formato JSON
- Manejo de errores centralizado

## Requisitos Previos

Asegúrate de tener instalado:
- **Node.js** (versión 14 o superior)
- **npm** (incluido con Node.js)

## Instalación

```bash
npm install
```

## Cómo Ejecutar

```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

## Endpoints Disponibles

- `GET /api/tareas` - Obtener todas las tareas
- `GET /api/tareas/:id` - Obtener una tarea por ID
- `GET /api/tareas/buscar?q=query` - Buscar tareas por título
- `POST /api/tareas` - Crear una nueva tarea
- `PUT /api/tareas/:id` - Actualizar una tarea (completa)
- `PATCH /api/tareas/:id` - Actualizar una tarea (parcial)
- `DELETE /api/tareas/:id` - Eliminar una tarea

## Pruebas en Postman - Capturas de Pantalla

| Escenario | Código | Esperado | Captura |
|-----------|--------|----------|---------|
| GET exitoso | `GET /api/tareas` | 200 OK | ![GET exitoso](fotos_postman/get.png) |
| GET por ID | `GET /api/tareas/:id` | 200 OK | ![GET por ID](fotos_postman/get_id.png) |
| POST exitoso | `POST /api/tareas` | 201 Created | ![POST exitoso](fotos_postman/post.png) |
| PUT exitoso | `PUT /api/tareas/:id` | 200 OK | ![PUT exitoso](fotos_postman/put.png) |
| PATCH exitoso | `PATCH /api/tareas/:id` | 200 OK | ![PATCH exitoso](fotos_postman/patch.png) |
| DELETE exitoso | `DELETE /api/tareas/:id` | 200 OK | ![DELETE exitoso](fotos_postman/del.png) |
| Recurso no encontrado | `GET /api/tareas/999` | 404 Not Found | ![404 Not Found](fotos_postman/not_found.png) |
| Datos inválidos | `POST /api/tareas` (sin titulo) | 400 Bad Request | ![400 Bad Request](fotos_postman/bad_request.png) |
| Error de servidor | Excepción no controlada | 500 Internal Server Error | ![500 Internal Server Error](fotos_postman/server_error.png) |

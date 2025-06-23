# CMDB REST API

API RESTful para la gestión de Elementos de Configuración (CIs) en una CMDB, usando Node.js, Express y PostgreSQL.

---
## Diagrama ER
![Diagrama ER](/img/ER.svg)


## Tecnologías usadas

- Node.js + Express
- PostgreSQL
- pg (driver oficial)
- dotenv (variables de entorno)
- nodemon (modo desarrollo)

---

## Configuración

1. Clonar el repositorio.
2. Instalar dependencias:

```bash
npm install
```

Crear archivo .env en la **raiz** del proyecto

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_clave
DB_NAME=cmdb
```

Ejecutar el script create_cmdb.sql en tu base de datos PostgreSQL para crear las tablas iniciales.

## Ejecutar el servidor

```bash
npm run dev
```

## Endpoints
Obtener todos los CIs (con filtros opcionales)

```bash
GET /api/cis
```
Ejemplo:

```bash
/api/cis?type=Hardware&environment=PROD
```
Obtener CI por ID

```bash
GET /api/cis/:id
```

Crear un CI
```bash
POST /api/cis
```
```json
{
  "name": "Servidor1",
  "type": "Hardware",
  "description": "Servidor de aplicaciones",
  "serial_number": "SN123456",
  "version": "v1.0",
  "acquisition_date": "2022-01-01",
  "current_status": "Active",
  "location": "Sala 1",
  "owner": "Infraestructura",
  "security_level": "High",
  "compliance": "Compliant",
  "config_status": "Approved",
  "license_number": "ABC123",
  "expiry_date": "2025-01-01",
  "environment": "PROD"
}
```

Actualizar un CI
```bash
PUT /api/cis/:id
```
Mismo formato de body que POST.

Eliminar un CI
```bash
DELETE /api/cis/:id
```

Relacionar un CI con otro
```bash
POST /api/cis/:id/relate
```
```json
{
  "childId": 2,
  "relationType": "depends_on"
}

```

Ver relaciones de un CI
```bash
GET /api/cis/:id/relations

```
Devuelve padres e hijos relacionados.

Ver historial de cambios de un CI
```bash
GET /api/cis/:id/changes
```

## **Estructura del proyecto**
```arduino
src/
├── app.js
├── config/
│   └── db.js
├── controllers/
│   └── ciController.js
├── models/
│   └── ciModel.js
├── routes/
│   └── ciRoutes.js
├── services/
│   └── ciService.js
```
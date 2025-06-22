-- Eliminar tablas si existen (en orden correcto por dependencias)
DROP TABLE IF EXISTS ci_changes;
DROP TABLE IF EXISTS ci_relations;
DROP TABLE IF EXISTS cis;

-- Crear tabla de Elementos de Configuración (CIs)
CREATE TABLE cis (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Hardware', 'Software', 'Database', 'Network', 'Service')),
    description TEXT,
    serial_number VARCHAR(100),
    version VARCHAR(50),
    acquisition_date DATE,
    current_status VARCHAR(50) DEFAULT 'Active' CHECK (current_status IN ('Active', 'Inactive', 'Maintenance', 'Retired')),
    location VARCHAR(255),
    owner VARCHAR(255),
    security_level VARCHAR(50) CHECK (security_level IN ('High', 'Medium', 'Low')),
    compliance VARCHAR(50) CHECK (compliance IN ('Compliant', 'Non-Compliant', 'Pending')),
    config_status VARCHAR(50) CHECK (config_status IN ('Approved', 'Pending', 'Rejected')),
    license_number VARCHAR(100),
    expiry_date DATE,
    environment VARCHAR(50) NOT NULL CHECK (environment IN ('DEV', 'QA', 'PROD')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de relaciones entre CIs
CREATE TABLE ci_relations (
    id SERIAL PRIMARY KEY,
    parent_ci_id INTEGER NOT NULL REFERENCES cis(id) ON DELETE CASCADE,
    child_ci_id INTEGER NOT NULL REFERENCES cis(id) ON DELETE CASCADE,
    relation_type VARCHAR(100) NOT NULL DEFAULT 'depends_on',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (parent_ci_id, child_ci_id, relation_type)
);

-- Crear tabla de historial de cambios
CREATE TABLE ci_changes (
    id SERIAL PRIMARY KEY,
    ci_id INTEGER NOT NULL REFERENCES cis(id) ON DELETE CASCADE,
    change_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL,
    changed_by VARCHAR(255) NOT NULL DEFAULT 'system'
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_cis_type ON cis(type);
CREATE INDEX idx_cis_environment ON cis(environment);
CREATE INDEX idx_cis_status ON cis(current_status);
CREATE INDEX idx_ci_relations_parent ON ci_relations(parent_ci_id);
CREATE INDEX idx_ci_relations_child ON ci_relations(child_ci_id);


SELECT * FROM cis;
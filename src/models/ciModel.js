const pool = require("../config/db");

const CIModel = {
  async getAll() {
    const result = await pool.query("SELECT * FROM cis ORDER BY id");
    return result.rows;
  },

  async create(ciData) {
    const {
      name,
      type,
      description,
      serial_number,
      version,
      acquisition_date,
      current_status,
      location,
      owner,
      security_level,
      compliance,
      config_status,
      license_number,
      expiry_date,
      environment,
    } = ciData;

    const result = await pool.query(
      `
      INSERT INTO cis (
        name, type, description, serial_number, version, acquisition_date, current_status,
        location, owner, security_level, compliance, config_status, license_number, expiry_date, environment
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13, $14, $15
      ) RETURNING *;
    `,
      [
        name,
        type,
        description,
        serial_number,
        version,
        acquisition_date,
        current_status,
        location,
        owner,
        security_level,
        compliance,
        config_status,
        license_number,
        expiry_date,
        environment,
      ]
    );

    return result.rows[0];
  },

  async update(id, ciData) {
    const {
      name,
      type,
      description,
      serial_number,
      version,
      acquisition_date,
      current_status,
      location,
      owner,
      security_level,
      compliance,
      config_status,
      license_number,
      expiry_date,
      environment,
    } = ciData;

    const result = await pool.query(
      `
    UPDATE cis SET
      name = $1,
      type = $2,
      description = $3,
      serial_number = $4,
      version = $5,
      acquisition_date = $6,
      current_status = $7,
      location = $8,
      owner = $9,
      security_level = $10,
      compliance = $11,
      config_status = $12,
      license_number = $13,
      expiry_date = $14,
      environment = $15,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $16
    RETURNING *;
  `,
      [
        name,
        type,
        description,
        serial_number,
        version,
        acquisition_date,
        current_status,
        location,
        owner,
        security_level,
        compliance,
        config_status,
        license_number,
        expiry_date,
        environment,
        id,
      ]
    );

    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM cis WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },

  async getById(id) {
    const result = await pool.query("SELECT * FROM cis WHERE id = $1", [id]);
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM cis WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },

  async relate(parentId, childId, relationType = "depends_on") {
    const result = await pool.query(
      `
    INSERT INTO ci_relations (parent_ci_id, child_ci_id, relation_type)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,
      [parentId, childId, relationType]
    );

    return result.rows[0];
  },

  async getRelations(ciId) {
    const result = await pool.query(
      `
    SELECT
      r.id,
      r.relation_type,
      c_child.id AS child_id,
      c_child.name AS child_name,
      c_child.type AS child_type,
      c_parent.id AS parent_id,
      c_parent.name AS parent_name,
      c_parent.type AS parent_type
    FROM ci_relations r
    LEFT JOIN cis c_child ON r.child_ci_id = c_child.id
    LEFT JOIN cis c_parent ON r.parent_ci_id = c_parent.id
    WHERE r.parent_ci_id = $1 OR r.child_ci_id = $1;
  `,
      [ciId]
    );

    return result.rows;
  },

  async getChangeHistory(ciId) {
    const result = await pool.query(
      `
    SELECT id, ci_id, description, changed_by, change_date
    FROM ci_changes
    WHERE ci_id = $1
    ORDER BY change_date DESC;
  `,
      [ciId]
    );

    return result.rows;
  },

  async filter(params) {
    const keys = Object.keys(params);
    const values = [];
    let conditions = [];

    keys.forEach((key, index) => {
      values.push(params[key]);
      conditions.push(`${key} = $${index + 1}`);
    });

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT * FROM cis ${whereClause} ORDER BY id`;

    const result = await pool.query(query, values);
    return result.rows;
  },
};

module.exports = CIModel;

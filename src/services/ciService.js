const CIModel = require("../models/ciModel");
const pool = require("../config/db");

const CIService = {
  async getAllCIs() {
    return await CIModel.getAll();
  },

  async createCI(ciData) {
    const newCI = await CIModel.create(ciData);

    // Registrar en ci_changes
    await pool.query(
      `
      INSERT INTO ci_changes (ci_id, description, changed_by)
      VALUES ($1, $2, $3)
    `,
      [newCI.id, "CI creado", "admin"]
    ); // 'admin' es un ejemplo

    return newCI;
  },

  async updateCI(id, ciData) {
    const updatedCI = await CIModel.update(id, ciData);

    if (!updatedCI) {
      throw new Error("CI no encontrado");
    }

    await pool.query(
      `
    INSERT INTO ci_changes (ci_id, description, changed_by)
    VALUES ($1, $2, $3)
  `,
      [id, "CI actualizado", "admin"]
    );

    return updatedCI;
  },

  async deleteCI(id) {
    const existingCI = await CIModel.getById(id);
    if (!existingCI) {
      throw new Error("CI no encontrado");
    }

    await pool.query(
      `
      INSERT INTO ci_changes (ci_id, description, changed_by)
      VALUES ($1, $2, $3)
    `,
      [id, "CI eliminado", "admin"]
    );

    const deletedCI = await CIModel.delete(id);

    return deletedCI;
  },

  async getCIById(id) {
    const ci = await CIModel.getById(id);
    if (!ci) {
      throw new Error("CI no encontrado");
    }
    return ci;
  },

  async relateCIs(parentId, childId, relationType) {
    return await CIModel.relate(parentId, childId, relationType);
  },

  async getRelations(ciId) {
    return await CIModel.getRelations(ciId);
  },
  async getChangeHistory(ciId) {
    return await CIModel.getChangeHistory(ciId);
  },
  async filterCIs(filters) {
    return await CIModel.filter(filters);
  },
};

module.exports = CIService;

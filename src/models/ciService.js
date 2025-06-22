const CIModel = require("../models/ciModel");

const CIService = {
  async getAllCIs() {
    return await CIModel.getAll();
  },

  async deleteCI(id) {
    const ci = await CIModel.getAll(); 
    const deletedCI = await CIModel.delete(id);

    if (!deletedCI) {
      throw new Error("CI no encontrado");
    }

    await pool.query(
      `
    INSERT INTO ci_changes (ci_id, description, changed_by)
    VALUES ($1, $2, $3)
  `,
      [id, "CI eliminado", "admin"]
    );

    return deletedCI;
  },
};

module.exports = CIService;

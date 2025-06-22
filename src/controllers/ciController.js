const CIService = require("../services/ciService");

const CIController = {
  async create(req, res) {
    try {
      const newCI = await CIService.createCI(req.body);
      res.status(201).json(newCI);
    } catch (err) {
      console.error("Error al crear CI:", err.message);
      res
        .status(500)
        .json({ error: "Error al crear el elemento de configuración" });
    }
  },

  async update(req, res) {
    const id = req.params.id;

    try {
      const updatedCI = await CIService.updateCI(id, req.body);
      res.json(updatedCI);
    } catch (err) {
      console.error("Error al actualizar CI:", err.message);
      res.status(500).json({ error: "Error al actualizar el CI" });
    }
  },
  async remove(req, res) {
    const id = req.params.id;

    try {
      const deletedCI = await CIService.deleteCI(id);
      res.json({ message: "CI eliminado", data: deletedCI });
    } catch (err) {
      console.error("Error al eliminar CI:", err.message);
      res.status(500).json({ error: "Error al eliminar el CI" });
    }
  },
  async getById(req, res) {
    const id = req.params.id;
    try {
      const ci = await CIService.getCIById(id);
      res.json(ci);
    } catch (err) {
      console.error("Error al obtener CI:", err.message);
      res
        .status(404)
        .json({ error: "Elemento de configuración no encontrado" });
    }
  },
  async relate(req, res) {
    const { id: parentId } = req.params;
    const { childId, relationType } = req.body;

    try {
      const relation = await CIService.relateCIs(
        parentId,
        childId,
        relationType
      );
      res.status(201).json(relation);
    } catch (err) {
      console.error("Error al crear relación:", err.message);
      res.status(500).json({ error: "Error al crear la relación" });
    }
  },

  async getRelations(req, res) {
    const { id } = req.params;

    try {
      const relations = await CIService.getRelations(id);
      res.json(relations);
    } catch (err) {
      console.error("Error al obtener relaciones:", err.message);
      res.status(500).json({ error: "Error al obtener relaciones del CI" });
    }
  },
  async getChangeHistory(req, res) {
    const { id } = req.params;

    try {
      const history = await CIService.getChangeHistory(id);
      res.json(history);
    } catch (err) {
      console.error("Error al obtener historial:", err.message);
      res
        .status(500)
        .json({ error: "Error al obtener historial de cambios del CI" });
    }
  },
  async filter(req, res) {
    try {
      const filters = req.query;
      const cis = await CIService.filterCIs(filters);
      res.json(cis);
    } catch (err) {
      console.error("Error al filtrar CIs:", err.message);
      res
        .status(500)
        .json({ error: "Error al filtrar los elementos de configuración" });
    }
  },
};

module.exports = CIController;

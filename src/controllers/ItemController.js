import models from "../models/index.js";

const { Item } = models;

export default {
  async index(_req, res) {
    const items = await Item.findAll({ order: [["id", "ASC"]] });
    res.json(items);
  },

  async show(req, res) {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ message: "Item não encontrado" });
    res.json(item);
  },

  async create(req, res) {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Nome é obrigatório" });
    const item = await Item.create({ name, description });
    res.status(201).json(item);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ message: "Item não encontrado" });
    await item.update({ name: name ?? item.name, description });
    res.json(item);
  },

  async destroy(req, res) {
    const { id } = req.params;
    const item = await Item.findByPk(id);
    if (!item) return res.status(404).json({ message: "Item não encontrado" });
    await item.destroy();
    res.status(204).send();
  },
};

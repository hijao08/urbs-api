import models, { sequelize } from "../models/index.js";
import { getUrbsHorariosLinha } from "../services/UrbsApiService.js";

const { UrbsSchedule } = models;

function mapApiRowToModel(row) {
  return {
    cod: String(row?.COD || ""),
    hora: String(row?.HORA || ""),
    ponto: String(row?.PONTO || ""),
    dia: String(row?.DIA || ""),
    num: String(row?.NUM || ""),
    tabela: row?.TABELA ? String(row.TABELA) : null,
    adapt: row?.ADAPT ? String(row.ADAPT) : null,
  };
}

export default {
  async list(req, res) {
    const { cod, limit = 700 } = req.query;
    const where = cod ? { cod } : undefined;
    const items = await UrbsSchedule.findAll({
      where,
      order: [
        ["dia", "ASC"],
        [
          sequelize.literal(
            "CASE WHEN hora::time < time '04:00' " +
              "THEN (timestamp '2000-01-02' + hora::time) " +
              "ELSE (timestamp '2000-01-01' + hora::time) END"
          ),
          "ASC",
        ],
      ],
      limit: Number(limit),
    });
    res.json(items);
  },

  async listByDia(req, res) {
    const { cod, dia, limit = 700 } = req.query;
    if (!dia)
      return res.status(400).json({ message: "Parâmetro 'dia' é obrigatório" });
    const where = { dia: String(dia) };
    if (cod) where.cod = String(cod);

    const items = await UrbsSchedule.findAll({
      where,
      order: [
        [
          sequelize.literal(
            "CASE WHEN hora::time < time '04:00' " +
              "THEN (timestamp '2000-01-02' + hora::time) " +
              "ELSE (timestamp '2000-01-01' + hora::time) END"
          ),
          "ASC",
        ],
      ],
      limit: Number(limit),
    });

    res.json(items);
  },

  async listByDiaEPonto(req, res) {
    const { dia, ponto, cod, limit = 700 } = req.query;
    if (!dia)
      return res.status(400).json({ message: "Parâmetro 'dia' é obrigatório" });
    if (!ponto)
      return res
        .status(400)
        .json({ message: "Parâmetro 'ponto' é obrigatório" });

    const where = { dia: String(dia), ponto: String(ponto) };
    if (cod) where.cod = String(cod);

    const items = await UrbsSchedule.findAll({
      where,
      order: [
        [
          sequelize.literal(
            "CASE WHEN hora::time < time '04:00' " +
              "THEN (timestamp '2000-01-02' + hora::time) " +
              "ELSE (timestamp '2000-01-01' + hora::time) END"
          ),
          "ASC",
        ],
      ],
      limit: Number(limit),
    });

    res.json(items);
  },

  async sync(req, res) {
    const { linha = "303", c = "858ce" } = req.query;
    const data = await getUrbsHorariosLinha({ linha, c });
    const rows = Array.isArray(data) ? data : [];
    const mapped = rows
      .map(mapApiRowToModel)
      .filter((r) => r.cod && r.hora && r.num);

    if (mapped.length === 0) {
      return res.status(400).json({ message: "Nenhum dado para sincronizar" });
    }

    await UrbsSchedule.bulkCreate(mapped, {
      ignoreDuplicates: true,
    });

    res.json({ message: "Sync concluído", insertedOrIgnored: mapped.length });
  },
};

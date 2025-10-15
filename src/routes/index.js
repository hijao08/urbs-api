import { Router } from "express";
import apiRoutes from "./v1.js";
import { getExamplePosts } from "../services/ExternalApiService.js";
import { sequelize } from "../models/index.js";
import UrbsController from "../controllers/UrbsController.js";
import { getUrbsHorariosLinha } from "../services/UrbsApiService.js";

const router = Router();

router.get("/db/health", async (_req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.use("/v1", apiRoutes);

router.get("/external/posts", async (_req, res) => {
  const data = await getExamplePosts();
  res.json(data);
});

router.get("/urbs/horarios-linha", async (req, res) => {
  try {
    const { linha = "303", c = "858ce" } = req.query;
    const data = await getUrbsHorariosLinha({ linha, c });
    res.json(data);
  } catch (err) {
    const status = err?.response?.status || 500;
    res.status(status).json({ message: err.message, status });
  }
});

router.post("/urbs/horarios-linha/sync", UrbsController.sync);
router.get("/urbs/horarios-linha/db", UrbsController.list);
router.get("/urbs/horarios-linha/db/dia", UrbsController.listByDia);

export default router;

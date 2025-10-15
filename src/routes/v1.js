import { Router } from "express";
import ItemController from "../controllers/ItemController.js";

const router = Router();

router.get("/items", ItemController.index);
router.get("/items/:id", ItemController.show);
router.post("/items", ItemController.create);
router.put("/items/:id", ItemController.update);
router.delete("/items/:id", ItemController.destroy);

export default router;

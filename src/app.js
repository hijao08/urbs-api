import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.use("/api", routes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;

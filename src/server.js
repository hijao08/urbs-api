import "dotenv/config";
import app from "./app.js";
import { sequelize } from "./models/index.js";

const port = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Falha ao conectar ao banco ou iniciar o servidor:", err);
    process.exit(1);
  }
}

bootstrap();

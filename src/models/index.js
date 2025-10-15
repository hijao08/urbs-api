import sequelize from "../config/database.js";
import initItemModel from "./Item.js";

const models = {};

models.Item = initItemModel(sequelize);

export { sequelize };
export default models;

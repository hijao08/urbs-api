import sequelize from "../config/database.js";
import initItemModel from "./Item.js";
import initUrbsScheduleModel from "./UrbsSchedule.js";

const models = {};

models.Item = initItemModel(sequelize);
models.UrbsSchedule = initUrbsScheduleModel(sequelize);

export { sequelize };
export default models;

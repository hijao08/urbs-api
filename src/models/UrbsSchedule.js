import { DataTypes, Model } from "sequelize";

export default function initUrbsScheduleModel(sequelize) {
  class UrbsSchedule extends Model {}

  UrbsSchedule.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
      cod: { type: DataTypes.STRING(10), allowNull: false }, // código da linha (ex.: 303)
      hora: { type: DataTypes.STRING(5), allowNull: false }, // HH:MM como string
      ponto: { type: DataTypes.STRING(120), allowNull: false },
      dia: { type: DataTypes.STRING(2), allowNull: false },
      num: { type: DataTypes.STRING(16), allowNull: false },
      tabela: { type: DataTypes.STRING(8), allowNull: true },
      adapt: { type: DataTypes.STRING(60), allowNull: true },
    },
    {
      sequelize,
      tableName: "urbs_schedules",
      modelName: "UrbsSchedule",
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          name: "uniq_schedule_key",
          fields: ["cod", "num", "dia", "tabela", "hora"],
        },
        { fields: ["cod", "hora"] },
      ],
    }
  );

  return UrbsSchedule;
}

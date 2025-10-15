import { DataTypes, Model } from "sequelize";

export default function initItemModel(sequelize) {
  class Item extends Model {}

  Item.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "items",
      modelName: "Item",
      timestamps: true,
      underscored: true,
    }
  );

  return Item;
}

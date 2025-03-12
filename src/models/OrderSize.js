import { DataTypes, Model } from "sequelize";

class OrderSize extends Model {
    static initialize(sequelize) {
        OrderSize.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                order_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                size_type: {
                    type: DataTypes.ENUM("kids", "regular"),
                    allowNull: false,
                },
                size_name: {
                    type: DataTypes.ENUM("2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"),
                    allowNull: false,
                },
                ls_qty: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                },
                ss_qty: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                },
                damege_ls_qty: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                },
                damege_ss_qty: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                },
            },
            {
                sequelize,
                modelName: "OrderSize",
                tableName: "order_sizes",
                timestamps: true,
                createdAt: "created_at",
                updatedAt: "updated_at",
                indexes: [
                    {
                        unique: false,
                        fields: ["order_id"],
                    },
                ],
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Order, { foreignKey: "order_id" });
    }
}

export default OrderSize;
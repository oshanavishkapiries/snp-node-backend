import { DataTypes, Model } from "sequelize";

class Order extends Model {
    static initialize(sequelize) {
        Order.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                design_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                type: {
                    type: DataTypes.ENUM("DTF", "SUBLIMATION"),
                },
                sublimation: {
                    type: DataTypes.ENUM("SNP_FABRIC", "CLIENT_FABRIC", "PRINT_ONLY", "OTHER"),
                },
                dtf: {
                    type: DataTypes.ENUM("OTHER"),
                },
                pattern_type: {
                    type: DataTypes.ENUM("REGULAR", "RAGLAND", "BOTTOM", "SHORTS", "JACKET", "FLAG", "TIE", "FROCK", "OTHER"),
                },
                fabric_type: {
                    type: DataTypes.ENUM("WETLOOK", "CLOSEHOL", "HONEY_CO", "BABY_PK", "TRICOT", "OTHER"),
                },
                order_status: {
                    type: DataTypes.ENUM("ORDERED", "DESIGNING", "DESIGNED", "START", "PRINTING_CUTTING", "PRESSING", "DAMAGE", "COMPLETED"),
                },
                cutting_status: {
                    type: DataTypes.ENUM("PENDING", "DONE"),
                },
                printing_status: {
                    type: DataTypes.ENUM("PENDING", "DONE"),
                },
                is_damage: {
                    type: DataTypes.BOOLEAN,
                },
                damage_id: {
                    type: DataTypes.STRING,
                },
                payment_status: {
                    type: DataTypes.ENUM("UNPAID", "FULL", "HALF", "PARTIAL"),
                },
                total_qty: {
                    type: DataTypes.INTEGER,
                },
                start_date: {
                    type: DataTypes.DATE,
                },
                end_date: {
                    type: DataTypes.DATE,
                },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
                created_by: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                is_active: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                },
            },
            {
                sequelize,
                modelName: "Order",
                tableName: "orders",
                timestamps: true,
                createdAt: "created_at",
                updatedAt: "updated_at",
                indexes: [
                    {
                        unique: false,
                        fields: ["created_by"],
                    }
                ]
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: "created_by" });
        this.hasMany(models.OrderSize, { foreignKey: "order_id" });
    }
}

export default Order;
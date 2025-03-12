import { Model, DataTypes } from "sequelize";

class User extends Model {
  static initialize(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING(120),
          allowNull: true,
          unique: true,
        },
        full_name: {
          type: DataTypes.STRING(160),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone_number: {
          type: DataTypes.STRING(15),
          allowNull: false,
          unique: true,
        },
        country_code: {
          type: DataTypes.STRING(5),
          allowNull: false,
        },
        dial_code: {
          type: DataTypes.STRING(5),
          allowNull: true,
        },
        role: {
          type: DataTypes.ENUM(
            "DESIGNER",
            "CUTTER",
            "PRINTER",
            "ACCOUNTANT",
            "PRESSER",
            "CLIENT",
            "ADMIN"
          ),
          allowNull: false,
          defaultValue: "CLIENT",
        },
        mode: {
          type: DataTypes.ENUM("LIGHT", "DARK"),
          allowNull: false,
          defaultValue: "LIGHT",
        },
        size_chart_type: {
          type: DataTypes.ENUM("TYPE_ONE", "TYPE_TWO"),
          allowNull: false,
          defaultValue: "TYPE_ONE",
        },
        verification_code: {
          type: DataTypes.STRING,
        },
        verification_code_generated_date_time: {
          type: DataTypes.DATE,
        },
        is_first_login: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        is_account_verified: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        indexes: [
          {
            unique: true,
            fields: ["phone_number"],
          },
          {
            fields: ["role"],
          },
        ],
        hooks: {
          beforeUpdate: (user) => {
            user.updated_at = new Date();
          },
        },
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Order, { foreignKey: "created_by" });
  }
}

export default User;
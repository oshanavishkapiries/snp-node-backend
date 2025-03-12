"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query(
    //   "CREATE TYPE enum_users_role AS ENUM ('DESIGNER', 'CUTTER', 'PRINTER', 'ACCOUNTANT', 'PRESSER', 'CLIENT', 'ADMIN');",
    //   "CREATE TYPE enum_users_mode AS ENUM ('LIGHT', 'DARK');",
    //   "CREATE TYPE enum_users_size_chart_type AS ENUM ('TYPE_ONE', 'TYPE_TWO');",
    // );
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(120),
        allowNull: true,
        unique: true,
      },
      full_name: {
        type: Sequelize.STRING(160),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      country_code: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      dial_code: {
        type: Sequelize.STRING(5),
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM(
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
        type: Sequelize.ENUM("LIGHT", "DARK"),
        allowNull: false,
        defaultValue: "LIGHT",
      },
      size_chart_type: {
        type: Sequelize.ENUM("TYPE_ONE", "TYPE_TWO"),
        allowNull: false,
        defaultValue: "TYPE_ONE",
      },
      verification_code: {
        type: Sequelize.STRING,
      },
      verification_code_generated_date_time: {
        type: Sequelize.DATE,
      },
      is_first_login: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_account_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Indexes for phone_number and role
    await queryInterface.addIndex("users", ["phone_number"], {
      unique: true,
    });
    await queryInterface.addIndex("users", ["role"]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_users_role;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_users_mode;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_users_size_chart_type;"
    );
  },
};
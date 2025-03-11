"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dial_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
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
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
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

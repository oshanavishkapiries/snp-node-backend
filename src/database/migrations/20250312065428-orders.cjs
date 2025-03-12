"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

      // create type order
      // await queryInterface.sequelize.query(`
      //   CREATE TYPE "enum_orders_type" AS ENUM ('DTF', 'SUBLIMATION');
      //   CREATE TYPE "enum_orders_sublimation" AS ENUM ('SNP_FABRIC', 'CLIENT_FABRIC', 'PRINT_ONLY', 'OTHER');
      //   CREATE TYPE "enum_orders_dtf" AS ENUM ('OTHER');
      //   CREATE TYPE "enum_orders_pattern_type" AS ENUM ('REGULAR', 'RAGLAND', 'BOTTOM', 'SHORTS', 'JACKET', 'FLAG', 'TIE', 'FROCK', 'OTHER');
      //   CREATE TYPE "enum_orders_fabric_type" AS ENUM ('WETLOOK', 'CLOSEHOL', 'HONEY_CO', 'BABY_PK', 'TRICOT', 'OTHER');
      //   CREATE TYPE "enum_orders_order_status" AS ENUM ('ORDERED', 'DESIGNING', 'DESIGNED', 'START', 'PRINTING_CUTTING', 'PRESSING', 'DAMAGE', 'COMPLETED');
      //   CREATE TYPE "enum_orders_cutting_status" AS ENUM ('PENDING', 'DONE');
      //   CREATE TYPE "enum_orders_printing_status" AS ENUM ('PENDING', 'DONE');
      //   CREATE TYPE "enum_orders_payment_status" AS ENUM ('UNPAID', 'FULL', 'HALF', 'PARTIAL');
      // `);

    await queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      design_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("DTF", "SUBLIMATION"),
      },
      sublimation: {
        type: Sequelize.ENUM("SNP_FABRIC", "CLIENT_FABRIC", "PRINT_ONLY", "OTHER"),
      },
      dtf: {
        type: Sequelize.ENUM("OTHER"),
      },
      pattern_type: {
        type: Sequelize.ENUM("REGULAR", "RAGLAND", "BOTTOM", "SHORTS", "JACKET", "FLAG", "TIE", "FROCK", "OTHER"),
      },
      fabric_type: {
        type: Sequelize.ENUM("WETLOOK", "CLOSEHOL", "HONEY_CO", "BABY_PK", "TRICOT", "OTHER"),
      },
      order_status: {
        type: Sequelize.ENUM("ORDERED", "DESIGNING", "DESIGNED", "START", "PRINTING_CUTTING", "PRESSING", "DAMAGE", "COMPLETED"),
      },
      cutting_status: {
        type: Sequelize.ENUM("PENDING", "DONE"),
      },
      printing_status: {
        type: Sequelize.ENUM("PENDING", "DONE"),
      },
      is_damage: {
        type: Sequelize.BOOLEAN,
      },
      damage_id: {
        type: Sequelize.STRING,
      },
      payment_status: {
        type: Sequelize.ENUM("UNPAID", "FULL", "HALF", "PARTIAL"),
      },
      total_qty: {
        type: Sequelize.INTEGER,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });

    // Add index on 'created_by' column
    await queryInterface.addIndex("orders", ["created_by"]);

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_orders_type;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_orders_sublimation;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_orders_dtf;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_orders_pattern_type;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_orders_fabric_type;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_orders_order_status;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_orders_cutting_status;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_orders_printing_status;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_orders_payment_status;"
    );
  },
};

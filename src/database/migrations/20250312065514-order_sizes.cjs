"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create ENUM types for order_sizes
    // await queryInterface.sequelize.query(`
    //   CREATE TYPE "enum_order_sizes_size_type" AS ENUM ('kids', 'regular');
    //   CREATE TYPE "enum_order_sizes_size_name" AS ENUM ('2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl');
    // `);
    await queryInterface.createTable("order_sizes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      size_type: {
        type: Sequelize.ENUM("kids", "regular"),
        allowNull: false,
      },
      size_name: {
        type: Sequelize.ENUM("2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"),
        allowNull: false,
      },
      ls_qty: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      ss_qty: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      damege_ls_qty: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      damege_ss_qty: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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

    // Add index on 'order_id' column
    await queryInterface.addIndex("order_sizes", ["order_id"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order_sizes");
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_order_sizes_size_type;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_order_sizes_size_name;"
    );
  },
};

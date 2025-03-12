import { getSequelize } from '../config/database.js';
import User from './User.js';
import Order from './Order.js';
import OrderSize from './OrderSize.js';

// Add all models here
const models = {
  User,
  Order,
  OrderSize
};

export const initializeModels = async () => {
  const sequelize = getSequelize();

  // Initialize all models
  Object.values(models).forEach(model => {
    if (typeof model.initialize === 'function') {
      model.initialize(sequelize);
    }
  });

  // Set up associations
  Object.values(models).forEach(model => {
    if (typeof model.associate === 'function') {
      model.associate(models);
    }
  });

  return models;
};

export default models; 
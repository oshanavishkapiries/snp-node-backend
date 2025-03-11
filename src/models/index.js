import { getSequelize } from '../config/database.js';
import User from './User.js';

// Add all models here
const models = {
  User
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
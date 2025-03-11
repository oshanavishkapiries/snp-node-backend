import User from "../models/User.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

class UserService {
  // Get all users (admin only)
  async getAllUsers() {
    try {
      return await User.findAll({
        attributes: { exclude: ["password"] },
      });
    } catch (error) {
      throw new Error("Error fetching users: " + error.message);
    }
  }

  // Get user by ID (admin only)
  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching user: " + error.message);
    }
  }

  // Create new user (admin only)
  async createUser(userData) {
    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email: userData.email }, { full_name: userData.full_name }],
        },
      });

      if (existingUser) {
        throw new Error("User with this email or username already exists");
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      return await User.create({
        ...userData,
        password: hashedPassword,
      });
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  // Update user (admin only)
  async updateUser(userId, updateData) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Prevent updating password through this method
      delete updateData.password;

      await user.update(updateData);
      return user;
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  // Delete user (admin only)
  async deleteUser(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }
      await user.destroy();
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }

  // Update user password (admin only)
  async updateUserPassword(userId, newPassword) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await user.update({ password: hashedPassword });
      return { message: "Password updated successfully" };
    } catch (error) {
      throw new Error("Error updating password: " + error.message);
    }
  }

  // Toggle user active status (admin only)
  async toggleUserStatus(userId) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }

      await user.update({ isActive: !user.isActive });
      return user;
    } catch (error) {
      throw new Error("Error toggling user status: " + error.message);
    }
  }
}

export default new UserService();

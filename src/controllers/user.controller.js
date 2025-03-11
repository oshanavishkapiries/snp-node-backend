import userService from '../services/user.service.js';
import { successResponse, badRequestResponse, notFoundResponse, serverErrorResponse } from '../utils/response.utils.js';

class UserController {
  // Get all users (admin only)
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      return successResponse(res, "Users retrieved successfully", users);
    } catch (error) {
      return serverErrorResponse(res, error.message);
    }
  }

  // Get user by ID (admin only)
  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      return successResponse(res, "User retrieved successfully", user);
    } catch (error) {
      if (error.message.includes("not found")) {
        return notFoundResponse(res, error.message);
      }
      return serverErrorResponse(res, error.message);
    }
  }

  // Create new user (admin only)
  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      return successResponse(res, "User created successfully", user);
    } catch (error) {
      if (error.message.includes("already exists")) {
        return badRequestResponse(res, error.message);
      }
      return serverErrorResponse(res, error.message);
    }
  }

  // Update user (admin only)
  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      return successResponse(res, "User updated successfully", user);
    } catch (error) {
      if (error.message.includes("not found")) {
        return notFoundResponse(res, error.message);
      }
      return serverErrorResponse(res, error.message);
    }
  }

  // Delete user (admin only)
  async deleteUser(req, res) {
    try {
      const result = await userService.deleteUser(req.params.id);
      return successResponse(res, result.message);
    } catch (error) {
      if (error.message.includes("not found")) {
        return notFoundResponse(res, error.message);
      }
      return serverErrorResponse(res, error.message);
    }
  }

  // Update user password (admin only)
  async updateUserPassword(req, res) {
    try {
      const result = await userService.updateUserPassword(req.params.id, req.body.newPassword);
      return successResponse(res, result.message);
    } catch (error) {
      if (error.message.includes("not found")) {
        return notFoundResponse(res, error.message);
      }
      return serverErrorResponse(res, error.message);
    }
  }

  // Toggle user active status (admin only)
  async toggleUserStatus(req, res) {
    try {
      const user = await userService.toggleUserStatus(req.params.id);
      return successResponse(res, "User status updated successfully", user);
    } catch (error) {
      if (error.message.includes("not found")) {
        return notFoundResponse(res, error.message);
      }
      return serverErrorResponse(res, error.message);
    }
  }
}

export default new UserController(); 
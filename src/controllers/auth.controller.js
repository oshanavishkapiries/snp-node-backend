import { AuthService } from "../services/auth.service.js";
import {
  successResponse,
  badRequestResponse,
  notFoundResponse,
  serverErrorResponse,
  unauthorizedResponse,
} from "../utils/response.utils.js";
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
} from "../utils/errors.js";
import logger from "../utils/logger.utils.js";

export const AuthController = {
  /** User registration */
  async registerUser(req, res) {
    const {
      full_name,
      email,
      password,
      phone_number,
      country_code,
      dial_code,
      role,
    } = req.body;

    try {
      if (
        !full_name ||
        !email ||
        !password ||
        !phone_number ||
        !country_code ||
        !dial_code ||
        !role
      ) {
        return badRequestResponse(res, "Required fields are missing!");
      }

      const response = await AuthService.registerUser(req.body);
      return successResponse(res, response.message, response.data);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  },

  /** User login */
  async loginUser(req, res) {
    try {
      const { phone_number, password } = req.body;

      if (!phone_number || !password) {
        return badRequestResponse(
          res,
          "Phone number and password are required!"
        );
      }

      const response = await AuthService.loginUser(req.body);
      return successResponse(res, response.message, response.data);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  },

  /** Verify mobile number */
  async verifyMobileNumber(req, res) {
    try {
      const { userId, code } = req.body;

      if (!userId || !code) {
        return badRequestResponse(
          res,
          "User ID and verification code are required!"
        );
      }

      const response = await AuthService.verifyMobileNumber(req.body);
      return successResponse(res, response.message, response.data);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  },

  /** Request password reset */
  async requestPasswordReset(req, res) {
    try {
      const { phone_number } = req.body;

      if (!phone_number) {
        return badRequestResponse(res, "Phone number is required!");
      }

      const response = await AuthService.requestPasswordReset(req.body);
      return successResponse(res, response.message, response.data);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  },

  /** Reset password */
  async resetPassword(req, res) {
    try {
      const { userId, code, newPassword } = req.body;

      if (!userId || !code || !newPassword) {
        return badRequestResponse(
          res,
          "User ID, verification code, and new password are required!"
        );
      }

      const response = await AuthService.resetPassword(req.body);
      return successResponse(res, response.message, response.data);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  },

  /** Auth */
  async authData(req, res) {
    try {
      const { userId } = req.query;

      if (!userId) {
        return badRequestResponse(res, "User ID is required!");
      }

      const response = await AuthService.authData(req.query);
      return successResponse(res, response.message, response.data);
    } catch (error) {
      return handleErrorResponse(res, error);
    }
  },
};

/** Centralized Error Handling */
const handleErrorResponse = (res, error) => {
  logger.error("Error:", error);
  if (error instanceof InternalServerError)
    return serverErrorResponse(res, error.message);
  if (error instanceof BadRequestError)
    return badRequestResponse(res, error.message);
  if (error instanceof UnauthorizedError)
    return unauthorizedResponse(res, error.message);
  if (error instanceof NotFoundError)
    return notFoundResponse(res, error.message);
  return serverErrorResponse(res, error.message || "Internal Server Error");
};

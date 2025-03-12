import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.utils.js";
import { sendSms } from "../utils/dialog-sms.utils.js";
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
} from "../utils/errors.js";
import logger from "../utils/logger.utils.js";

// Helper functions
const generateVerificationCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
const hashPassword = async (password) => bcrypt.hash(password, 10);
const isVerificationCodeExpired = (generatedTime, expiryMinutes = 10) =>
  new Date() - new Date(generatedTime) > expiryMinutes * 60 * 1000;

export const AuthService = {
  /** Register a new user */
  async registerUser(dto) {
    const {
      full_name,
      email,
      password,
      phone_number,
      country_code,
      dial_code,
      role,
    } = dto;
    try {
      // Check if phone number already exists
      const existingPhoneUser = await User.findOne({
        where: { phone_number, is_active: true },
        attributes: ["id"],
      });

      if (existingPhoneUser) {
        throw new BadRequestError("Phone number already exists.");
      }

      // Check if email already exists
      const existingEmailUser = await User.findOne({
        where: { email, is_active: true },
        attributes: ["id"],
      });

      if (existingEmailUser) {
        throw new BadRequestError("Email already exists.");
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Generate verification code
      // const verificationCode = generateVerificationCode();
      const verificationCode = "123456";
      console.log(verificationCode);
      const hashedVerificationCode = await hashPassword(verificationCode);
      console.log(hashedVerificationCode);
      // Create user
      const user = await User.create({
        full_name,
        email,
        phone_number,
        country_code,
        dial_code,
        role,
        mode: "LIGHT",
        size_chart_type: "TYPE_ONE",
        is_first_login: true,
        is_account_verified: false,
        password: hashedPassword,
        verification_code: hashedVerificationCode,
        verification_code_generated_date_time: new Date(),
        is_active: true,
      });

      // Send verification SMS
      await sendSms({
        to: country_code + dial_code,
        message: `Your verification code is: ${verificationCode}`,
      });

      return {
        success: true,
        message: "User created successfully",
        data: {
          userId: user.id,
          is_first_login: user.is_first_login,
          is_account_verified: user.is_account_verified,
        },
      };
    } catch (error) {
      logger.error("Error creating user:", error);
      if (
        error instanceof NotFoundError ||
        error instanceof BadRequestError ||
        error instanceof UnauthorizedError ||
        error instanceof UnauthorizedError
      ) {
        throw error;
      }
      throw new InternalServerError("Registration failed.");
    }
  },

  /** Authenticate user */
  async loginUser(dto) {
    const { phone_number, password } = dto;
    try {
      // Find user
      const user = await User.findOne({
        where: { phone_number, is_active: true },
        attributes: [
          "id",
          "password",
          "full_name",
          "email",
          "country_code",
          "dial_code",
          "role",
          "is_first_login",
          "is_account_verified",
          "is_active",
        ],
      });
      if (!user) throw new UnauthorizedError("Invalid credentials");

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new UnauthorizedError("Invalid credentials");

      // Generate token
      const token = generateToken(user);
      return {
        success: true,
        message: "Login successful",
        data: {
          token,
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          country_code: user.country_code,
          dial_code: user.dial_code,
          role: user.role,
          is_first_login: user.is_first_login,
          is_account_verified: user.is_account_verified,
          is_active: user.is_active,
        },
      };
    } catch (error) {
      logger.error("Login error:", error);
      if (
        error instanceof NotFoundError ||
        error instanceof BadRequestError ||
        error instanceof UnauthorizedError ||
        error instanceof UnauthorizedError
      ) {
        throw error;
      }
      throw new InternalServerError("Login failed.");
    }
  },

  /** Verify mobile number */
  async verifyMobileNumber(dto) {
    const { userId, code } = dto;
    try {
      const user = await User.findOne({
        where: { id:userId, is_active: true },
      });
      if (!user) throw new NotFoundError("User not found");
      if (isVerificationCodeExpired(user.verification_code_generated_date_time))
        throw new BadRequestError("Verification code expired");

      if (!(await bcrypt.compare(code.toString(), user.verification_code))) {
        throw new BadRequestError("Invalid verification code");
      }

      await user.update({
        is_active: true,
        is_account_verified: true,
        is_first_login: false,
        verification_code: null,
        verification_code_generated_date_time: null,
      });
      return { success: true, message: "Mobile number verified successfully" };
    } catch (error) {
      logger.error("Verification error:", error);
      if (
        error instanceof NotFoundError ||
        error instanceof BadRequestError ||
        error instanceof UnauthorizedError ||
        error instanceof UnauthorizedError
      ) {
        throw error;
      }
      throw new InternalServerError("Verification failed.");
    }
  },

  /** Request password reset */
  async requestPasswordReset(dto) {
    const { phone_number } = dto;
    try {
      const user = await User.findOne({
        where: { phone_number, is_active: true },
        attributes: ["id"],
      });
      if (!user) throw new NotFoundError("User not found");

      //const verificationCode = generateVerificationCode();
      const verificationCode = "123456";
      const hashedVerificationCode = await hashPassword(verificationCode);
      await user.update({
        verification_code: hashedVerificationCode,
        verification_code_generated_date_time: new Date(),
      });

      const msg = await sendSms({
        to: phone_number,
        message: `Your password reset code is: ${verificationCode}`,
      });
      console.log(msg);
      return {
        success: true,
        message: "Password reset code sent successfully",
        data: { userId: user.id },
      };
    } catch (error) {
      logger.error("Password reset request error:", error);
      if (
        error instanceof NotFoundError ||
        error instanceof BadRequestError ||
        error instanceof UnauthorizedError ||
        error instanceof UnauthorizedError
      ) {
        throw error;
      }
      throw new InternalServerError("Password reset request failed.");
    }
  },

  /** Reset password */
  async resetPassword(dto) {
    const { userId, code, newPassword } = dto;
    try {
      const user = await User.findOne({
        where: { id:userId, is_active: true },
      });
      if (!user) throw new NotFoundError("User not found");
      if (isVerificationCodeExpired(user.verification_code_generated_date_time))
        throw new BadRequestError("Verification code expired");
      if (!(await bcrypt.compare(user.verification_code, code)))
        throw new BadRequestError("Invalid verification code");

      const hashedPassword = await hashPassword(newPassword);
      await user.update({
        password: hashedPassword,
        verification_code: null,
        verification_code_generated_date_time: null,
      });
      return { success: true, message: "Password reset successfully" };
    } catch (error) {
      logger.error("Password reset error:", error);
      if (
        error instanceof NotFoundError ||
        error instanceof BadRequestError ||
        error instanceof UnauthorizedError ||
        error instanceof UnauthorizedError
      ) {
        throw error;
      }
      throw new InternalServerError("Password reset failed.");
    }
  },

    /** Auth  */
  async authData(dto) {
    const { userId } = dto;
    try {
      const user = await User.findOne({
        where: { id:userId, is_active: true },
      });
      if (!user) throw new NotFoundError("User not found");
      
      return { success: true, message: "Auth data fetched successfully", data: user };
    } catch (error) {
      logger.error("Password reset error:", error);
      if (
        error instanceof NotFoundError ||
        error instanceof BadRequestError ||
        error instanceof UnauthorizedError ||
        error instanceof UnauthorizedError
      ) {
        throw error;
      }
      throw new InternalServerError("Auth data retrieve failed.");
    }
  },
};

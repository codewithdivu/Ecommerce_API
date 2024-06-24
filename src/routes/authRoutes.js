import express from "express";

import {
  register,
  login,
  resetPassword,
  forgotPassword,
} from "../controllers/authController.js";

const AuthRouter = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *         - Register an user
 *     parameters:
 *         - in: body
 *           name: Register User
 *           descryption: User Data
 *           schema:
 *             type: object
 *             required:
 *                - email
 *                - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               username:
 *                 type: string
 *                 example: johndoe
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email and password are required
 *       409:
 *         description: User already exists
 */
AuthRouter.route("/register").post(register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Successfully logged in
 *       400:
 *         description: Email or password is incorrect
 */
AuthRouter.route("/login").post(login);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *               otp:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid OTP or missing fields
 *       404:
 *         description: User not found
 */
AuthRouter.route("/reset-password").post(resetPassword);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       404:
 *         description: User not found
 */
AuthRouter.route("/forgot-password").post(forgotPassword);

export default AuthRouter;

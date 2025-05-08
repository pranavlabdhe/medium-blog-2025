import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

// ─────────────────────────────────────────────────────────────
// @desc    Send password reset email
// @route   POST /api/auth/forgot-password
// @access  Public
// ─────────────────────────────────────────────────────────────
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(errorHandler(400, 'Email is required'));

  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, 'User not found'));

    const token = crypto.randomBytes(32).toString('hex');

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Reset Your Password',
      html: `
        <p>You requested to reset your password.</p>
        <p>Click <a href="${resetLink}">here</a> to reset it. This link will expire in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Reset email sent successfully' });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────────────────────
// @desc    Reset the user password using the token
// @route   POST /api/auth/reset-password/:token
// @access  Public
// ─────────────────────────────────────────────────────────────
export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

//   console.log('Received Token:', token);
//   console.log('Received Password:', password);

  if (!password) return next(errorHandler(400, 'Password is required'));

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return next(errorHandler(400, 'Invalid or expired token'));

    user.password = bcryptjs.hashSync(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    next(err);
  }
};
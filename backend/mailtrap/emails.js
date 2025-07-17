import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

dotenv.config();

const emailUser = process.env.GMAIL_USER;
const emailPass = process.env.GMAIL_APP_PASSWORD;

if (!emailUser || !emailPass) {
  console.error('GMAIL_USER and GMAIL_APP_PASSWORD must be set in environment variables!');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass
  }
});

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    console.log(`Attempting to send verification email to: ${email}`);
    await transporter.verify();
    const response = await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: "Verify your email - PONS Broilers",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    });
    console.log("Email sent successfully", response.messageId);
    return { success: true, messageId: response.messageId };
  } catch (error) {
    console.error(`Error sending verification email:`, error);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    console.log(`Attempting to send password reset email to: ${email}`);
    await transporter.verify();
    const response = await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: "Reset your password - PONS Broilers",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });
    console.log("Password reset email sent successfully", response.messageId);
    return { success: true, messageId: response.messageId };
  } catch (error) {
    console.error(`Error sending password reset email:`, error);
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    console.log(`Attempting to send password reset success email to: ${email}`);
    await transporter.verify();
    const response = await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: "Password Reset Successful - PONS Broilers",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log("Password reset success email sent successfully", response.messageId);
    return { success: true, messageId: response.messageId };
  } catch (error) {
    console.error(`Error sending password reset success email:`, error);
    throw new Error(`Error sending password reset success email: ${error.message}`);
  }
};

import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

dotenv.config();

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_USER || "ponsmuttonstallandbroilerss@gmail.com",
		pass: process.env.EMAIL_PASS || "xbew urkj vwjj wyne"
	},
});

export const sendVerificationEmail = async (email, verificationToken) => {
	try {
		console.log(`Attempting to send verification email to: ${email}`);
		const response = await transporter.sendMail({
			from: process.env.EMAIL_USER || "ponsmuttonstallandbroilerss@gmail.com",
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

// export const sendWelcomeEmail = async (email, name) => {

// 	try {
// 		const response = await transporter.sendMail({
// 			// from: sender,
// 			to: recipient,
// 			template_uuid: "e65925d1-a9d1-4a40-ae7c-d92b37d593df",
// 			template_variables: {
// 				company_info_name: "Auth Company",
// 				name: name,
// 			},
// 		});

// 		console.log("Welcome email sent successfully", response);
// 	} catch (error) {
// 		console.error(`Error sending welcome email`, error);

// 		throw new Error(`Error sending welcome email: ${error}`);
// 	}
// };

export const sendPasswordResetEmail = async (email, resetURL) => {
	try {
		console.log(`Attempting to send password reset email to: ${email}`);
		const response = await transporter.sendMail({
			from: process.env.EMAIL_USER || "ponsmuttonstallandbroilerss@gmail.com",
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
		const response = await transporter.sendMail({
			from: process.env.EMAIL_USER || "ponsmuttonstallandbroilerss@gmail.com",
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

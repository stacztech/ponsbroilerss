import nodemailer from 'nodemailer';
import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js';

// Simple email service with multiple fallback configurations
export const sendEmailOTP = async (email, otp) => {
    const configurations = [
        // Configuration 1: Gmail SMTP with port 587
        {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'ponsmuttonstallandbroilerss@gmail.com',
                pass: 'xbew urkj vwjj wyne'
            }
        },
        // Configuration 2: Gmail SMTP with port 465
        {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'ponsmuttonstallandbroilerss@gmail.com',
                pass: 'xbew urkj vwjj wyne'
            }
        }
    ];

    for (let i = 0; i < configurations.length; i++) {
        try {
            console.log(`Trying email configuration ${i + 1}...`);
            const transporter = nodemailer.createTransport(configurations[i]);
            
            // Test the connection
            await transporter.verify();
            console.log(`Email configuration ${i + 1} verified successfully`);
            
            const result = await transporter.sendMail({
                from: 'ponsmuttonstallandbroilerss@gmail.com',
                to: email,
                subject: 'Your OTP Code - PONS Broilers',
                html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', otp)
            });
            
            console.log(`Email sent successfully with configuration ${i + 1}:`, result.messageId);
            return { success: true, messageId: result.messageId };
            
        } catch (error) {
            console.error(`Email configuration ${i + 1} failed:`, error.message);
            if (i === configurations.length - 1) {
                throw new Error(`All email configurations failed. Last error: ${error.message}`);
            }
        }
    }
};

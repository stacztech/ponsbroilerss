import nodemailer from 'nodemailer';
import { VERIFICATION_EMAIL_TEMPLATE } from './emailTemplates.js';

// Use Ethereal Email for testing (works without authentication issues)
export const sendOTPWithEthereal = async (email, otp) => {
    try {
        console.log('Creating test account with Ethereal...');
        
        // Generate test SMTP service account from ethereal.email
        let testAccount = await nodemailer.createTestAccount();
        console.log('Test account created:', testAccount.user);

        // Create transporter with Ethereal credentials
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        console.log('Sending email to:', email);
        let info = await transporter.sendMail({
            from: '"PONS Broilers" <noreply@ponsbroilers.com>',
            to: email,
            subject: 'Your OTP Code - PONS Broilers',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', otp)
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        return {
            success: true,
            messageId: info.messageId,
            previewUrl: nodemailer.getTestMessageUrl(info)
        };

    } catch (error) {
        console.error('Ethereal email error:', error);
        throw error;
    }
};

// Alternative: Use a simpler SMTP service (SendGrid alternative)
export const sendOTPWithSMTP2GO = async (email, otp) => {
    try {
        console.log('Trying SMTP2GO service...');
        
        const transporter = nodemailer.createTransport({
            host: 'mail.smtp2go.com',
            port: 2525,
            secure: false,
            auth: {
                user: 'ponsbroilers', // You'll need to register at smtp2go.com
                pass: 'your-smtp2go-password'
            }
        });

        const info = await transporter.sendMail({
            from: '"PONS Broilers" <noreply@ponsbroilers.com>',
            to: email,
            subject: 'Your OTP Code - PONS Broilers',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', otp)
        });

        return {
            success: true,
            messageId: info.messageId
        };

    } catch (error) {
        console.error('SMTP2GO error:', error);
        throw error;
    }
};

// Use Gmail with App Password (more secure)
export const sendOTPWithGmailAppPassword = async (email, otp) => {
    try {
        console.log('Trying Gmail with App Password...');
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER || 'ponsmuttonstallandbroilerss@gmail.com',
                pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password-here'
            }
        });

        const info = await transporter.sendMail({
            from: '"PONS Broilers" <ponsmuttonstallandbroilerss@gmail.com>',
            to: email,
            subject: 'Your OTP Code - PONS Broilers',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', otp)
        });

        return {
            success: true,
            messageId: info.messageId
        };

    } catch (error) {
        console.error('Gmail App Password error:', error);
        throw error;
    }
};

// Main function that tries multiple services
export const sendOTPReliable = async (email, otp) => {
    const services = [
        { name: 'Ethereal', func: sendOTPWithEthereal },
        { name: 'Gmail App Password', func: sendOTPWithGmailAppPassword },
        { name: 'SMTP2GO', func: sendOTPWithSMTP2GO }
    ];

    for (const service of services) {
        try {
            console.log(`Trying ${service.name} service...`);
            const result = await service.func(email, otp);
            console.log(`${service.name} service succeeded!`);
            return result;
        } catch (error) {
            console.error(`${service.name} service failed:`, error.message);
        }
    }

    throw new Error('All email services failed');
};

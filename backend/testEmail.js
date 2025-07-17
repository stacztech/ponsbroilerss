import { sendEmailOTP } from './mailtrap/simpleEmailService.js';

// Test the email service
async function testEmail() {
    try {
        console.log('Testing email service...');
        const result = await sendEmailOTP('test@example.com', '123456');
        console.log('Email test result:', result);
    } catch (error) {
        console.error('Email test failed:', error.message);
    }
}

testEmail();

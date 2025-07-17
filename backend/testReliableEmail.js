import { sendOTPReliable } from './mailtrap/reliableEmailService.js';

// Test the new reliable email service
async function testReliableEmail() {
    try {
        console.log('Testing reliable email service...');
        const result = await sendOTPReliable('itzmenaresh007@gmail.com', '123456');
        console.log('Email test SUCCESS:', result);
        if (result.previewUrl) {
            console.log('You can preview the email at:', result.previewUrl);
        }
    } catch (error) {
        console.error('Email test FAILED:', error.message);
    }
}

testReliableEmail();

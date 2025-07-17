import { sendEmailOTP } from './mailtrap/simpleEmailService.js';

// Test with timeout
async function testEmailWithTimeout() {
    console.log('Testing email service with timeout...');
    
    const emailPromise = sendEmailOTP('itzmenaresh007@gmail.com', '123456');
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout after 10 seconds')), 10000)
    );
    
    try {
        const result = await Promise.race([emailPromise, timeoutPromise]);
        console.log('Email test SUCCESS:', result);
    } catch (error) {
        console.error('Email test FAILED:', error.message);
    }
}

testEmailWithTimeout();

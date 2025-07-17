import { sendOTPReliable } from './mailtrap/reliableEmailService.js';
import { sendOTPMock } from './mailtrap/mockEmailService.js';

const testEmail = 'itzmenaresh007@gmail.com';
const testOTP = '123456';
const testName = 'Test User';

async function testEmailServices() {
    console.log('Testing email services...');
    console.log('Email:', testEmail);
    console.log('OTP:', testOTP);
    console.log('Name:', testName);
    console.log('---');
    
    // Test reliable service
    console.log('1. Testing reliable email service...');
    try {
        const result = await sendOTPReliable(testEmail, testOTP, testName);
        console.log('Reliable service result:', result);
        if (result.success) {
            console.log('✓ Reliable service worked!');
            return; // Exit if successful
        }
    } catch (error) {
        console.error('Reliable service error:', error);
    }
    
    // Test mock service
    console.log('2. Testing mock email service...');
    try {
        const result = await sendOTPMock(testEmail, testOTP, testName);
        console.log('Mock service result:', result);
        if (result.success) {
            console.log('✓ Mock service worked!');
        }
    } catch (error) {
        console.error('Mock service error:', error);
    }
}

testEmailServices();

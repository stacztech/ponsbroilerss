// Mock email service for testing
export const sendOTPMock = async (email, otp) => {
    console.log(`[MOCK EMAIL] Sending OTP to ${email}: ${otp}`);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`[MOCK EMAIL] OTP sent successfully to ${email}`);
    
    return {
        success: true,
        messageId: `mock-${Date.now()}`,
        message: `OTP ${otp} sent to ${email} (mock)`
    };
};

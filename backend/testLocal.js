import express from 'express';
import cors from 'cors';
import { sendOTPReliable } from './mailtrap/reliableEmailService.js';

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.post('/test-otp', async (req, res) => {
    try {
        console.log('Testing OTP sending with data:', req.body);
        const { email, name, phone, password } = req.body;
        
        if (!email || !name || !phone || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields' 
            });
        }
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Generated OTP:', otp);
        
        const result = await sendOTPReliable(email, otp, name);
        
        if (result.success) {
            res.json({ 
                success: true, 
                message: 'OTP sent successfully!',
                otp: otp // Only for testing
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Failed to send OTP',
                error: result.error 
            });
        }
    } catch (error) {
        console.error('Error in test endpoint:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: error.message 
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
    console.log('Test endpoint: POST http://localhost:3000/test-otp');
});

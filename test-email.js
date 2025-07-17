const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Test email configuration
const testEmailConfig = () => {
  const emailUser = process.env.EMAIL_USER || "ponsmuttonstallandbroilerss@gmail.com";
  const emailPass = process.env.EMAIL_PASS || "xbew urkj vwjj wyne";
  
  console.log('Testing email configuration...');
  console.log('Email User:', emailUser);
  console.log('Email Pass:', emailPass ? '***SET***' : '***NOT SET***');
  
  return {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPass
    },
    tls: {
      rejectUnauthorized: false
    }
  };
};

// Test SMTP connection
const testSMTPConnection = async () => {
  try {
    console.log('\n=== Testing SMTP Connection ===');
    const config = testEmailConfig();
    
    const transporter = nodemailer.createTransporter(config);
    
    // Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    
    return transporter;
  } catch (error) {
    console.error('❌ SMTP connection failed:', error.message);
    return null;
  }
};

// Test sending email
const testSendEmail = async (transporter) => {
  if (!transporter) {
    console.log('Cannot test email sending - no transporter available');
    return;
  }
  
  try {
    console.log('\n=== Testing Email Sending ===');
    
    const testEmail = {
      from: process.env.EMAIL_USER || "ponsmuttonstallandbroilerss@gmail.com",
      to: "test@example.com", // Replace with your test email
      subject: "Test Email - PONS Broilers",
      html: `
        <h1>Test Email</h1>
        <p>This is a test email to verify the email functionality is working.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `
    };
    
    console.log('Sending test email...');
    const result = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    
    return result;
  } catch (error) {
    console.error('❌ Test email sending failed:', error.message);
    if (error.response) {
      console.error('SMTP Response:', error.response);
    }
    return null;
  }
};

// Test the email service functions
const testEmailServices = async () => {
  console.log('\n=== Testing Email Services ===');
  
  try {
    // Import the email services
    const { sendVerificationEmail } = require('./backend/mailtrap/emails.js');
    
    console.log('Testing sendVerificationEmail function...');
    const testToken = "123456";
    const testEmail = "test@example.com"; // Replace with your test email
    
    const result = await sendVerificationEmail(testEmail, testToken);
    console.log('✅ sendVerificationEmail test successful!');
    console.log('Result:', result);
    
  } catch (error) {
    console.error('❌ Email service test failed:', error.message);
  }
};

// Main test function
const runEmailTests = async () => {
  console.log('🚀 Starting Email Functionality Tests...\n');
  
  // Test 1: SMTP Connection
  const transporter = await testSMTPConnection();
  
  // Test 2: Send Test Email
  await testSendEmail(transporter);
  
  // Test 3: Email Services
  await testEmailServices();
  
  console.log('\n🏁 Email tests completed!');
};

// Run the tests
runEmailTests().catch(console.error); 
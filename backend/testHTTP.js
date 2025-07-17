const https = require('https');

const data = JSON.stringify({
    email: 'itzmenaresh007@gmail.com',
    name: 'Test User',
    phone: '1234567890',
    password: 'testpass123'
});

const options = {
    hostname: 'ponsbroilerss-backend.vercel.app',
    port: 443,
    path: '/api/auth/send-otp',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(`headers:`, res.headers);

    res.on('data', (d) => {
        console.log('Response:', d.toString());
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();

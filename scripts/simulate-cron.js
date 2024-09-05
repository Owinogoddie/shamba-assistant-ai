const cron = require('node-cron');
const http = require('http');

// Schedule a task to run every second
cron.schedule('*/1 * * * * *', () => {
    console.log('Running ping task...');

  http.get('http://localhost:3000/api/ping-supabase', (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Response:', data);
    });
  }).on('error', (err) => {
    console.error('Error:', err.message);
  });
});

console.log('Cron job simulator started. Press Ctrl+C to exit.');

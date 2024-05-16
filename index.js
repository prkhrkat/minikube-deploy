// index.js
const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer(async (req, res) => {
  try {
    const response = await fetch(process.env.END_URL);
    // log endurl to console
    console.log('END_URL:', process.env.END_URL);
    if (response.ok) {
      const data = await response.text();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(data);
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Error: ${error.message}`);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

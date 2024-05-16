// index.js
const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer(async (req, res) => {
  try {

    const backendHost = process.env.PK_TEST_BACKEND_TEST_SERVICE_SERVICE_HOST;
    const backendPort = process.env.PK_TEST_BACKEND_TEST_SERVICE_SERVICE_PORT;
    const backendURL = `http://${backendHost}:${backendPort}`;
    const response = await fetch(backendURL);
    
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
  // log endurl to console
  console.log('END_URL:', process.env.END_URL);
});

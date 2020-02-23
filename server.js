const http = require('http');
const app= require('./app');
const host = '0.0.0.0';
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port, host, function() {
  console.log("Server started.......");
});
console.log("listening to port: "+port)
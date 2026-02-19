// lambda.js - Lambda handler wrapper
const serverless = require('serverless-http');
const server = require('./dist/server');

// Handle both CommonJS default export and ES module default export
const app = server.default || server;

module.exports.handler = serverless(app);
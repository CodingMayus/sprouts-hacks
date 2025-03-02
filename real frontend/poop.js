const jwt = require('jsonwebtoken');

const token = 'your-jwt-token-here';
const decoded = jwt.decode(token);  // Decodes without verifying the signature
console.log(decoded);

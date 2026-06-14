const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EduPrime API',
      version: '1.0.0',
      description: 'API REST profissional para plataforma educacional EduPrime.',
    },
    servers: [{ url: 'http://localhost:4000' }],
  },
  apis: ['./backend/src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
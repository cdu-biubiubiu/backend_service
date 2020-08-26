import { ServerRoute } from '@hapi/hapi';

const endpoints: ServerRoute[] = [
  {
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    path: '/',
    handler: (req, h) => {
      return {
        method: req.method,
        msg: 'Hello hapi.js',
      };
    },
  },
];

export default endpoints;

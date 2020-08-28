import Joi from 'joi';
import { ServerRoute } from '@hapi/hapi';
import { API, HELLO } from '../constants';

const helloRoutes: ServerRoute[] = [
  {
    method: ['GET'],
    path: '/hello/{name}',
    options: {
      handler: (req) => `Hello, ${req.params.name}`,
      description: 'Say hello',
      tags: [API, HELLO],
      validate: {
        params: Joi.object({
          name: Joi.string().required().description('Your name'),
        }),
      },
    },
  },
];

export default helloRoutes;

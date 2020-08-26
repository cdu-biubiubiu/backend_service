import Joi from 'joi';
import { ServerRoute } from '@hapi/hapi';

const helloRoutes: ServerRoute[] = [
  {
    method: ['GET'],
    path: '/hello/{name}/',
    options: {
      handler: (req) => `Hello, ${req.params.name}`,
      description: 'Say hello',
      notes: "Return 'Hello name' by the name passed in the path",
      tags: ['api'],
      validate: {
        params: Joi.object({
          name: Joi.string().required().description('Your name'),
        }),
      },
    },
  },
];

export default helloRoutes;

import { ServerRoute } from '@hapi/hapi';
import Joi from 'joi';
import { LinkModel } from './Models/link.model';

const endpoints: ServerRoute[] = [
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
  {
    method: 'GET',
    path: '/link',
    options: {
      handler: async () => {
        const links = await LinkModel.find({}).exec();
        return {
          title: 'links',
          links,
        };
      },
      description: '获得所有友情链接',
      tags: ['api'],
    },
  },
];

export default endpoints;

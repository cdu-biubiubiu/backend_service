import { ServerRoute } from '@hapi/hapi';
import Joi from 'joi';
import { LinkModel, Link } from './Models/link.model';

const helloRoute: ServerRoute[] = [
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
const linkRoute: ServerRoute[] = [
  {
    method: 'GET',
    path: '/link',
    options: {
      handler: async () => {
        try {
          const links = await LinkModel.find({}).exec();
          return links;
        } catch (e) {
          return console.error(e);
        }
      },
      description: '获得所有友情链接',
      tags: ['api'],
    },
  },
  {
    method: 'POST',
    path: '/link',
    handler: async (req, h) => {
      console.log(`req.payload: ${req.payload}`);
      try {
        const result = await LinkModel.insertMany(req.payload as Link);
        return result;
      } catch (e) {
        return console.error(e);
      }
    },
    options: {
      description: '新增友情链接(一个或者多个)',
      tags: ['api', 'link'],
      validate: {
        payload: Joi.array().items(
          Joi.object({
            name: Joi.string().required().description('链接名'),
            src: Joi.string().required().description('链接'),
          })
        ),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/link/{id}',
    handler: async (req, h) => {
      console.log(`req.params.id: ${req.params.id}`);
      try {
        const result = await LinkModel.deleteOne(req.params.id).exec();
        return result;
      } catch (e) {
        return console.error(e);
      }
    },
    options: {
      description: '通过id删除一个链接',
      tags: ['api', 'link'],
      validate: {
        params: Joi.object({
          id: Joi.required().description('友情链接id'),
        }),
      },
    },
  },
];
const postRoute: ServerRoute[] = [];

const userRoute: ServerRoute[] = [];
const endpoints: ServerRoute[] = [...helloRoute, ...linkRoute, ...postRoute, ...userRoute];

export default endpoints;

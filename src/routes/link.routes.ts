import { mongoose } from '@typegoose/typegoose';
import Joi from 'joi';
import { ServerRoute } from '@hapi/hapi';
import { LinkModel, Link, JoiLinkArray, JoiLinkId } from '../models/link.model';

const linkRoutes: ServerRoute[] = [
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
        const result = await LinkModel.insertMany(req.payload as Link[]);
        return result;
      } catch (e) {
        return console.error(e);
      }
    },
    options: {
      description: '新增友情链接(一个或者多个)',
      tags: ['api', 'link'],
      validate: {
        payload: JoiLinkArray,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/link/{id}',
    handler: async (req, h) => {
      console.log(`req.params.id: ${req.params.id}`);
      try {
        const _id = mongoose.Types.ObjectId(req.params.id);
        const result = await LinkModel.deleteOne({ _id }).exec();
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
          id: JoiLinkId,
        }),
      },
    },
  },
];

export default linkRoutes;

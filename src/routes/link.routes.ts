import { mongoose } from '@typegoose/typegoose';
import Joi from 'joi';
import { ServerRoute } from '@hapi/hapi';
import { LinkModel, Link } from '../models/link.model';
import { API, LINK } from '../constants';
import LinkJoi from '../jois/link.joi';

const linkRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/link',
    options: {
      handler: async () => {
        const links = await LinkModel.find({}).exec();
        return links;
      },
      description: '获得所有友情链接',
      tags: [API, LINK],
    },
  },
  {
    method: 'POST',
    path: '/link',
    handler: async (req) => {
      console.log(`req.payload: ${req.payload}`);

      const result = await LinkModel.insertMany(req.payload as Link[]);
      return result;
    },
    options: {
      description: '新增一个友情链接',
      tags: [API, LINK],
      validate: {
        payload: LinkJoi.model,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/link/{id}',
    handler: async (req) => {
      console.log(`req.params.id: ${req.params.id}`);

      // eslint-disable-next-line no-underscore-dangle
      const _id = mongoose.Types.ObjectId(req.params.id);
      const result = await LinkModel.deleteOne({ _id }).exec();
      return result;
    },
    options: {
      description: '通过id删除一个链接',
      tags: [API, LINK],
      validate: {
        params: Joi.object({
          id: LinkJoi.id,
        }),
      },
    },
  },
];

export default linkRoutes;

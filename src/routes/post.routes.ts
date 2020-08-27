import { mongoose } from '@typegoose/typegoose';
import Joi from 'joi';
import { ServerRoute } from '@hapi/hapi';
import { PostModel, Post, JoiPostId, JoiPostCreate, JoiPostModify } from '../models/post.model';

const postRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/post',
    handler: async () => {
      const posts = await PostModel.find({}).exec();
      return posts;
    },
    options: {
      description: '获得所有文章',
      tags: ['api', 'post'],
    },
  },
  {
    method: 'GET',
    path: '/post/{id}',
    handler: async (req) => {
      // eslint-disable-next-line no-underscore-dangle
      const _id = mongoose.Types.ObjectId(req.params.id);
      const post = await PostModel.findById({ _id }).exec();
      return post;
    },
    options: {
      description: '通过id获得一篇文章',
      tags: ['api', 'post'],
      validate: {
        params: Joi.object({
          id: JoiPostId,
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/post',
    handler: async (req) => {
      const result = await PostModel.insertMany(req.payload as Post[]);
      return result;
    },
    options: {
      description: '发布一篇文章',
      tags: ['api', 'post'],
      validate: {
        payload: JoiPostCreate,
      },
    },
  },
  {
    method: 'PUT',
    path: '/post/{id}',
    handler: async (req) => {
      // eslint-disable-next-line no-underscore-dangle
      const _id = mongoose.Types.ObjectId(req.params.id);
      const post = req.payload as Post;
      const result = await PostModel.findByIdAndUpdate({ _id }, { $set: post });
      return result;
    },
    options: {
      description: '通过id修改一篇文章',
      tags: ['api', 'post'],
      validate: {
        params: Joi.object({
          id: JoiPostId,
        }),
        payload: JoiPostModify,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/post/{id}',
    handler: async (req) => {
      // eslint-disable-next-line no-underscore-dangle
      const _id = mongoose.Types.ObjectId(req.params.id);
      const result = await PostModel.deleteOne({ _id }).exec();
      return result;
    },
    options: {
      description: '通过id删除一篇文章',
      tags: ['api', 'post'],
      validate: {
        params: Joi.object({
          id: JoiPostId,
        }),
      },
    },
  },
];

export default postRoutes;

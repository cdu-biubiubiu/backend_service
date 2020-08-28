import { mongoose } from '@typegoose/typegoose';
import Joi from 'joi';
import { ServerRoute } from '@hapi/hapi';

import UserJoi from '../jois/user.joi';
import { UserModel, User } from '../models/user.model';
import { API, USER } from '../constants';

const userRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/user',
    handler: async () => {
      const users = await UserModel.find({}).exec();
      return users;
    },
    options: {
      description: '获得所有用户',
      tags: [API, USER],
    },
  },
  {
    method: 'POST',
    path: '/user',
    handler: async (req) => {
      const result = await UserModel.insertMany(req.payload as User[]);
      return result;
    },
    options: {
      description: '新增一个用户',
      tags: [API, USER],
      validate: {
        payload: UserJoi.id,
      },
    },
  },
  {
    method: 'PUT',
    path: '/user/{id}',
    handler: async (req) => {
      // eslint-disable-next-line no-underscore-dangle
      const _id = mongoose.Types.ObjectId(req.params.id);
      const user = req.payload as User;
      const result = await UserModel.findByIdAndUpdate({ _id }, { $set: user });
      return result;
    },
    options: {
      description: '通过_id修改用户信息',
      tags: [API, USER],
      validate: {
        params: Joi.object({
          id: UserJoi.id,
        }),
        payload: UserJoi.model,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    handler: async (req) => {
      // eslint-disable-next-line no-underscore-dangle
      const _id = mongoose.Types.ObjectId(req.params.id);
      const result = await UserModel.deleteOne({ _id }).exec();
      return result;
    },
    options: {
      description: '通过id删除一个用户',
      tags: [API, USER],
      validate: {
        params: Joi.object({
          id: UserJoi.id,
        }),
      },
    },
  },
];

export default userRoutes;

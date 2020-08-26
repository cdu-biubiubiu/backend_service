import { mongoose } from '@typegoose/typegoose';
import Joi from 'joi';
import { ServerRoute } from '@hapi/hapi';

import { UserModel, User, JoiUserArray, JoiUserId, JoiUser } from '../models/user.model';

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
      tags: ['api', 'user'],
    },
  },
  {
    method: 'POST',
    path: '/user',
    handler: async (req, h) => {
      const result = await UserModel.insertMany(req.payload as User[]);
      return result;
    },
    options: {
      description: '新增多个用户',
      tags: ['api', 'user'],
      validate: {
        payload: JoiUserArray,
      },
    },
  },
  {
    method: 'PUT',
    path: '/user/{id}',
    handler: async (req, h) => {
      const _id = mongoose.Types.ObjectId(req.params.id);
      const user = req.payload as User;
      const result = await UserModel.findByIdAndUpdate({ _id }, { $set: user });
      return result;
    },
    options: {
      description: '通过_id修改用户信息',
      tags: ['api', 'user'],
      validate: {
        params: Joi.object({
          id: JoiUserId,
        }),
        payload: JoiUser,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    handler: async (req, h) => {
      const _id = mongoose.Types.ObjectId(req.params.id);
      const result = await UserModel.deleteOne({ _id }).exec();
      return result;
    },
    options: {
      description: '通过id删除一个用户',
      tags: ['api', 'user'],
      validate: {
        params: Joi.object({
          id: JoiUserId,
        }),
      },
    },
  },
];

export default userRoutes;

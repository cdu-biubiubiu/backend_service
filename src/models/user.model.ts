import { prop, getModelForClass } from '@typegoose/typegoose';
import Joi from 'joi';

type Competence = 'superAdministrator' | 'administrator' | 'articlePublisher';
export class User {
  @prop({ type: String })
  public username: string;

  @prop({ type: String })
  public password: string;

  @prop({ type: String })
  public competence: Competence;

  constructor(username: string, password: string, competence: Competence) {
    this.username = username;
    this.password = password;
    this.competence = competence;
  }
}

export const UserModel = getModelForClass(User);

export const JoiUserId = Joi.required().description('用户_id');
export const JoiUser = Joi.object({
  username: Joi.string().description('用户名'),
  password: Joi.string().description('密码'),
  // TODO: 设置选项
  competence: Joi.string().description('权限设置'),
});
export const JoiUserArray = Joi.array().items(JoiUser);

// export { UserModel };

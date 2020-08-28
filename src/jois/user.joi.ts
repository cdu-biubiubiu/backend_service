import Joi from 'joi';

namespace UserJoi {
  export const id = Joi.required().description('用户_id');
  const username = Joi.string().alphanum().min(6).max(16).description('用户名');
  const password = Joi.string().alphanum().min(6).max(16).description('密码');
  // TODO: 设置选项
  const competence = Joi.string().description('权限设置');
  export const model = Joi.object({ username, password, competence });
  export const modelArray = Joi.array().items(model);
}
export = UserJoi;

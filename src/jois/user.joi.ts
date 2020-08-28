import Joi from 'joi';

namespace UserJoi {
  export const id = Joi.required().description('用户_id');
  const username = Joi.string().alphanum().min(6).max(16).description('用户名');
  const password = Joi.string().alphanum().min(6).max(16).description('密码');
  const Competence = ['superAdministrator', 'administrator', 'articlePublisher'];
  const competence = Joi.string()
    .allow(...Competence)
    .description('权限设置');
  export const model = Joi.object({ username, password, competence }).label('用户');
  export const modelArray = Joi.array().items(model);
}
export = UserJoi;

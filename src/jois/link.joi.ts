import Joi from 'joi';

namespace LinkJoi {
  export const id = Joi.required().description('友情链接_id');
  const name = Joi.string().required().description('链接名字');
  // TODO: 验证链接
  const src = Joi.string().required().description('链接地址');
  export const model = Joi.object({ name, src }).label('友情链接link');
  export const modelArray = Joi.array().items(model);
}
export = LinkJoi;

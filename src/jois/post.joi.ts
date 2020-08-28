import Joi from 'joi';

namespace PostJoi {
  export const id = Joi.required().description('文章_id');
  const title = Joi.string().required().description('文章名');
  const content = Joi.string().required().description('文章内容');
  export const createModel = Joi.object({
    title,
    content,
    creationDate: Joi.date().forbidden().default(Date.now),
  }).label('文章');
  export const modifyModel = Joi.object({
    title,
    content,
    modifiedDate: Joi.date().forbidden().default(Date.now),
  });
}
export = PostJoi;

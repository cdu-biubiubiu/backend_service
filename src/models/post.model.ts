import { prop, getModelForClass } from '@typegoose/typegoose';
import Joi from 'joi';

export class Post {
  @prop({ type: String })
  public title: string;

  @prop({ type: String })
  public content: string;

  @prop({ type: Date })
  public creationDate: Date;

  @prop({ type: Date })
  public modifiedDate: Date;

  constructor(title: string, content: string, creationDate: Date, modifiedDate: Date) {
    this.title = title;
    this.content = content;
    this.creationDate = creationDate;
    this.modifiedDate = modifiedDate;
  }
}

export const PostModel = getModelForClass(Post);
export const JoiPostId = Joi.required().description('文章_id');
export const JoiPostCreate = Joi.object({
  title: Joi.string().required().description('文章名'),
  content: Joi.string().required().description('文章内容'),
  creationDate: Joi.date().default(new Date()).description('创建时间（默认当前时间）'),
  // modifiedDate: Joi.date().default(new Date()).description('修改时间（默认为当前时间）'),
});
export const JoiPostModify = Joi.object({
  title: Joi.string().required().description('文章名'),
  content: Joi.string().required().description('文章内容'),
  // creationDate: Joi.date().default(new Date()).description('创建时间（默认当前时间）'),
  modifiedDate: Joi.date().default(new Date()).description('修改时间（默认为当前时间）'),
});

// export { PostModel, Post };

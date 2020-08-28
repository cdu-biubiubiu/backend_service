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
});
export const JoiPostModify = Joi.object({
  title: Joi.string().description('文章名'),
  content: Joi.string().description('文章内容'),
});

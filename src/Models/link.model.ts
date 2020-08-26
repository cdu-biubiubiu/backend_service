import { prop, getModelForClass } from '@typegoose/typegoose';
import Joi from 'joi';

export class Link {
  @prop({ type: String })
  public name: string;

  @prop({ type: String })
  public src: string;

  constructor(name: string, src: string) {
    this.name = name;
    this.src = src;
  }
}

export const LinkModel = getModelForClass(Link);

export const JoiLinkId = Joi.required().description('友情链接_id');
export const JoiLink = Joi.object({
  name: Joi.string().required().description('链接名字'),
  src: Joi.string().required().description('链接地址'),
});
export const JoiLinkArray = Joi.array().items(JoiLink);

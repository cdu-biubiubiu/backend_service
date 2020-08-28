import { prop, getModelForClass } from '@typegoose/typegoose';

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

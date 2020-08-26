import { prop, getModelForClass } from '@typegoose/typegoose';

class Link {
  @prop({ type: String })
  public name: string;

  @prop({ type: String })
  public src: string;

  constructor(name: string, src: string) {
    this.name = name;
    this.src = src;
  }
}

const LinkModel = getModelForClass(Link);

export { LinkModel };

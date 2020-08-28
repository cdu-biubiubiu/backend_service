import { prop, getModelForClass } from '@typegoose/typegoose';

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

import { prop, getModelForClass, mongoose } from '@typegoose/typegoose';

class Link {
  @prop({ type: String })
  public name: string;

  @prop({ type: String })
  public src: string;

  constructor(@prop({ type: String }) public ee: string, src: string) {
    this.name = ee;
    this.src = src;
  }
}

const LinkModel = getModelForClass(Link);
(async () => {
  await mongoose.connect('mongodb://root:password@localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const google = await LinkModel.create(new Link('google', 'www.google.com'));
  google.save((err) => {
    if (err) {
      console.error(err);
    }
    console.log(google);
  });
})();

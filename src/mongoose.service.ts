// import { Mongoose, mongo, Document } from 'mongoose';
import { mongoose } from '@typegoose/typegoose';
// import { LinkModel } from './Models/link.model';
// import { Mongoose } from 'mongoose';

const uri = 'mongodb://root:password@localhost:27017';
const profile: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const init = async () => {
  await mongoose.connect(uri, profile);
};
export { init };

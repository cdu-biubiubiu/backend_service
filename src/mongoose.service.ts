import { mongoose } from '@typegoose/typegoose';
import { mongo } from 'mongoose';

// const uri = 'mongodb://root:password@localhost/';
const uri = 'mongodb://root:password@mongodb:27017/';
const profile: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const init = async () => {
  try {
    const db = mongoose.connection;
    db.on('open', () => {
      console.log('连接Mongodb成功');
    });
    db.once('error', () => {
      console.error('连接Mongodb失败');
    });
    await mongoose.connect(uri, profile);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
export { init };

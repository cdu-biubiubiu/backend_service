import { mongoose } from '@typegoose/typegoose';
import { Plugin } from '@hapi/hapi';

interface userProfileInterface {
  host: string;
  user: string;
  password: string;
  port: string | number;
}
function getUri(p: userProfileInterface) {
  let result = 'mongodb://';
  if (p.password || p.user) {
    result += `${p.user}:${p.password}@`;
  }
  result += p.host;
  if (p.port) {
    result += `:${p.port}`;
  }
  return result;
}
const userProfile: userProfileInterface = {
  host: process.env.MONGO_HOST || 'localhost',
  user: process.env.MONGO_USER || 'root',
  password: process.env.MONGO_PASSWORD || 'password',
  port: process.env.MONGO_PORT || 27017,
};

const uri = getUri(userProfile);
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
// eslint-disable-next-line import/prefer-default-export
// export { init };

const MongoosePlugin: Plugin<any> = {
  name: 'mongoose',
  version: '0.0.1',
  register: init,
};

// export { plugin };

export default MongoosePlugin;

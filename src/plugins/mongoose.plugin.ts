import { mongoose } from '@typegoose/typegoose';
import { Plugin } from '@hapi/hapi';
// import DotenvPlugin from './config.plugin';

interface userProfileInterface {
  host: string;
  username: string;
  password: string;
  port: string | number;
}
const getUri = (p: userProfileInterface) => {
  let result = 'mongodb://';
  if (p.password !== '' || p.username !== '') {
    result += `${p.username}:${p.password}@`;
  }
  result += p.host;
  if (p.port) {
    result += `:${p.port}`;
  }
  return result;
};

const MongoosePlugin: Plugin<any> = {
  name: 'mongoose',
  version: '0.0.1',
  register: async () => {
    const userProfile: userProfileInterface = {
      host: process.env.MONGO_HOST || 'localhost',
      username: process.env.MONGO_USER || '',
      password: process.env.MONGO_PASSWORD || '',
      port: process.env.MONGO_PORT || 27017,
    };
    const uri = getUri(userProfile);
    const connectionOptions: mongoose.ConnectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const db = mongoose.connection;
    db.on('open', () => {
      console.log('连接mongodb成功');
    });
    db.once('error', (err) => {
      console.error('连接mongodb失败', err);
      process.exit(1);
    });
    await mongoose.connect(uri, connectionOptions);
  },
};

export default MongoosePlugin;

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
// TODO: 修改user和password为无密码模式
const userProfile: userProfileInterface = {
  host: process.env.MONGO_HOST || 'localhost',
  user: process.env.MONGO_USER || 'root',
  password: process.env.MONGO_PASSWORD || 'password',
  port: process.env.MONGO_PORT || 27017,
};

const uri = getUri(userProfile);
const connectionOptions: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const init = async () => {
  const db = mongoose.connection;
  db.on('open', () => {
    console.log('连接Mongodb成功');
  });
  db.once('error', (err) => {
    console.error('连接Mongodb失败', err);
    process.exit(2);
  });
  await mongoose.connect(uri, connectionOptions);
};

const MongoosePlugin: Plugin<any> = {
  name: 'mongoose',
  version: '0.0.1',
  register: init,
};

export default MongoosePlugin;

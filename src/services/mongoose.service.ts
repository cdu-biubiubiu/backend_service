import { mongoose } from '@typegoose/typegoose';

const userProfile = {
  host: process.env.MONGO_HOST || 'localhost',
  user: process.env.MONGO_USER || 'root',
  password: process.env.MONGO_PASSWORD || 'password',
  port: process.env.MONGO_PORT || 27017,
};
function getUri(p: any) {
  const uri = `mongodb://${p.user}:${p.password}@${p.host}:${p.port}`;
  return uri;
}
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
export { init };

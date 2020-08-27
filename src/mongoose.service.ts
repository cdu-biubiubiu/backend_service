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
  await mongoose.connect(uri, profile);
};
// eslint-disable-next-line import/prefer-default-export
export { init };

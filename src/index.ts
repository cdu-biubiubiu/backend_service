import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import MongoosePlugin from './plugins/mongoose.plugin';
import DotenvPlugin from './plugins/config.plugin';

import endpoints from './routes/index';

const init = async () => {
  /**
   * host 设置为0.0.0.0 意味着接受任何访问请求，120.0.0.1为只接受本机访问请求
   */
  const server = Hapi.server({
    host: '0.0.0.0',
    port: 3000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // TODO: 在转发路径无法使用
  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: '0.0.1',
    },
  };
  const plugins: Hapi.ServerRegisterPluginObject<any>[] = [
    {
      plugin: Inert,
    },
    {
      plugin: Vision,
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
    {
      plugin: DotenvPlugin,
    },
    {
      plugin: MongoosePlugin,
    },
  ];

  await server.register(plugins);

  server.route(endpoints);
  await server.start();
  console.log('🤩 Server is running on %s.', server.info.uri);
};

init().catch((err) => {
  console.error(err);
  process.exit(1);
});

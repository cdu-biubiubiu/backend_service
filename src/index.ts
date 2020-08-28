import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import * as mongooseService from './services/mongoose.service';
import * as config from './services/config';

import endpoints from './routes/index';

const init = async () => {
  const host = '0.0.0.0';
  const port = 3000;
  const server = Hapi.server({
    host,
    port,
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
  ];

  // TODO: 任务模块化
  const mission: Promise<any>[] = [];
  mission.push(server.register(plugins));
  mission.push(config.init());
  mission.push(mongooseService.init());
  await Promise.all(mission);

  server.route(endpoints);
  await server.start();
  console.log('🤩 Server is running on %s.', server.info.uri);
};

init().catch((err) => {
  console.error(err);
  process.exit(1);
});

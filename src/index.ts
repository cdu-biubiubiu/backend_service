import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import * as mongooseService from './mongoose.service';
import * as config from './config';

import endpoints from './routes/index';

const init = async () => {
  const host = 'localhost';
  const port = 3000;
  const server = Hapi.server({ host, port, routes: { cors: true } });

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

  const mission: Promise<any>[] = [];
  mission.push(server.register(plugins));
  mission.push(config.init());
  mission.push(mongooseService.init());
  await Promise.all(mission);

  // await server.register(plugins);

  server.route(endpoints);
  // // TODO Promise并行化
  // await config.init();
  // await mongooseService.init();
  await server.start();
  console.log('🤩 Server is running on %s.', server.info.uri);
};

init().catch((err) => {
  console.error(err);
  process.exit(1);
});

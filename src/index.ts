import Hapi from '@hapi/hapi';

const init = async () => {
  const profile = {
    host: 'localhost',
    port: 3000,
  };
  const server = Hapi.server(profile);

  server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => ({
      msg: 'Hello hapi.js!',
    }),
  });
  await server.start();
  console.log('Server is running on %s', server.info.uri);
};

init().catch((err) => {
  console.error(err);
  process.exit(1);
});

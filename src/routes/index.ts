// import endpoints from '../routes';

import { ServerRoute } from '@hapi/hapi';
import helloRoutes from './hello.routes';
import linkRoutes from './link.routes';
import postRoutes from './post.routes';
import userRoutes from './user.routes';

const endpoints: ServerRoute[] = [];

endpoints.push(...helloRoutes);
endpoints.push(...linkRoutes);
endpoints.push(...postRoutes);
endpoints.push(...userRoutes);

export default endpoints;

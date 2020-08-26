import { ServerRoute, ServerRegisterPluginObjectArray } from '@hapi/hapi';
import Joi from 'joi';
import { LinkModel, Link } from './Models/link.model';
import { mongoose } from '@typegoose/typegoose';
import { PostModel } from './Models/post.model';
import helloRoutes from './routes/hello.routes';
import linkRoutes from './routes/link.routes';
import postRoutes from './routes/post.routes';
import userRoutes from './routes/user.routes';

// TODO: use custom method to add route
const endpoints: ServerRoute[] = [...helloRoutes, ...linkRoutes, ...postRoutes, ...userRoutes];

export default endpoints;

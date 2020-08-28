import dotenv from 'dotenv';
import { Plugin } from '@hapi/hapi';

const DotenvPlugin: Plugin<any> = {
  name: 'dotenv',
  version: '0.0.1',
  register: () => {
    dotenv.config();
  },
};
export default DotenvPlugin;

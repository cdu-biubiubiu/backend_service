import dotenv from 'dotenv';
import { Plugin } from '@hapi/hapi';
// import { RegisterOptions } from 'hapi-swagger';

// const init = async () => {
//   dotenv.config();
// };
// eslint-disable-next-line import/prefer-default-export
// export { init };

const DotenvPlugin: Plugin<any> = {
  name: 'dotenv',
  version: '0.0.1',
  register: async () => {
    dotenv.config();
  },
};
export default DotenvPlugin;

// export { plugin };

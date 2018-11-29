// import ApolloClient from 'apollo-client';
import ApolloClient from 'apollo-boost';
// import config from '../../config';

import { defaults } from './defaults';

// eslint-disable-next-line import/prefer-default-export
export default new ApolloClient({
  uri: 'https://eu1.prisma.sh/faustino/foodapp/dev',
  clientState: {
    defaults,
  },
});

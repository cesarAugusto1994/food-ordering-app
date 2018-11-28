// import ApolloClient from 'apollo-client';
import ApolloClient from 'apollo-boost';
// import config from '../../config';

// import { defaults, typeDefs } from './defaults';

// eslint-disable-next-line import/prefer-default-export
export const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/faustino/foodapp/dev',
  clientState: {
    defaults: {
      auth: {
        isAuthed: false,
        __typename: 'Auth',
      },
      user: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        image: '',
        __typename: 'User',
      },
      whoIs: {
        isUser: false,
        isOwner: false,
        __typename: 'WhoIs',
      },
      shopCard: {
        items: [],
        __typename: 'Card',
      },
      orders: {
        items: [],
        __typename: 'Orders',
      },
      restaurants: {
        items: [],
        __typename: 'Restaurants',
      },
      categories: {
        items: [],
        __typename: 'Categories',
      },
      restaurantId: {
        id: '',
        __typename: 'RestaurantID',
      },
    },
  },
});

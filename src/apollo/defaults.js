export const defaults = {
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
    items: [
      { label: 'Fast Food', value: 'Fast Food', __typename: 'categorieItem_FastFood' },
      { label: 'Burger', value: 'Burger', __typename: 'categorieItem_Burger' },
      { label: 'Sushi', value: 'Sushi', __typename: 'categorieItem_Sushi' },
      { label: 'Pizza', value: 'Pizza', __typename: 'categorieItem_Pizza' },
      { label: 'Sandwich', value: 'Sandwich', __typename: 'categorieItem_Sandwich' },
      { label: 'Indian', value: 'Indian', __typename: 'categorieItem_Indian' },
      { label: 'Others', value: 'Others', __typename: 'categorieItem_Others' },
      { label: 'Others', value: 'Others', __typename: 'categorieItem_Others2' },
    ],
    __typename: 'Categories',
  },
  restaurantId: {
    id: '',
    __typename: 'RestaurantID',
  },
};

export const typeDefs = ``;

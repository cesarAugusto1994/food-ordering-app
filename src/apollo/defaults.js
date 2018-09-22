export default {
  foods: {
    __typename: 'Foods',
    currentPageName: 'Foods',
  },
  restaurants: {
    __typename: 'Restaurants',
    currentPageName: 'Restaurants'
  },
  currentUser: {
    __typename: 'User',
    _id: '',
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    image: ''
  },
  card: {
    __typename: 'Card',
    currentPageName: 'Card',
  },
  auth: {
    __typename: 'Auth',
    isAuthenticating: false,
    user: {},
  }
};

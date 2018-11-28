import gql from 'graphql-tag';


export const defaults = {
  isAuthed: false,
  user: {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    image: '',
    __typename: 'User'
  },
  isUser: false,
  isOwner: false,
  card: [],
  orders: [],
  restaurants: [],
  categories: [],
  categoriesLabels: [],
  restaurantId: ''
};

export const typeDefs = `
  type User {
    userId: String
    ownerId: String
    email: String
    firstName: String
    lastName: String
    image: String
  }

  type Client {
    userId: String! @unique
    email: String!
    firstName: String!
    lastName: String!
    image: String!
  }

  type Food {
    foodId: String! @unique
    name: String!
    description: String!
    price: Int!
    image: String!
    restaurantId: String!
    ownerId: String!
  }

  type Order {
    orderId: String! @unique
    userId: String!
    restaurantId: String!
    ownerId: String!
    itemName: String!
    itemPrice: Int!
    userWillPay: Int!
    additionalInfo: String!
    userPhoneNumber: String!
    restaurantPhoneNumber: String!
    state: String!
    quantity: Int!
  }

  type Owner {
    ownerId: String! @unique
    email: String!
    firstName: String!
    lastName: String!
    image: String!
  }

  type Restaurant {
    restaurantId: String! @unique
    ownerId: String!
    name: String!
    description: String!
    location: String!
    waitTime: Int!
    speciality: String!
    phoneNumber: String!
    image: String!
    scheduleStart: String!
    scheduleEnd: String!
    isWeekendOpen: Boolean! @default(value: "false")
  }

  type Speciality {
    spId: String! @unique
    name: String!
    image: String!
  }

  type Query {
    user: User
  }
`;

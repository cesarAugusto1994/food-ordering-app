import gql from 'graphql-tag';

export const GET_CLIENT = gql`
  query getClient($email: String!) {
    clients(where: {email: $email}) {
      userId
      email
      firstName
      lastName
      image
    }
  }
`;
export const getRestaurants = gql`
  query restaurants {
    restaurants {
      image
      restaurantId
      phoneNumber
      location
      waitTime
      description
      ownerId
      speciality
      name
    }
  }
`;

export const filterRestaurants = gql`
  query myRestaurants($speciality: String!) {
    restaurants(where: {speciality: $speciality}) {
      image
      restaurantId
      phoneNumber
      location
      waitTime
      description
      ownerId
      speciality
      name
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation createClient(
    $email: String!,
    $userId: String!,
    $firstName: String!,
    $lastName: String!,
    $image: String!
    ) {
      createClient(data: {
        email: $email
        userId: $userId
        firstName: $firstName
        lastName: $lastName
        image: $image
      }){
        userId
        email
        firstName
        lastName
        image
      }
  }
`;

export const CREATE_ORDER = gql`
  mutation createOrder(
    $orderId: String!,
    $userId: String!,
    $restaurantId: String!,
    $ownerId: String!,
    $itemName: String!,
    $itemPrice: Int!,
    $userWillPay: Int!,
    $additionalInfo: String!,
    $userPhoneNumber: String!,
    $restaurantPhoneNumber: String!,
    $state: String!,
    $quantity: Int!
  ) {
    createOrder(data: {
      orderId: $orderId
      userId: $userId
      restaurantId: $restaurantId
      ownerId: $ownerId
      itemName: $itemName
      itemPrice: $itemPrice
      userWillPay: $userWillPay
      additionalInfo: $additionalInfo
      userPhoneNumber: $userPhoneNumber
      restaurantPhoneNumber: $restaurantPhoneNumber
      state: $state
      quantity: $quantity
    }) {
      orderId
      userId
      restaurantId
      ownerId
      itemName
      itemPrice
      userWillPay
      additionalInfo
      userPhoneNumber
      restaurantPhoneNumber
      state
      quantity
    }
  }
`
export const GET_ORDER = gql`
  query getOrder($userId: String!) {
    orders(where: {userId: $userId}) {
      orderId
      userId
      restaurantId
      ownerId
      itemName
      itemPrice
      userWillPay
      additionalInfo
      userPhoneNumber
      restaurantPhoneNumber
      state
      quantity
    }
  }
`;
export const GET_SPECIALITIES = gql`
  query specialities {
    specialities {
      spId
      name
      image
    }
  }
`;

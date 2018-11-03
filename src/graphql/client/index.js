import gql from 'graphql-tag';

export const GET_CLIENT = gql`
  query getClient($email: String!) {
    listClients(
      filter: {
        email: {eq: $email}
      },
      limit: 1
    ) {
      items {
        userId
        email
        firstName
        lastName
        image
      }
    }
  }
`;
export const getRestaurants = gql`
  query listRestaurants {
    listRestaurants {
      items {
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
}
`;

export const filterRestaurants = gql`
  query myRestaurants($speciality: String!) {
    listRestaurants(filter: {speciality: { eq: $speciality }}) {
      items {
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
      createClient(input: {
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
    createOrder(input: {
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
    listOrders(
      filter: {
        userId: {eq: $userId}
      }) {
      items {
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
  }
`;
export const GET_SPECIALITIES = gql`
  query specialities {
    listSpecialities {
      items {
        spId
        name
        image
      }
    }
  }
`;

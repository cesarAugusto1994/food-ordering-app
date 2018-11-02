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
    $phoneNumber: String!,
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
      phoneNumber: $phoneNumber
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
      phoneNumber
      quantity
    }
  }
`

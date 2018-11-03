import gql from 'graphql-tag';

export const myRestaurants = gql`
  query myRestaurants($ownerId: String!) {
    listRestaurants(filter: {ownerId: { eq: $ownerId }}) {
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

export const CREATE_RESTAURANTE = gql`
  mutation createRestaurant(
    $ownerId: String!,
    $name: String!,
    $image: String!,
    $description: String!,
    $waitTime: Int!,
    $speciality: String!,
    $location: String!,
    $restaurantId: String!
    $phoneNumber: String!
  ) {
    createRestaurant(input: {
      ownerId: $ownerId,
      name: $name,
      image: $image,
      description: $description,
      waitTime: $waitTime,
      speciality: $speciality,
      location: $location,
      restaurantId: $restaurantId
      phoneNumber: $phoneNumber
    }) {
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

export const EDIT_RESTAURANTE = gql`
  mutation updateRestaurant(
    $name: String!,
    $image: String!,
    $description: String!,
    $waitTime: Int!,
    $speciality: String!,
    $location: String!,
    $restaurantId: String!
    $phoneNumber: String!
  ) {
    updateRestaurant(input: {
      name: $name,
      image: $image,
      description: $description,
      waitTime: $waitTime,
      speciality: $speciality,
      location: $location,
      restaurantId: $restaurantId
      phoneNumber: $phoneNumber
    }) {
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

export const DELETE_RESTAURANTE = gql`
  mutation deleteRestaurant($restaurantId: String!) {
    deleteRestaurant(input: {restaurantId: $restaurantId}) {
      name
    }
  }
`;


export const GET_OWNER = gql`
  query getOwner($email: String!) {
    listOwners(
      filter: {
        email: {eq: $email}
      },
      limit: 1
    ) {
      items {
        ownerId
        email
        firstName
        lastName
        image
      }
    }
  }
`;


export const getRestaurantsFoods = gql`
  query getMyFoods($restaurantId: String!) {
    listFoods(filter: {restaurantId: {eq: $restaurantId} }) {
      items {
        image
        name
        foodId
        restaurantId
        ownerId
        price
        description
      }
    }
  }
`;

export const getFood = gql`
  query getFood($foodId: String!, $restaurantId: String) {
    getFood(foodId: $foodId, restaurantId: $restaurantId) {
      image
      name
      foodId
      restaurantId
      ownerId
      price
      description
    }
  }
`;

export const CREATE_OWNER = gql`
  mutation createOwner(
    $email: String!,
    $ownerId: String!,
    $firstName: String!,
    $lastName: String!,
    $image: String!
    ) {
      createOwner(input: {
        email: $email
        ownerId: $ownerId
        firstName: $firstName
        lastName: $lastName
        image: $image
      }){
        ownerId
        email
        firstName
        lastName
        image
      }
  }
`;

export const CREATE_FOOD = gql`
  mutation createFood(
    $name: String!,
    $description: String!,
    $price: Int!,
    $image: String!,
    $restaurantId: String!,
    $foodId: String!
    $ownerId: String!
  ) {
    createFood(input: {
      name: $name
      description: $description
      price: $price
      image: $image
      restaurantId: $restaurantId
      foodId: $foodId
      ownerId: $ownerId
    }){
      name
      description
      price
      image
      restaurantId
      foodId
      ownerId
    }
  }
`;

export const EDIT_FOOD = gql`
  mutation updateFood(
    $name: String!,
    $description: String!,
    $price: Int!,
    $image: String!,
    $restaurantId: String!,
    $foodId: String!
    $ownerId: String!
  ) {
    updateFood(input: {
      name: $name
      description: $description
      price: $price
      image: $image
      restaurantId: $restaurantId
      foodId: $foodId
      ownerId: $ownerId
    }){
      name
      description
      price
      image
      restaurantId
      foodId
      ownerId
    }
  }
`;

const DeleteFoodInput = gql`
  input DeleteFoodInput {
    foodId: String!
    restaurantId: String!
  }
`;

export const DELETE_FOOD = gql`
  mutation deleteFood($foodId: String!, $restaurantId: String!) {
    deleteFood(input: {foodId: $foodId, restaurantId: $restaurantId}) {
      name
    }
  }
`;


export const ORDER_CREATE = gql`
  subscription onCreateOrder($ownerId: String!){
    onCreateOrder(ownerId: $ownerId) {
      quantity
      orderId
      userId
      ownerId
      restaurantId
      itemName
      itemPrice
      userWillPay
      additionalInfo
      restaurantPhoneNumber
      state
    }
  }
`;

export const GET_ORDER = gql`
  query getOrder($ownerId: String!) {
    listOrders(
      filter: {
        ownerId: {eq: $ownerId}
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
export const UPDATE_ORDER = gql`
  mutation updateOrder($status: String!, $orderId: String!){
    updateOrder(input: {state: $status, orderId: $orderId}) {
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

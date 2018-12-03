import gql from 'graphql-tag';

export const myRestaurants = gql`
  query myRestaurants($ownerId: String!) {
    restaurants(where: { ownerId: $ownerId }) {
      image
      restaurantId
      phoneNumber
      location
      waitTime
      description
      ownerId
      speciality
      name
      scheduleStart
      scheduleEnd
      isWeekendOpen
    }
  }
`;

export const CREATE_RESTAURANTE = gql`
  mutation createRestaurant(
    $ownerId: String!
    $name: String!
    $image: String!
    $description: String!
    $waitTime: Int!
    $speciality: String!
    $location: String!
    $restaurantId: String!
    $phoneNumber: String!
    $scheduleStart: String!
    $scheduleEnd: String!
    $isWeekendOpen: Boolean!
  ) {
    createRestaurant(
      data: {
        ownerId: $ownerId
        name: $name
        image: $image
        description: $description
        waitTime: $waitTime
        speciality: $speciality
        location: $location
        restaurantId: $restaurantId
        phoneNumber: $phoneNumber
        scheduleStart: $scheduleStart
        scheduleEnd: $scheduleEnd
        isWeekendOpen: $isWeekendOpen
      }
    ) {
      image
      restaurantId
      phoneNumber
      location
      waitTime
      description
      ownerId
      speciality
      name
      scheduleStart
      scheduleEnd
      isWeekendOpen
    }
  }
`;

export const EDIT_RESTAURANTE = gql`
  mutation updateRestaurant(
    $name: String!
    $image: String!
    $description: String!
    $waitTime: Int!
    $speciality: String!
    $location: String!
    $restaurantId: String!
    $phoneNumber: String!
    $scheduleStart: String!
    $scheduleEnd: String!
    $isWeekendOpen: Boolean!
  ) {
    updateRestaurant(
      where: { restaurantId: $restaurantId }
      data: {
        name: $name
        image: $image
        description: $description
        waitTime: $waitTime
        speciality: $speciality
        location: $location
        restaurantId: $restaurantId
        phoneNumber: $phoneNumber
        scheduleStart: $scheduleStart
        scheduleEnd: $scheduleEnd
        isWeekendOpen: $isWeekendOpen
      }
    ) {
      image
      restaurantId
      phoneNumber
      location
      waitTime
      description
      ownerId
      speciality
      name
      scheduleStart
      scheduleEnd
      isWeekendOpen
    }
  }
`;

export const DELETE_RESTAURANTE = gql`
  mutation deleteRestaurant($restaurantId: String!) {
    deleteRestaurant(where: { restaurantId: $restaurantId }) {
      name
    }
  }
`;

export const GET_OWNER = gql`
  query getOwner($email: String!) {
    owners(where: { email: $email }) {
      ownerId
      email
      firstName
      lastName
      image
    }
  }
`;

export const getRestaurantsFoods = gql`
  query getMyFoods($restaurantId: String!) {
    foods(where: { restaurantId: $restaurantId }) {
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

export const getFood = gql`
  query getFood($foodId: String!, $restaurantId: ID) {
    food(foodId: $foodId, restaurantId: $restaurantId) {
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
    $email: String!
    $ownerId: String!
    $firstName: String!
    $lastName: String!
    $image: String!
  ) {
    createOwner(
      data: {
        email: $email
        ownerId: $ownerId
        firstName: $firstName
        lastName: $lastName
        image: $image
      }
    ) {
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
    $name: String!
    $description: String!
    $price: Int!
    $image: String!
    $restaurantId: String!
    $foodId: String!
    $ownerId: String!
  ) {
    createFood(
      data: {
        name: $name
        description: $description
        price: $price
        image: $image
        restaurantId: $restaurantId
        foodId: $foodId
        ownerId: $ownerId
      }
    ) {
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
    $name: String!
    $description: String!
    $price: Int!
    $image: String!
    $restaurantId: String!
    $foodId: String!
    $ownerId: String!
  ) {
    updateFood(
      where: { foodId: $foodId }
      data: {
        name: $name
        description: $description
        price: $price
        image: $image
        restaurantId: $restaurantId
        foodId: $foodId
        ownerId: $ownerId
      }
    ) {
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
    deleteFood(data: { foodId: $foodId, restaurantId: $restaurantId }) {
      name
    }
  }
`;

export const ORDER_CREATE = gql`
  subscription order($ownerId: String!) {
    order(where: { node: { ownerId: $ownerId } }) {
      node {
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
  }
`;

export const GET_ORDER = gql`
  query getOrder($ownerId: String!) {
    orders(where: { ownerId: $ownerId }) {
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
export const UPDATE_ORDER = gql`
  mutation updateOrder($status: String!, $orderId: String!) {
    updateOrder(data: { state: $status }, where: { orderId: $orderId }) {
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

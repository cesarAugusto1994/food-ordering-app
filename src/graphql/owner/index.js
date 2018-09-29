import gql from 'graphql-tag';

export const myRestaurants = gql`
  query myRestaurants($ownerId: String!) {
    listRestaurants(filter: {ownerId: { eq: $ownerId }}) {
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

export const CREATE_RESTAURANTE = gql`
  mutation createRestaurant(
    $ownerId: String!,
    $name: String!,
    $image: String,
    $description: String!,
    $waitTime: Int!,
    $speciality: String!,
    $location: String!,
    $restaurantId: String!
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
    }) {
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
  ) {
    updateRestaurant(input: {
      name: $name,
      image: $image,
      description: $description,
      waitTime: $waitTime,
      speciality: $speciality,
      location: $location,
      restaurantId: $restaurantId
    }) {
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

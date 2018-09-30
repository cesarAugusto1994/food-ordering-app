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

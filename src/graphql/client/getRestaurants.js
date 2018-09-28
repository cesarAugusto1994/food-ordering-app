import gql from 'graphql-tag'

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

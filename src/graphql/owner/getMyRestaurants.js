import gql from 'graphql-tag';

export const myRestaurants = gql`
  query myRestaurants($ownerId: String!){
    getMyRestaurants(ownerId: $ownerId) {
      ownerId
      restaurantId
      name
      description
      location
      waitTime
      speciality
      image
  }
}`;

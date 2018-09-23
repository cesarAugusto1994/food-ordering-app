import gql from 'graphql-tag';

export const getFoods = gql`
  query allFood($restaurantId: String!){
    getRestaurantFoods(restaurantId: $restaurantId) {
      name
      description
      price
      image
      foodId
  }
}
`
export const getFood = gql`
  query getFoodItem($foodId: String!){
    getFood(foodId: $foodId) {
      name
      description
      price
      image
      foodId
  }
}
`

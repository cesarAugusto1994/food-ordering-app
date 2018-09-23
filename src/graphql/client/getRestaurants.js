import gql from 'graphql-tag'

export const getRestaurants = gql`{
  allRestaurants {
    name
    restaurantId
    image
    description
    waitTime
  }
}
`

const getFoods = gql`{
  getRestaurantFoods(restaurantId: "sktwi1fw8jlte3zlm") {
    name
    description
    priceimage,
    id
  }
}
`

export const getRestaurantsOptions = ({
  props: ({ data: { restaurants } }) => ({
    restaurants
  })
});

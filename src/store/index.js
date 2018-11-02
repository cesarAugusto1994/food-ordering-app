import createStore from "redux-zero";

const state = {
  isAuthed: false,
  user: {},
  isUser: false,
  isOwner: false,
  card: [],
  orders: [],
  restaurants: [],
  categories: [
    { name: 'Fast Food', image: 'https://st2.depositphotos.com/1017986/7580/i/950/depositphotos_75807441-stock-photo-close-up-of-fast-food.jpg' },
    { name: 'Burger', image: 'https://www.vival.fr/images/recette/recette-99.jpg' },
    { name: 'Sushi', image: 'https://img.grouponcdn.com/deal/2CtR2S65oxsqAcBUNaoozYpvjnnW/2C-2048x1229/v1/c700x420.jpg' },
    { name: 'Pizza', image: 'http://biarritz-pizza.fr/img-customer/configuration/5877a032cc3e8.35a3aaeb662bfd222e72443b23bd530b.jpeg' },
    { name: 'Sandwich', image: 'https://static.cuisineaz.com/400x320/i135335-sandwich-dietetique-legumes.jpeg' },
    { name: 'Indian', image: 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2018/01/Butter-chicken-recipe.jpg' },
    { name: 'Others', image: 'https://static.cuisineaz.com/400x320/i50715-caldeirada-ragout-de-poisson-portugais.jpg' },
    { name: 'Others', image: 'https://static.cuisineaz.com/400x320/i50715-caldeirada-ragout-de-poisson-portugais.jpg' }
  ],
  restaurantId: ''
};

const store = createStore(state);

export default store;

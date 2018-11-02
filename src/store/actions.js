import { showMessage, hideMessage } from "react-native-flash-message";

export default actions = store => ({
  signOnUser: (state, value) => ({
      isAuthed: value.isAuthed,
      user: value.user,
      isUser: value.isUser,
      isOwner: value.isOwner
    }),
  signOut: (state) => ({user: {}, isAuthed: false, isOwner: false, isUser: false}),
  currentUser: state => {
    if(state.isAuthed) {
      return {
        user: state.user,
        isAuthed: state.isAuthed,
        isUser: state.isUser,
        isOwner: state.isOwner
      };
    }
    return {
      user: {},
      isAuthed: false,
      isOwner: false,
      isUser: false
    };
  },
  addToCard: async (state, {item, quantity}, cb) => {
    const allEqual = (card, restaurantId) => card.every(food => food.restaurantId === restaurantId);
    const inArray = (arr, item) => arr.some(el => el.foodId === item.foodId);

    const addOrMerge = (card, item) => {
      if (inArray(card, item)) {
        return card.map(el => {
          if(el.foodId === item.foodId){
            el.quantity += item.quantity;
            return el;
          }
          return el;
        })
      }
      card.push(item);
      return card
    };

    if(state.card.length === 0) {
      return {...state, card: [...state.card, { ...item, quantity}]};
    }

    if(allEqual(state.card, item.restaurantId)) {
      return {...state, card: [ ...addOrMerge(state.card, { ...item, quantity}) ] };
    }
    return Promise.reject();
  },
  removeFromCard: (state, foodId) => {
    console.log({fooooooo: foodId})
    const newCard = state.card.filter(el => {
      if(el.foodId === foodId) return;
      return el;
    });
    return {...state, card: [ ...newCard]};
  },
  resetCard: (state) => {
    return {...state, card: []};
  },
  setTempRestaurantId: (state, restaurantId) => ({...state, restaurantId})
});

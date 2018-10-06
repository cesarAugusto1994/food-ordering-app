export default actions = store => ({
  signOnUser: (state, value) => console.log('----> actions', {value}) || ({
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
  addToCard: (state, {item, quantity}) => {
    const allEqual = (card, restaurantId) => card.every(food => food.restaurantId === restaurantId);
    if(allEqual(state.card, item.restaurantId)) {
      return {...state, card: [...state.card, { ...item, quantity}]};
    }
    return;
  }
})

export default actions = store => ({
  signOnCliente: (state, value) =>
    console.log('Cliente Login', {value}) || ({
      isAuthed: value.isAuthed,
      user: value.user,
      isUser: value.isUser,
      isOwner: false
    }),
  signOnOwner: (state, value) =>
    console.log('Owner Login --_>', {value}) || ({ ...value }),
  signOut: (state) => ({user: {}, isAuthed: false, isOwner: false, isUser: false}),
  currentUser: state => {
    console.log('state', {state})
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
  addToCard: (state, item) => ({ ...state, card: [...state.card, item]})
})

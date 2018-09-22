import createStore from "redux-zero";

const state = {
  isAuthed: false,
  user: {},
  isUser: false,
  isOwner: false,
  card: [],
  restaurants: {}
};

const store = createStore(state);

export default store;

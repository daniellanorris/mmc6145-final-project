import * as actions from './actions'

export default function reducer(state, { action, payload }) {
  switch (action) {
    case actions.GET_EVENTS:
      return { ...state, eventSearchResults: payload };
    case actions.ADD_TO_FAVORITES:
      // Modify the state to add the event ID to the favorites list
      return { ...state, favoriteEvents: [...state.favoriteEvents, payload] };
    case actions.REMOVE_FROM_FAVORITES:
      // Modify the state to remove the event ID from the favorites list
      return {
        ...state,
        favoriteEvents: state.favoriteEvents.filter(id => id !== payload)
      };
    default:
      return state;
  }
}
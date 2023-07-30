import * as actions from './actions'

export default function reducer(state, {action, payload}) {
  switch(action) {
    case actions.SEARCH_EVENTS:
      return {...state, eventSearchResults: payload}
    default:
      return state
  }
}
import {useContext, createContext, useReducer} from 'react'
import initialState from './state'
import reducer from './reducer'

export const EventContext = createContext()

export const useEventContext = () => {
  const context = useContext(EventContext)
  if (context === undefined)
    throw new Error('error getting context')
  return context
}

export const EventProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <EventContext.Provider {...props} value={[state, dispatch]} />
}
import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise'

import user from './user/reducer'
import counter from './counter/reducer'

const rootReducer = combineReducers({
	user,
	counter
})
export default createStore(rootReducer, applyMiddleware(promiseMiddleware))
import { handleActions } from 'redux-actions'
import { SETUSERID, SETUSERINFO } from './type'

export default handleActions({
	[SETUSERID] (state, action) {
		return {
			...state,
			user_id: action.payload
		}
	},
	[SETUSERINFO] (state, action) {
		console.log(action)
		return {
			...state,
			userinfo: {...state.userinfo, ...action.payload}
		}
	}
}, {
	userinfo: null,
	user_id: 0
})
import { SETUSERINFO } from './type'
import { createAction } from 'redux-actions'

export const setUserInfo = createAction(SETUSERINFO, data => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(data)
		}, 3000)
	})
})
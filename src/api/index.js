/*
 * @Author: shawbs
 * ---------------------------------------
 ** @Date: 2018-12-10 17:45:37
 * ---------------------------------------
 */

import Http from './base/http'
import Data from './mock/data'
const useMock = true

export default class Index extends Http {
	test ({c, i}) {
		console.log(this)
		return this.get('https://www.madcoder.cn/tests/sleep.php', {time: 1, t: 'css', c, i})
	}

	getList () {
		return useMock ? Data.getList() : this.get('/mock/index')
	}
}

const API = new Index()
export { API }

/*
 * @Author: shawbs
 * ---------------------------------------
 ** @Date: 2018-12-10 18:06:13
 * ---------------------------------------
 */

import Mock from 'mockjs'
const Random = Mock.Random
class Data {
	createAjaxData (data, errorCode = 0, errorMsg = '') {
		return {
			data,
			errorCode,
			errorMsg
		}
	}
	async getList (ajax = true) {
		const list = Mock.mock({
			'list|10': [{
				'article_id|+20': 10000,
				'title': Random.csentence(5, 30),
				'img_url': Random.image('200x100', '#02adea', 'Hello'),
				'author': Random.cname(),
				'date': Random.date() + ' ' + Random.time()
			}]
		})
		return await (ajax ? this.createAjaxData(list) : list)
	}
}

export default new Data()

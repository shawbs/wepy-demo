/*
 * @Author: shawbs
 * ---------------------------------------
 ** @Date: 2018-12-10 17:49:59
 * ---------------------------------------
 */

import wepy from 'wepy'
import config from './config'
import { WXCOMM } from '@util'

export default class Http {
	constructor () {
		this.baseUrl = wepy.$appConfig.baseUrl
		this.defaultParam = {
			_t: Math.round(new Date().getTime() / 1000)
		}
	}

	get (url, param, opt) {
		opt = {
			use_default_param: true, // 使用默认参数
			use_handle_error: true, // 使用处理错误函数
			...opt
		}
		url = url.indexOf('http') === 0 ? url : this.baseUrl + url
		param = opt.use_default_param ? {...this.defaultParam, ...param} : {...param}
		return wepy.request({
			url,
			data: param,
			...config
		}).then(res => {
			// console.log(res)
			return this.responeHandle(res, opt)
		}).catch(err => {
			// console.log(err)
			return this.failHandle(err)
		})
	}

    /**
     * 处理服务器返回的错误code
     * @param {*} errorCode
     */
	handleError (data) {
		switch (data.errorCode) {
		case '':
		default: WXCOMM.toast(data.errorMsg)
		}
	}

	handle__401 () {

	}

    /**
     * 请求成功处理
     * @param {*} param0
     */
	responeHandle ({data, statusCode, header}, opt) {
		return new Promise((resolve, reject) => {
			if (statusCode === 200) {
				if (opt.use_handle_error) {
					this.handleError(data)
				}
				resolve(data)
			} else if (statusCode === 401) {
				this.handle__401()
			} else {
				WXCOMM.toast(`服务器异常,状态码:${statusCode}`)
				reject(statusCode)
			}
		})
	}

    /**
     * 请求失败处理
     * @param {*} err
     */
	failHandle (err) {
		console.log(err)
		WXCOMM.toast('请求已超时')
		return Promise.reject(err)
	}
}

const HttpInstance = new Http()
export {
    HttpInstance
}

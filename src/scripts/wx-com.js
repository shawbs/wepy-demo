/*
 * @Author: shawbs
 * ---------------------------------------
 ** @Date: 2018-12-11 10:19:33
 * ---------------------------------------
 */
import wepy from 'wepy'
export default class WxComm {
	showLoading (str = '加载中...') {
		wepy.showLoading({
			title: str
		})
	}

	toast (str = 'toast', icon = 'none') {
		wepy.showToast({
			title: str,
			icon: icon
		})
	}
	getS (key, async = false) {
		if (!async) {
			return wepy.getStorageSync(key)
		} else {
			return this.getStorage(key)
		}
	}

	async getStorage (key) {
		await new Promise((resolve, reject) => {
			wx.getStorage({
				key,
				success (res) {
					resolve(res.data)
				},
				fail (err) {
					reject(err)
				}
			})
		})
	}

	setS (key, data, async = true) {
		if (async) {
			wepy.setStorage({
				key,
				data
			})
		} else {
			wepy.setStorageSync(key, data)
		}
	}
 }

const WXCOMM = new WxComm()
export {
    WXCOMM
 }
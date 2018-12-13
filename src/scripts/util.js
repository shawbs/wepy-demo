// const hasOwnProperty = Object.prototype.hasOwnProperty
class Util {
	emptyFn () { }
    /**
     * 替换url中的参数
     * @param {*} url
     * @param {*} arg
     * @param {*} val
     */
	changeUrlArg (url, arg, val) {
		var pattern = arg + '=([^&]*)'
		var replaceText = arg + '=' + val
		return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[?]') ? url + '&' + replaceText : url + '?' + replaceText)
	}

    /**
     * 统计不同渠道访客的行为
     * @param {*} source 来源类型
     * @param {*} action 动作类型
     */
	pushTrackEvent (source, action) {
		if (window._czc && window._hmt) {
			window._czc.push(['_trackEvent', source + '渠道', action, `来自${source}的访客,${action}的次数`])
			window._hmt.push(['_trackEvent', source + '渠道', action, `来自${source}的访客,${action}的次数`])
		} else {
			console.log('统计代码还未安装')
		}
	}

    /**
     * 统计单页面页面访问次数
     * @param {*} url 新页面
     */
	pushTrackView () {
		if (window._czc && window._hmt) {
			let contentUrl = location.pathname + location.hash
			let refererUrl = '/'
			window._czc.push(['_trackPageview', contentUrl, refererUrl])
			window._hmt.push(['_trackPageview', contentUrl, refererUrl])
		} else {
			console.log('统计代码还未安装')
		}
	}

    /**
     * 获取url中指定参数的值
     * @param {*} name
     */
	getQueryString (name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
		var r = window.location.search.substr(1).match(reg)
		if (r != null) return unescape(r[2]); return null
	}

    /**
     * 判断两个元素在页面上是否重叠
     * @param {*} a DOM元素
     * @param {*} b DOM元素
     */
	isCollision (a, b) {
		var ax = a.offsetLeft,
			ay = a.offsetTop,
			aw = a.offsetWidth,
			ah = a.offsetHeight,
			bx = b.offsetLeft,
			by = b.offsetTop,
			bw = b.offsetWidth,
			bh = b.offsetHeight
		return (ax + aw > bx && ax < bx + bw && ay + ah > by && ay < by + bh)
	}

    /**
     * param: date(时间磋)
     * str: 格式字符串
     * return 返回格式化后的日期
     */
	formatTime (date, str = 'YYYY-MM-DD hh:mm:ss') {
		date = new Date(date)
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()
		const hour = date.getHours()
		const minute = date.getMinutes()
		const second = date.getSeconds()
		const o = {
			'YYYY': year,
			'MM': this.formatNum(month),
			'DD': this.formatNum(day),
			'hh': this.formatNum(hour),
			'mm': this.formatNum(minute),
			'ss': this.formatNum(second)
		}
		for (let i in o) {
			str = str.replace(i, o[i])
		}
		return str
	}

    /**
     * 数字补0，返回字符串
     */
	formatNum (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}

    /**
     * 触发非常频繁的事件合并成一次延迟执行
     */
	debounce (action, delay) {
		var timer = null

		return function () {
			var self = this,
				args = arguments

			clearTimeout(timer)
			timer = setTimeout(function () {
				action.apply(self, args)
			}, delay)
		}
	}

    /**
     * 设置一个阀值，在阀值内，把触发的事件合并成一次执行；当到达阀值，必定执行一次事件
     */
	throttle (action, delay) {
		var statTime = 0

		return function () {
			var currTime = +new Date()

			if (currTime - statTime > delay) {
				action.apply(this, arguments)
				statTime = currTime
			}
		}
	}

    // 计算两个时间之间的倒计时
	computeTime (endtime) {
		try {
            // console.log(start, end)
			let end = new Date(endtime * 1000).getTime()
			let start = new Date().getTime()
			let t = end - start > 0 ? end - start : 0
            // console.log(new Date(endtime*1000).toLocaleDateString())
			if (t > 0) {
				let d = Math.floor(t / 1000 / 60 / 60 / 24)
				let hour = Math.floor(t / 1000 / 60 / 60 % 24)
				let min = Math.floor(t / 1000 / 60 % 60)
				let sec = Math.floor(t / 1000 % 60)
				let countDownTime = d + ':' + this.formatNum(hour) + ':' + this.formatNum(min) + ':' + this.formatNum(sec)
				return countDownTime
			} else {
				return '00:00:00'
			}
		} catch (err) {
			console.error(err)
		}
	}

    /**
   * 检测表单数据
   * formData: 表单数据{key:value}
   */
	checkForm (formData) {
        /**
         * 表单数据对应的效验配置
         * key 和表单数据的key要相同才能匹配上
         * reg 为null时，则不核验表单数据该中key的值
         */
		const VERIFYCONFIG = {
			mobile: {
				title: '手机号',
				reg: /^1(2|3|4|5|6|7|8|9)[0-9]{9}$/g
			},
			code: {
				title: '验证码',
				reg: /\d{4,}/g
			},
			pwd: {
				title: '密码',
				reg: /\S{6,}/g
			},
			inverterCode: {
				reg: /\w*/g
			},
			name: {
				title: '收货人',
				reg: /\S+/g
			},
			address: {
				title: '详细地址',
				reg: /\S+/g
			}
		}
		for (let item in formData) {
			let info = formData[item]
			let reg = VERIFYCONFIG[item] ? VERIFYCONFIG[item].reg : null
			if (reg) {
				let isValid = reg.test(info)
				reg.lastIndex = 0
                // console.log(item, reg, info, isValid)
				if (!isValid) {
					wx.showToast({
						title: VERIFYCONFIG[item].title + '输入错误!',
						icon: 'none'
					})
					return false
				}
			}
		}
		return true
	}

    /**
     * 清除字符串首尾空格
     * @param {*} str
     */
	trim (str) {
		return str.replace(/(^\s|\s$)/g, '')
	}

    /**
     * 仅限数字数组
     * @param {number} min 最小值
     * @param {number} max   最大值
     */
	createRangeArr (min, max) {
		if (typeof min !== 'number' && typeof max !== 'number') {
			throw new Error('min和max必须是整数数值类型')
		}
		let arr = []
		for (let i = min; i <= max; i++) {
			arr.push(i)
		}
		return arr
	}

    /**
     * 获取数据类型
     */
	getType (target) {
		return Object.prototype.toString.call(target).toLowerCase().match(/\w+(?=])/)[0]
	}

    /**
     * 判断两个值是否相等
     * @param {any} a
     * @param {any} b
     */
	eq (a, b) {
		if (this.getType(a) !== this.getType(b)) return false
		switch (this.getType(a)) {
		case 'string':
		case 'number':
		case 'undefined':
		case 'null':
			return a === b
		case 'object':
		case 'array':
			return JSON.stringify(a) === JSON.stringify(b)
		}
	}
}

export default new Util()

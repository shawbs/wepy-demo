const path = require('path')
// const LessPluginAutoPrefix = require('less-plugin-autoprefix')
var prod = process.env.NODE_ENV === 'production'

module.exports = {
	wpyExt: '.wpy',
	eslint: false,
	cliLogs: !prod,
	build: {
		web: {
			htmlTemplate: path.join('src', 'index.template.html'),
			htmlOutput: path.join('web', 'index.html'),
			jsOutput: path.join('web', 'index.js')
		}
	},
	resolve: {
		alias: {
			counter: path.join(__dirname, 'src/components/counter'),
			'@': path.join(__dirname, 'src'),
			'@c': path.join(__dirname, 'src/components'),
			'@util': path.join(__dirname, 'src/scripts'),
			'@p': path.join(__dirname, 'src/pages'),
			'@as': path.join(__dirname, 'src/assets'),
			'@mixin': path.join(__dirname, 'src/mixins'),
			'@api': path.join(__dirname, 'src/api')
		},
		aliasFields: ['wepy', 'weapp'],
		modules: ['node_modules']
	},
	compilers: {
    // less: {
    // 	compress: prod,
    // 	plugins: [new LessPluginAutoPrefix({browsers: ['Android >= 2.3', 'Chrome > 20', 'iOS >= 6']})]
    // },
		sass: {
			outputStyle: 'nested'
		},
		babel: {
			sourceMap: true,
			presets: [
				'env'
			],
			plugins: [
				'transform-class-properties',
				'transform-decorators-legacy',
				'transform-object-rest-spread',
				'transform-export-extensions'
			]
		}
	},
	plugins: {
		'autoprefixer': {
			filter: /\.wxss$/,
			config: {
				browsers: ['last 11 iOS versions']
			}
		}
	},
	appConfig: {
		noPromiseAPI: ['createSelectorQuery'],
		baseUrl: prod ? 'https://prod.com' : 'https://dev.com'
	}
}

if (prod) {
  // 压缩sass
	module.exports.compilers['sass'] = {
		outputStyle: 'compressed'
	}

  // 压缩less
  // module.exports.compilers['less'] = {'compress': true}

  // 压缩js
	module.exports.plugins = {
		uglifyjs: {
			filter: /\.js$/,
			config: {}
		},
		imagemin: {
			filter: /\.(jpg|png|jpeg)$/,
			config: {
				jpg: {
					quality: 80
				},
				png: {
					quality: 80
				}
			}
		}
	}
}

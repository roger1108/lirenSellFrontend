// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
	build: {
		env: require('./prod.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		productionSourceMap: false,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		port: 9000,
        	sellUrl: 'http://127.0.0.1',
        	openidUrl: 'http://sell.springboot.cn/sell/wechat/authorize',
        	wechatPayUrl: 'http://127.0.0.1'
	},
	dev: {
		host: '0.0.0.0',
		env: require('./dev.env'),
		port: 8088,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {},

		/*  调用API  roger change start */
		proxyTable: {
			'/api': {
				target: 'http://116.62.172.49:5000',
				changeOrigin: true,
				secure: false,  // 如果是https接口，需设置secure为false
				pathRewrite: {
				  '^/api': ''
				}
			  },
			  '/sell': {
				//target: 'http://101.37.149.241:8084',
				target: 'http://127.0.0.1:8080',
				changeOrigin: true,
				secure: false,  // 如果是https接口，需设置secure为false
				pathRewrite: {
				  '^/sell': 'sell'
				}
			  },
		},
		/*  调用API  roger change end */


		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false,
		sellUrl: 'http://127.0.0.1',
		openidUrl: 'http://127.0.0.1',
		wechatPayUrl: 'http://127.0.0.1'

		
	}
}

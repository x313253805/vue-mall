'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')


// //start json-server
// let jsonServer = require('json-server');
// let apiServer = jsonServer.create();
// let apiRouter = jsonServer.router('db.json');
// let middlewares = jsonServer.defaults();
//
// apiServer.use(middlewares);
// apiServer.use('/api',apiRouter);
// apiServer.listen(8083,function(){
//   console.log('JSON server is running');
// })
// //end

//使用express实现服务器端功能
// let express = require('express');
// let bodyParser = require('body-parser');
//
// let apiServer = express();
//
// apiServer.use(bodyParser.urlencoded({extended:true}))
// apiServer.use(bodyParser.json())
// let apiRouter = express.Router();
// let fs = require('fs');
//
// apiRouter.get('/',(req,res)=>{
//   res.json({
//     message:'welcome to our server'
//   })
// })
//
// apiRouter.route('/:apiName').all((req,res)=>{
//   fs.readFile('./db.json','utf8',(err,data)=>{
//     if(err) throw err;
//     let newData = JSON.parse(data);
//     if(newData[req.params.apiName]){
//       res.json(newData[req.params.apiName]);
//     }else{
//       res.send('no such api name');
//     }
//   })
// })
//
// apiServer.use('/api',apiRouter);
// apiServer.listen(8088,(err)=>{
//   if(err){
//     console.log(err);
//     return
//   }
//   console.log('listen at http://localhost:8088');
// })


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

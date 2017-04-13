import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { join } from 'path';
const webpack = require('webpack');
const styleExtractor = new ExtractTextPlugin('css/styles.css',{allChunks:true});
const libExtractor = new ExtractTextPlugin('css/lib.css',{allChunks:true});
const PROCESS_NAME = process.env.NODE_ENV;
const hotMiddlewareScript = 'webpack-hot-middleware/client?noInfo=false&quiet=false&reload=true';
export default {

  devtool: '#source-map',
  entry: {
    //index: './client/index.js',
    index: ['webpack/hot/dev-server', hotMiddlewareScript,'babel-polyfill','./client/index.js'],
    lib: ["react", "react-dom"]
  },

  output: {
    filename: '[name].js',
    path: join(__dirname, './dist'),
    publicPath: '/static/',
    chunkFilename: '[name].chunk.js',
  },

  module: {
	 loaders: [
	      {
        test   : /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader : "babel",
        query  : {
          plugins : [
            ['transform-runtime'], 
            ['import', [{libraryName: "antd", style: true}]],
          ],
          presets:[
            "es2015", "react", "stage-0"
          ],
          cacheDirectory: true
        }
       },
	      {
	        test  : /\.scss$/,
	        loader: styleExtractor.extract('style', 'css!sass')
	      },
	      {
	        test  : /\.less$/,
	        loader: libExtractor.extract('style', `css!less?{"sourceMap":true}`)
	      },
	      {
	        test   : /\.css$/,
	        exclude: /\.min.css$/,
	        loader : styleExtractor.extract("style", "css")
	      },
	      {
	        test  : /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
	        loader: `url?limit=1&name=img/[sha512:hash:base64:7].[ext]`
	      }
	    ]
  },
	plugins: [
	  new webpack.DefinePlugin({'process.env.NODE_ENV': '"' + PROCESS_NAME + '"'}),
    new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'),
    styleExtractor,
    libExtractor,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
  
};

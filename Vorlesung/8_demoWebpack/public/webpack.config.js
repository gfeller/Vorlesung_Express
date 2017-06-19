module.exports = {
    entry: {
        index: './js/controllers/indexController.js',
        order: './js/controllers/orderController.js'
    },
    output: {
        path: __dirname,
        filename: "./[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js'
        }
    }
};
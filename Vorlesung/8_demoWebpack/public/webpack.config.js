module.exports = {
    entry: "./src/ajaxSample.js",
    output: {
        path: __dirname,
        filename: "./js/bundle.js"
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
            $: "js/lib/jquery/src/jquery"
        }
    }
};
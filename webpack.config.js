const path = require('path');

module.exports = {
    mode:"development",
    entry: {
        "register": path.resolve(__dirname, 'weekly_schedule/src/register.ts'),
        "login": path.resolve(__dirname, 'weekly_schedule/src/login.ts'),
    },
    module: {
        rules: [
        {
            test: /\.ts$/,
            exclude: [/node_modules/],
            loader: 'ts-loader'
        },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'weekly_schedule/static/dist')
    },
    };
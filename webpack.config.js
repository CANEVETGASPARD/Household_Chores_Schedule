const path = require('path');

module.exports = {
    mode:"development",
    entry: {
        "base": path.resolve(__dirname, 'weekly_schedule/static/src/base.ts'),
        "home": path.resolve(__dirname, 'weekly_schedule/static/src/home.ts'),
        "register": path.resolve(__dirname, 'weekly_schedule/static/src/register.ts'),
        "login": path.resolve(__dirname, 'weekly_schedule/static/src/login.ts'),
        "create_schedule": path.resolve(__dirname, 'weekly_schedule/static/src/create_schedule.ts'),
    },
    module: {
        rules: [
        {
            test: /\.ts$/,
            exclude: [/node_modules/],
            loader: 'ts-loader'
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        ],
    },
    resolve: {
        extensions: ['.ts', '.css'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'weekly_schedule/static/dist')
    },
    };
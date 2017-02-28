var path = require('path');

module.exports = {
    entry: {
        app: './app/index.js'
    },
    output: {
        filename: 'othello-bundle.js',
        path: path.resolve(__dirname, 'app/dist')
    }
};

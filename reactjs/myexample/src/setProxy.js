const { proxy } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        proxy({
            target: 'http://localhost:8888/',
            changeOrigin: true,
        })
    );
    app.use(
        '/goApi',
        proxy({
            target: 'http://localhost:9999/',
            changeOrigin: true,
        })
    );
};

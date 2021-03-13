const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 8001;
const HOST = "0.0.0.0";
const API_SERVICE_URL = "http://localhost:3000";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to JSONPlaceholder API.');
});

// Authorization
app.use('', (req, res, next) => {
    // For now, will not use authorization
    next();
    return;
    if (req.headers.authorization) {
        next();
    } else {
        res.sendStatus(403);
    }
});

function onError(err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain',
  });
  console.log(err)
  res.end('Something went wrong. And we are reporting a custom error message.');
}
// Proxy endpoints
app.use('/', createProxyMiddleware({ target: API_SERVICE_URL, ws: true, changeOrigin: true, onError: onError }));

/*app.use('/', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^//`]: '',
    },
}));*/

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

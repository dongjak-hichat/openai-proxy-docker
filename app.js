const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express()
const port = 9017
app.use('/weathergpt', createProxyMiddleware({
    target: 'https://weathergpt.vercel.app/api/',
    changeOrigin: true,
    pathRewrite: {
        '^/weathergpt': '/', // Rewrite the path; remove /weathergpt
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.removeHeader('x-forwarded-for');
        proxyReq.removeHeader('x-real-ip');
    },
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));
app.use('/openai', createProxyMiddleware({
    target: 'https://api.openai.com/v1/',
    changeOrigin: true,
    pathRewrite: {
        '^/openai': '/', // Rewrite the path; remove /openai
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.removeHeader('x-forwarded-for');
        proxyReq.removeHeader('x-real-ip');
    },
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));


app.listen(port, () => {
    console.log(`Proxy agent started: http://localhost:${port}`)
})

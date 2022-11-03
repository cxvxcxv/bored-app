const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/", {
      target: "https://www.boredapi.com/",
      changeOrigin: true,
    })
  );
};

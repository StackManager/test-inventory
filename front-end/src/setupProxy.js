const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    createProxyMiddleware('/api', {
      target: 'https://mychannel.nunchee.tv', 
      changeOrigin: true,
      headers: {
        Connection: "keep-alive"
      },
      onProxyRes: function(proxyRes, req, res) {
          console.log("onProxyRes", proxyRes.url);
          console.log("-----------------------------------------")
      },
      onError: function (err, req, res, target) {
        console.log("onError", "/api/generic");
        console.log("-----------------------------------------")
      },
      onProxyReq: function(proxyRes, req, res) {
        console.log("onProxyReq");
        console.log("-----------------------------------------")
        // if (proxyRes.headers.location && proxyRes.headers.location.startsWith('https://assets.nunchee.com')) {
        //   const imagePath = proxyRes.headers.location.replace('https://assets.nunchee.com', '');
        //   proxyRes.headers.location = `http://localhost:3000${imagePath}`;
        // }
      }
    })
  );

  /*app.use( 
  createProxyMiddleware('/api/assets/**', {
    target: 'https://mychannel.nunchee.tv', 
    changeOrigin: true,
    followRedirects: true,
    headers: {
      Connection: "keep-alive"
    },
    onError: function (err, req, res, target) {
      console.log("onError", "/api/assets/images");
      console.log("-----------------------------------------")
    },
    onProxyRes: function (proxyRes, req, res) {
      console.log("onError", "/api/assets/images");
      console.log("-----------------------------------------")
    },
    onProxyRes: function(proxyRes, req, res) {
      console.log("onProxyRes", "/api/assets/images");
      console.log("-----------------------------------------")
      // if (proxyRes.headers.location && proxyRes.headers.location.startsWith('https://assets.nunchee.com')) {
      //   const imagePath = proxyRes.headers.location.replace('https://assets.nunchee.com', '');
      //   proxyRes.headers.location = `http://localhost:3000${imagePath}`;
      // }
    }
  }));*/

  // app.use('/out', createProxyMiddleware({
  //   target: 'https://assets.nunchee.com',
  //   changeOrigin: true,
  //   onProxyRes: function(proxyRes, req, res) {
  //       proxyRes.headers['access-control-allow-origin'] = '*';
  //   }
  // }));
};





/*const { createProxyMiddleware } = require('http-proxy-middleware');
    pathRewrite: {
      '^/out': 'https://b.com/image.png'
    },
module.exports = function(app) {


  app.use(
    createProxyMiddleware('/api/generic/playlists/details/62ed078f15f4850026b193bd', {
      target: 'https://mychannel.nunchee.tv', 
      changeOrigin: true,
      headers: {
        Connection: "keep-alive"
      }
    })
  );

  app.use('/api/assets/images', createProxyMiddleware({
    target: 'https://mychannel.nunchee.tv',
    changeOrigin: true,
    onProxyRes: function(proxyRes, req, res) {
      if (proxyRes.headers.location && proxyRes.headers.location.startsWith('https://assets.nunchee.com')) {
        proxyRes.headers.location = 'http://localhost:3000/out';
      }
    },
    pathRewrite: {
      '^/api/assets/images': ''
    }
  }));
  
  app.use('/out', createProxyMiddleware({
    target: 'https://assets.nunchee.com',
    changeOrigin: true,
    onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['access-control-allow-origin'] = '*';
    }
  }));
};




/*const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    createProxyMiddleware('/api/generic/playlists/details/62ed078f15f4850026b193bd', {
      target: 'https://mychannel.nunchee.tv', 
      changeOrigin: true,
      headers: {
        Connection: "keep-alive"
      }
    })
  );
  
  // app.use(
  //   createProxyMiddleware('/api/assets/images', {
  //     target: 'https://mychannel.nunchee.tv', 
  //     changeOrigin: true,
  //     followRedirects: false,
  //     headers: {
  //       Connection: "keep-alive"
  //     },
  //   })
  // );
};*/


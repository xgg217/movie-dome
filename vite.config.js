const path = require('path');

module.exports = {
  alias: {
    '/@/': path.resolve(__dirname, './src'),
  },
  proxy: {
    "/api": {
      target: "http://47.110.74.37:7001/"
    }
  },
}
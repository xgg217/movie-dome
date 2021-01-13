const path = require('path');
module.exports = {
  proxy: {
    "/api": {
      target: "http://47.110.74.37:7001/"
    }
  }
}
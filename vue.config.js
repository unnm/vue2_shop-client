// vue.config.js
module.exports = {
  lintOnSave: false, //禁用eslint
  devServer: {
    proxy: {
      '/api': {
        target: 'http://121.5.235.28:8888' // 转发的目标服务器地址
        // pathRewrite: { '^/api': '' } // 是否把路径当中的/api去掉，要不要去掉/api，要看接口路径里面有没有，如果有，那就不去
      }
    }
  }
}

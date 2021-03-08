const path = require('path')

// 使用 postcss + postcss-pxtorem 进行 rem 转化
const configPost = (config) => {
  require('react-app-rewire-postcss')(config, {
    plugins: loader => [
      require('postcss-pxtorem')({
        rootValue: 108,
        unitPrecision: 5,
        propList: ['*'],
        exclude: /node_modules/i
      })
    ]
  })
}

// 使用  react-app-rewire-sass-resource + sass-resources-loader 配置全局 sass 变量
const configSassResources = (config) => {
  require('./react-app-rewire-sass-resource')(config, { // 这里参数参考 sass-resources-loader
    resources: ['./src/styles/variables.scss',]
  })
}

// 使用 alias 别名
const configAlias = (config) => {
  require('react-app-rewire-alias').alias({
    '@views': './src/views',
    // '@assets': './src/assets',
    // '@components': './src/components',
    // '@styles': './src/styles',
    // '@views': './src/views',
  })(config)
}


module.exports = function override(config, env) {
  // configPost(config)

  // configSassResources(config)

  configAlias(config)

  return config;
}

module.exports = function override (config) {
  if (process.env.DEV_MODE) {
    console.log('Using development mode')
    process.env.NODE_ENV = 'development'
    if (process.env.ENV !== 'local') {
      process.env.ENV = process.env.NODE_ENV
    }
    config.mode = 'development'
    config.optimization.minimize = false
    config.optimization.nodeEnv = process.env.NODE_ENV
    config.devtool = 'cheap-module-source-map'
  }
  return config
}

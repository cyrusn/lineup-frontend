module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/lineup/'
    : '/'
}

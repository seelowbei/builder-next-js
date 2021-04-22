/* eslint-disable consistent-return */
/* eslint-disable no-magic-numbers */
/* eslint-disable require-unicode-regexp */
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const themeVariables = lessToJS(fs.readFileSync(
  path.resolve(__dirname, './styles/antd.less'),
  'utf8'
))

module.exports = withCSS(withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables
  },
  webpack: (config, { isServer }) => {
    config.plugins.push(new FilterWarningsPlugin({
      // Ignore ANTD chunk styles [mini-css-extract-plugin] warning
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
    }))

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]

      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) {
            return callback()
          }
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...typeof origExternals[0] === 'function'
          ? []
          : origExternals
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader'
      })
    }

    return config
  }
}))

const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const LimitChunkCountPlugin = webpack.optimize.LimitChunkCountPlugin;
const path = require('path');

module.exports = {
  devServer: {
    https: false,
    port: 8000,
    proxy: null, // 禁用代理配置
  },
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.plugins.push(
      new LimitChunkCountPlugin({
        maxChunks: process.env.NODE_ENV === 'development' ? 1 : undefined,
      }),
    );
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'eval-source-map'; // 快速调试
    }
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          deleteOriginalAssets: false, // 保留原始文件
        }),
      );
    }
    config.performance = {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };
    const crypto = require('crypto');
    if (process.versions.node >= '18.0.0') {
      const crypto_orig_createHash = crypto.createHash;
      crypto.createHash = (algorithm) =>
        crypto_orig_createHash(algorithm === 'md4' ? 'sha256' : algorithm);
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('vue', '@vue/compat');
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options['compilerOptions'] = { compatConfig: { MODE: 2 } };
        return options;
      });
    config.module
      .rule('ico')
      .test(/\.ico$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[contenthash:8].[ext]',
      });
    if (process.env.NODE_ENV === 'production') {
      config.plugin('html').tap((options) => {
        options[0].filename = 'index.[contenthash:8].html';
        return options;
      });
    }
  },
  pluginOptions: {
    i18n: {
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
};

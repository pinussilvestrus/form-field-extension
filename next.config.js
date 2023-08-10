const {
  NormalModuleReplacementPlugin
} = require('webpack');

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      loader: 'raw-loader'
    });

    // todo(pinussilvestrus): this should not be needed
    config.plugins.push(
      new NormalModuleReplacementPlugin(
        /^(..\/preact|preact)(\/[^/]+)?$/,
        function(resource) {

          const replMap = {
            'preact/hooks': path.resolve('./node_modules/preact/hooks/dist/hooks.module.js'),
            'preact/jsx-runtime': path.resolve('./node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js'),
            'preact': path.resolve('./node_modules/preact/dist/preact.module.js'),
            '../preact/hooks': path.resolve('./node_modules/preact/hooks/dist/hooks.module.js'),
            '../preact/jsx-runtime': path.resolve('./node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js'),
            '../preact': path.resolve('./node_modules/preact/dist/preact.module.js')
          };

          const replacement = replMap[resource.request];

          if (!replacement) {
            return;
          }

          resource.request = replacement;
        }
      ),
    );

    return config
  }
}

module.exports = nextConfig

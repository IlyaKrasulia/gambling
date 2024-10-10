module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [{
    'plugins': [
      ['@babel/plugin-transform-private-methods', {
        'loose': true,
      }],
    ],
  }],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@navigation': './src/navigation',
          '@screen': './src/screen',
          '@utils': './src/utils',
          '@context': './src/context',
          '@api': './src/api',
          '@hooks': './src/hooks',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

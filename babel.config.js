// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (api) => {
  const plugins = [
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-optional-chaining',
  ];

  if (api.env('commonjs') || api.env('test')) {
    plugins.push([
      '@babel/plugin-transform-modules-commonjs',
      {
        loose: true,
      },
    ]);
  }

  return {
    presets: [
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true,
        },
      ],
      ['@babel/preset-react', {
        runtime: 'automatic',
      }],
    ],
    plugins,
    env: {
      test: {
        plugins: [
          'babel-plugin-styled-components',
          ['@babel/plugin-proposal-decorators', {
            legacy: true,
          }],
          ['module-resolver', {
            alias: {
              'fusion:themes': './jest/mocks/themes.js',
              'fusion:content': './jest/mocks/content.js',
              'fusion:context': './jest/mocks/context.js',
              'fusion:consumer': './jest/mocks/consumer.js',
              'fusion:environment': './jest/mocks/environment.js',
              'fusion:properties': './jest/mocks/properties.js',
              'fusion:static': './jest/mocks/static.js',
            },
          }],
        ],
      },
    },
  };
};

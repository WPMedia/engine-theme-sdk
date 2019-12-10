// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (api) => {
  const plugins = [
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: api.env('es'),
      },
    ],
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
      '@babel/preset-react',
    ],
    plugins,
    env: {
      test: {
        plugins: [
          ['@babel/plugin-proposal-decorators', {
            legacy: true,
          }],
          ['module-resolver', {
            alias: {
              'fusion:themes': './__mocks__/themes.js',
              'fusion:content': './__mocks__/content.js',
              'fusion:context': './__mocks__/context.js',
              'fusion:consumer': './__mocks__/consumer.js',
              'fusion:environment': './__mocks__/environment.js',
              'fusion:properties': './__mocks__/properties.js',
              'fusion:static': './__mocks__/static.js',
            },
          }],
        ],
      },
    },
  };
};

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

  if (api.env('commonjs')) {
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
  };
};

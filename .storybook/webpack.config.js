module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        // todo: transition to babel-loader
        loader: require.resolve("awesome-typescript-loader"),
        options: {
          presets: [["react-app", { flow: false, typescript: true }]],
          // using different tsconfig than main build bc storybook errors
          configFileName: "./.storybook/tsconfig.json"
        }
      },
      {
        loader: require.resolve("react-docgen-typescript-loader")
      }
    ]
  })
  config.resolve.extensions.push(".ts", ".tsx")
  return config
}
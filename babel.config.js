module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    env: {
      production: {},
    },
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"], // Thư mục gốc của dự án
          alias: {
            "@": "./", // Alias `@` trỏ tới thư mục `src`
          },
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  }
}

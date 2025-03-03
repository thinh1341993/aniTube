module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {},
    },
    plugins: [
      "@babel/plugin-transform-export-namespace-from",
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

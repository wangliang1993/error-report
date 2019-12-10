import babel from "rollup-plugin-babel";
let isDev = process.env.NODE_ENV === "develop";
let babelConfig = {
  presets: [
    [
      "env",
      {
        module: false,
        targets: {
          browsers: ["chrome > 40", "safari >= 7"]
        }
      }
    ]
  ],
  plugins: ["external-helpers"]
};
export default {
  input: "index.js",
  watch: {
    exclude: "node_modules/**"
  },
  output: {
    file: isDev
      ? "../website/client/js/error-report-sdk/bundle.umd.js"
      : "../dist/bundle.umd.js",
    name: "ErrorReport",
    format: "umd",
    sourceMap: true
  },
  plugin: [
    babel({
      babelrc: false,
      presets: babelConfig.presets,
      plugins: babelConfig.plugins,
      exclude: "node_modules/**"
    })
  ]
};

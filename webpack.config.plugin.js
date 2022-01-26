const os = require("os")
const fs = require('fs')
const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/plugin/mainwindow.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'DRS_BoostEngine.js',
  },
  target: 'node',
  resolve: {
    extensions: [
      '.js',
      '.json',
    ],
  },
  module: {
    rules: [
      {
        test: /\.prebundleapp/,
        type: 'asset',
        parser: {
          dataUrlCondition: (source, { filename, module }) => {
            return true;
          },
        },
        generator: {
          dataUrl: (content) => {
            return content.toString();
          },
        },
      }
    ]
  },
  plugins: [
    new class AddPluginComments {
      apply(compiler) {
        compiler.hooks.afterEmit.tap('AddPluginComments', compilation => {
          const { options: { output: { path: dir, filename } } } = compilation
          const output_file_path = path.resolve(dir, filename)
          const pc = path.resolve(__dirname, 'src', 'plugin', 'assets', 'plugincomment.txt')
          fs.writeFileSync(output_file_path, fs.readFileSync(pc)+os.EOL+fs.readFileSync(output_file_path))
        })
      }
    }()
  ],
}
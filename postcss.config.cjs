const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const mediaMinMax = require("postcss-media-minmax")

module.exports = {
  plugins: [
    autoprefixer, cssnano, mediaMinMax,
  ],
}
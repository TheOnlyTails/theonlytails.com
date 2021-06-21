const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")

module.exports = {
	syntax: "postcss-scss",
	plugins: [
		tailwindcss(),
		autoprefixer()
	]
}
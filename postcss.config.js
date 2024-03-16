const config = {
	plugins: {
		"tailwindcss/nesting": "postcss-nesting",
		tailwindcss: {},
		autoprefixer: {},
		"postcss-preset-env": {
			features: { "nesting-rules": false },
		},
	},
};

export default config
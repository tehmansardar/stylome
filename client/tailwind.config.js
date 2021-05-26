const { colors: defaultColors } = require('tailwindcss/defaultTheme');

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ['Helvetica', 'Arial', 'sans-serif'],
			},
			screens: {
				xs: '475px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};

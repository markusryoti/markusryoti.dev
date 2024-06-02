/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: '#011627',
				backgroundlighter: '#082741',
				accent: '#CE2029',
				brandwhite: '#F1FAEE',
				accentlight: '#90C3C8',
			},
		},
	},
	plugins: [],
};

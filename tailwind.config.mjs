/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: '#1D3557',
				backgroundlighter: '#457B9D',
				accent: '#E63946',
				brandwhite: '#F1FAEE',
				accentlight: '#A8DADC',
			},
		},
	},
	plugins: [],
};

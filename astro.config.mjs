import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import solidJs from '@astrojs/solid-js'

import netlify from '@astrojs/netlify/functions'

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	adapter: netlify(),
	site: 'https://astro-frontend-masters-asragab.netlify.app/',
	integrations: [
		react({
			include: '**/react/*',
		}),
		solidJs({
			include: '**/solid/*',
		}),
	],
})

import { createRouter, createWebHistory } from 'vue-router'
import CharacterPage from '../pages/CharacterPage.vue'
const router = createRouter({
	routes: [
		{
			path: '/',
			name: 'character',
			component: CharacterPage
		},
	],
	history: createWebHistory(),
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import CharactersPage from '../pages/CharactersPage.vue'
import PersonPage from '../pages/PersonPage.vue'
import LocationsPage from '../pages/LocationsPage.vue'
import LocationDataPage from '../pages/LocationDataPage.vue'
const router = createRouter({
	routes: [
		{
			path: '/',
			name: 'characters',
			component: CharactersPage
		},
		{
			path: '/character/:id',
			name: 'person',
			component: PersonPage,
			props: true,
		},
		{
			path: '/locations',
			name: 'locations',
			component: LocationsPage
		},
		{
			path: '/location/:id',
			name: 'location',
			component: LocationDataPage,
			props: true,
		},
	],
	history: createWebHistory(),
})

export default router

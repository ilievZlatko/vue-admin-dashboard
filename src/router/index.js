import { createRouter, createWebHistory } from 'vue-router'
import * as netlifyIdentityWidget from 'netlify-identity-widget'

import Home from '../views/Home.vue'
import Team from '../views/Team.vue'
import SignIn from '../views/SignInFlow/SingIn.vue'
import Request from '../views/SignInFlow/Request.vue'
import Recover from '../views/SignInFlow/Recover.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/teams',
		name: 'teams',
		component: Team,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/signin',
		name: 'signin',
		component: SignIn,
	},
	{
		path: '/request',
		name: 'request',
		component: Request,
	},
	{
		path: '/recover',
		name: 'recover',
		component: Recover,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach((to, from, next) => {
	const currentUser = netlifyIdentityWidget.currentUser()
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

	if (requiresAuth && !currentUser) {
		next('signin')
	} else {
		next()
	}
})

export default router

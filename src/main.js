import { createApp } from 'vue'
import * as netlifyIdentityWidget from 'netlify-identity-widget'
import GoTrue from 'gotrue-js'

import App from './App.vue'
import router from './router'
import store from './store'

// Initialize Netlify Identity
netlifyIdentityWidget.init()

// Initialize GoTrue js for netlify
export const auth = new GoTrue({
	APIUrl: 'https://admin-dashboard-hq.netlify.app/.netlify/identity',
	setCookie: true,
})

createApp(App)
	.use(store)
	.use(router)
	.mount('#app')

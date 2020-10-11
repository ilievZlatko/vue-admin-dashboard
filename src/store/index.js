import { createStore } from 'vuex'

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	window.localStorage.setItem('isDarkMode', true)
}

export default createStore({
	state: {
		isDarkMode: window.localStorage.getItem('isDarkMode'),
	},

	getters: {
		isDarkMode(state) {
			return state.isDarkMode
		},
	},

	mutations: {
		toggleDarkMode(state) {
			if (state.isDarkMode) {
				state.isDarkMode = false
				document.body.style.background = '#f0f3f5'
				window.localStorage.setItem('isDarkMode', state.isDarkMode)
			} else {
				state.isDarkMode = true
				document.body.style.background = '#212c4f'
				window.localStorage.setItem('isDarkMode', state.isDarkMode)
			}
		},
	},

	actions: {
		triggerDarkMode(context) {
			context.commit('toggleDarkMode')
		},
	},
})

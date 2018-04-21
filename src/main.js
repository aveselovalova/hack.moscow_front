import Vue from 'vue'
import App from './App.vue'
import VueCamera from './components/VueCamera.vue'
import Mic from './components/Mic.vue'

Vue.component('camera', VueCamera);
Vue.component('mic', Mic)
new Vue({
	el: '#app',
	template: '<App/>',
	components: {
		App
	}
})

import Vue from 'vue'
import App from './App.vue'
import VueCamera from './VueCamera.vue'

Vue.component('camera', VueCamera);

new Vue({
	el: '#app',
	template: '<App/>',
	components: {
		App
	}
})

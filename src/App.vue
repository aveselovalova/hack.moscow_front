<template>
	<div id="app">
		<img src="./assets/logo.png">
		<camera></camera>
		<h1>{{ msg }}</h1>
		<mic></mic>
	</div>
</template>

<script>
import VueCamera from './VueCamera.vue'
import Mic from './Mic.vue'

export default {
	name: 'app',
	components: {
		VueCamera,
		Mic
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

h1, h2 {
	font-weight: normal;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	display: inline-block;
	margin: 0 10px;
}

a {
	color: #42b983;
}
</style>

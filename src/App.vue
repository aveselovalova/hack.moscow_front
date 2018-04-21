<template>
	<div id="app">
		<parallax>
			<div class="logo">
				<p class="magigan-text">Magigan</p>
			</div>
		</parallax>
			<camera ref="camera"></camera>
			<mic></mic>
	</div>
</template>

<script>
import SocketListener from './components/SocketListener.vue'
import VueSocketio from 'vue-socket.io';
import Parallax from 'vue-parallaxy'

export default {
	name: 'app',
	components: {
		SocketListener,
		Parallax
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>

<style>
.magigan-text {
	font-family: 'Stylish';
	margin: 0;
	font-size: 120px;
	color: #000;
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	margin: 0;
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

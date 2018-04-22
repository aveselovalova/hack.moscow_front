<template>
	<div id="app">
		<div id="start-layer"></div>
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
$(document).ready(function(){
   setTimeout(function(){
		$('#start-layer').fadeOut( "slow")
   },1000);
});
</script>

<style>
#start-layer {
	background: url('/src/assets/layer.png') no-repeat;
	position: absolute;
	width: 100%;
	height: 800px;
	top: 0;
	left: 0;
}
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
	position: relative;
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

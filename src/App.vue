<template>
	<div id="app">
		<div id="start-layer"></div>
		<div class="section">
			<div class="logo">
				<p class="magigan-text">Make your content magigan</p>
			</div>
			<div class="announce-row">
				<div class="announce-text">
					Make your content. Add an informativeness in your video. Spend time not on processing, but on creativity.<br>
					Usage examples: <br>Vlogger Andrei talking about his setbacks in the university.<br> 
Sasha talking about her corgies
				</div>
			</div>
			<div class="announce-row">
				<div class="announce-photo">
					<img src="/src/assets/corgi.png">
				</div>
				<div class="announce-photo">
					<img src="/src/assets/university.jpg">
				</div>
			</div>
		</div>
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
.announce-row {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 85%;
    margin: 0 auto;
    min-height: 150px;
}
.announce-photo {
	width: 90%;
    padding: 0 20px;
}
.announce-photo img {
    width: 575px;
}
.announce-text {
	font-family: 'Open Sans';
    font-size: 22px;
    padding: 20px;
}
.section {
	height: 830px;
}
#start-layer {
	background: url('/src/assets/layer.png') no-repeat;
	position: absolute;
	width: 100%;
	height: 850px;
	top: 0;
	left: 0;
	background-position: center;
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

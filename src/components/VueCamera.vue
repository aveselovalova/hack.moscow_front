<template>
	<div class="b-content__wrapper">
		<video ref="video" autoplay></video>
		<canvas class="b-content__canvas" ref="images_canvas" width="1280" height="500"></canvas>
	</div>
</template>

<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
<script>
import { EventBus } from './../event_bus.js'



export default {
	data() {
		return {
		}
	},
	mounted()
	{		
		EventBus.$on('get_image', object => {
			this.drawImage(object.data)
		})	

		navigator.mediaDevices.enumerateDevices().then( devices =>
		{
			devices= devices.filter( v => (v.kind=="videoinput"));
			console.log("Found "+devices.length +" video devices");
			let lastDevice= devices[devices.length-1];
			devices= devices.filter( v => (v.label.indexOf("back")>0));
			let device= null;
			if( devices.length > 0 )
			{
				console.log("Taking a 'back' camera");
				device= devices[devices.length-1];
			}
			else
			{
				console.log("Taking last camera");
				device= lastDevice;
			}
				
			if( !device )
			{
				console.log("No devices!");
				return;
			}
			let constraints =
			{
				audio: false, 
				video: {
					deviceId: { ideal: device.deviceId },
					width: { ideal: window.innerWidth },
					height: { ideal: window.innerHeight }
				}
			};
			navigator.mediaDevices.getUserMedia(constraints)
			.then( stream =>
			{
				if( !this.$refs.video.srcObject	) {
					this.$refs.video.src = URL.createObjectURL(stream);
				} else {
					this.$refs.video.srcObject = stream;
				}
				console.log("DONE");
			})
			.catch( err =>
			{
				console.log(err.name + ": " + err.message);
			});	
		})
		.catch( err =>
		{
			console.log(err.name + ": " + err.message);
		});
		//this.drawImage('http://centr-sobak.ru/image/data/porodi/velsh-korgi.png')
	},
	methods: {
		drawImage: function(src) {
			let canvas = this.$refs.images_canvas;
			let ctx = canvas.getContext('2d');
			let image = new Image();
			image.onload = function() {
	        	ctx.drawImage(image, 0, 0);
	      	};
			image.src = src;

			let time = 3000;
			setTimeout(function(){
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}, 3000);
		},
		clearCanvas: function(canvas, ctx, time) {
			console.log('clear')
			
		},
		getPosition: function(src) {}
	}

}
</script>

<style lang="css">
	.b-content__wrapper {
		width: 1280px;
		margin: 0 auto;
		position: relative;
	}
	.b-content__canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
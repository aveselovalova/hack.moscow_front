<template>
	<div class="b-content__wrapper">
		<video ref="video" autoplay></video>
		<canvas class="b-content__canvas" ref="images_canvas" width="1280" height="500"></canvas>
	</div>
</template>

<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
<script>
import { EventBus } from './event_bus.js'

EventBus.$on('get_image', data => {
	console.log("ITS FUCKING WORK!!!!!")
})
export default {
	data() {
		return {
			src: vmA
		}
	},
	mounted()
	{		
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
		console.log(this.src)
		this.drawImage('https://images.wagwalkingweb.com/media/breed/pembroke-welsh-corgi/appearance/pembroke-welsh-corgi.png?auto=compress&fit=max')
	},
	methods: {
		drawImage: function(src) {
			let ctx = this.$refs.images_canvas.getContext('2d');
			let image = new Image();
			image.src = src;
			console.log(image)
			ctx.drawImage(image,0,0);
		}
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
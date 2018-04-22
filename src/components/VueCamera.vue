<template>
	<div class="b-content__wrapper">
		<video ref="video" autoplay></video>
		<canvas class="b-content__canvas" ref="images_canvas" width="1280" height="720">
			<img ref="magicImage1" src="">
			<img ref="magicImage2" src="">
			<img ref="magicImage3" src="">
			<img ref="magicImage4" src="">
		</canvas>
	</div>
</template>

<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
<script>
import { EventBus } from './../event_bus.js'

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
 }

export default {
	data() {
		return {
			nowWillUpdateThisImage: 1
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
	},
	methods: {
		drawImage: function(src) {
			let videoWidth = 1280
			let videoHeight = 720
			let blockHeight = 350
			let blockWidth = 350
			//let blockHeight = videoHeight * 0.5
			//let blockWidth = videoWidth * 0.4

			let currentBlockStartX = 0
			let currentBlockStartY = 0

			let canvas = this.$refs.images_canvas;
			let ctx = canvas.getContext('2d');
			let image = null
			let toRight = false
			switch (this.nowWillUpdateThisImage) {
				case 1:
					image = this.$refs.magicImage1;
					currentBlockStartX = 0
					currentBlockStartY = 0
					this.nowWillUpdateThisImage = 2;
					break;
				case 2:
					toRight = true
					image = this.$refs.magicImage2;
					currentBlockStartX = videoWidth - blockWidth
					currentBlockStartY = 0
					this.nowWillUpdateThisImage = 1;
					break;
			}
			image.onload = function() {
				let imageHeight = this.height
				let imageWidth = this.width
				let widthAndHeight = calculateAspectRatioFit(imageWidth, imageHeight, blockWidth, blockHeight)
	            if(toRight) {
	            	currentBlockStartX = videoWidth - widthAndHeight.width;
	            }
				ctx.clearRect(currentBlockStartX, currentBlockStartY, videoWidth*0.7, videoHeight*0.7);
				ctx.drawImage(image, currentBlockStartX, currentBlockStartY, widthAndHeight.width, widthAndHeight.height);
			};
			image.src = src;
		},
		clearCanvas: function(canvas, ctx, time) {
			console.log('clear')	
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
	.magic-image {
		border: 1px solid red;
	}
</style>
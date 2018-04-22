<template>
	<div class="b-content__wrapper">
		<video class='camera' ref="video" autoplay></video>
		<canvas class="b-content__canvas" id="canvas" ref="images_canvas" width="1100" height="620">
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
		});
		EventBus.$on('show_rain', object => {
			this.showRain()
		});

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
			let videoWidth = 1100
			let videoHeight = 620
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
				if(currentBlockStartX > 750) {
					currentBlockStartX = 750;
				}
				ctx.clearRect(currentBlockStartX, currentBlockStartY, videoWidth*0.7, videoHeight*0.7);
				ctx.drawImage(image, currentBlockStartX, currentBlockStartY, widthAndHeight.width, widthAndHeight.height);
			};
			image.src = src;
		},
		clearCanvas: function(canvas, ctx, time) {
			console.log('clear')	
		},
		showRain: function() {
			var canvas = $('#canvas')[0];
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			if(canvas.getContext) {
				var ctx = canvas.getContext('2d');
				var w = canvas.width;
				var h = canvas.height;
				ctx.strokeStyle = 'rgba(174,194,224,0.7)';
				ctx.lineWidth = 1;
				ctx.lineCap = 'round';
				
				
				var init = [];
				var maxParts = 1000;
				for(var a = 0; a < maxParts; a++) {
					init.push({
						x: Math.random() * w,
						y: Math.random() * h,
						l: Math.random() * 1,
						xs: -4 + Math.random() * 4 + 2,
						ys: Math.random() * 10 + 10
					})
				}
				
				var particles = [];
				for(var b = 0; b < maxParts; b++) {
					particles[b] = init[b];
				}
				
				function draw() {
					ctx.clearRect(0, 0, w, h);
					for(var c = 0; c < particles.length; c++) {
						var p = particles[c];
						ctx.beginPath();
						ctx.moveTo(p.x, p.y);
						ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
						ctx.stroke();
					}
					move();
				}
				
				function move() {
					for(var b = 0; b < particles.length; b++) {
						var p = particles[b];
						p.x += p.xs;
						p.y += p.ys;
						if(p.x > w || p.y > h) {
							p.x = Math.random() * w;
							p.y = -20;
						}
					}
				}
				let rainInterval = setInterval(draw, 30);
				setTimeout(function() {
					clearInterval(rainInterval);
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					canvas.width = 1100;
					canvas.height = 620;
				},2000);	
			}
		}
	}

}
</script>

<style lang="css">
	.b-content__wrapper {
		width: 1100px;
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
	.camera {
		height: 620px
	}
</style>
<template>
	<div class="wrapper">
		<video id="video" autoplay></video>
		<canvas id="images_canvas" width="1200" height="500"></canvas>
	</div>
</template>
<style lang="css">
	.wrapper {
		width: 1200px;
		margin: 0 auto;
		position: relative;
	}
	#images_canvas {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
<script src="https://webrtc.github.io/adapter/adapter-latest.js"></script>
<script>
export default {
	data()
	{
		return {};
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
			var video = document.getElementById('video');
			navigator.mediaDevices.getUserMedia(constraints)
			.then( stream =>
			{
				if( !video.srcObject	)
				video.src = URL.createObjectURL(stream);
				else
				video.srcObject = stream;
				//info.innerHTML+= "<pre>DONE</pre>";
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
		this.drawImage('https://images.wagwalkingweb.com/media/breed/pembroke-welsh-corgi/appearance/pembroke-welsh-corgi.png?auto=compress&fit=max')
	},
	methods: {
		drawImage: function(src) {
			let canvas = document.getElementById('images_canvas');
			let ctx = canvas.getContext('2d');
			let image = new Image();
			image.src = src;
			console.log(image)
			ctx.drawImage(image,0,0);
		}
	}

}
</script>
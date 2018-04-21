<template>
	<div>
		<div class="buttons">
			<button id="start_button" @click="startButton">Start</button>
			<button id="stop_button" @click="stopButton">Stop</button>
		</div>
		<div id="results">
			<span id="final_span" class="final"></span>
			<span id="interim_span" class="interim"></span>
		</div>
	    <socketListener :Query="query"></socketListener>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				test: recognition.lang,
				query: '',
				interval: ''
			}
		},
		methods: {
			startButton: function() {
				final_transcript = '';
				recognition.start();
				final_span.innerHTML = '';
				interim_span.innerHTML = '';
				this.timer();
			},
			stopButton: function() {
				recognition.stop();
				clearInterval(this.interval);
			},
			func: function() {
				this.query = interim_span.innerHTML; 
				console.log(this.query)
				//console.log(final_span.innerHTML);
			},
			timer: function() {
				this.interval = setInterval(this.func, 1000)
			}
		}
	}

	var final_transcript = '';
	if ('webkitSpeechRecognition' in window) {
		var recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;

		recognition.onend = function() {
			if (!final_transcript) {
				return;
			}
			if (window.getSelection) {
				window.getSelection().removeAllRanges();
				var range = document.createRange();
				range.selectNode(document.getElementById('final_span'));
				window.getSelection().addRange(range);
			}
		};

		recognition.onresult = function(event) {
			var interim_transcript = '';
			for (var i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					final_transcript = event.results[i][0].transcript;
				} else {
					interim_transcript += event.results[i][0].transcript;
				}
			}
			final_span.innerHTML = final_transcript;
			interim_span.innerHTML = interim_transcript;
		};
	}
</script>
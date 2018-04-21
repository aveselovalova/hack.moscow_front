<template>
	<div>
		<div class="result-text">
			<span id="final_span" class="final"></span>
			<span id="interim_span" class="interim"></span>
		</div>
		<magicBtn></magicBtn>
		<socketListener></socketListener>
	</div>
</template>

<script>
import { EventBus } from './../event_bus.js'

	export default {
		data() {
			return {
				query: '',
				interval: ''
			}
		},
		mounted() {
			EventBus.$on('start', state => {
				if(state) {
					this.startButton();
				} else {
					this.stopButton();
				}
			});
		},
		methods: {
			sendQuery: function() {
				var currentText = ""
				currentText = interim_span.innerHTML
				if(currentText && currentText !== 'null' && currentText !== 'undefined') {
					EventBus.$emit('send_query', currentText)
				}
			},
			runWithTimer: function() {
				this.interval = setInterval(this.sendQuery, 700)
			},
			startButton: function() {
				final_transcript = '';
				recognition.start();
				final_span.innerHTML = '';
				interim_span.innerHTML = '';
				this.runWithTimer();
			},
			stopButton: function() {
				recognition.stop();
				clearInterval(this.interval);
			}
		}
	}

	var final_transcript = '';
	if ('webkitSpeechRecognition' in window) {
		var recognition = new webkitSpeechRecognition();
		recognition.lang = 'ru-RU';
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
					interim_transcript = event.results[i][0].transcript;
				}
			}
			final_span.innerHTML = final_transcript;
			interim_span.innerHTML = interim_transcript;
		};
	}
</script>

<style lang="css">
	.result-text {
		height: 30px;
	}
</style>
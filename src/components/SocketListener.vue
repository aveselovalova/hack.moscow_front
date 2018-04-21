<template>
	<div>
		<p v-if="isConnected">We're connected to the server!</p>
		<p>Message from server: "{{socketMessage}}"</p>
		<button @click="sendRequestToServer">SendData</button>
	</div>
</template>

<script>
import { EventBus } from './../event_bus.js'

export default {
	data() {
		return {
			isConnected: false,
			socketMessage: '',
		}
	},

	mounted() {
		EventBus.$on('send_query', queryString => {
      if(queryString && queryString !== 'null' && queryString !== 'undefined') {
          this.sendRequestToServer(queryString);
      }
		})	
	},
	
	sockets: {
		connect() {
			this.isConnected = true;
		},

		disconnect() {
			this.isConnected = false;
		},
		imageResponse(data) {
			this.socketMessage = data
			if(data != '') {
				EventBus.$emit('get_image', data)
			}
		}
	},

	methods: {
		sendRequestToServer(text) {
			this.$socket.emit('getImage', text)
		},
	}
}
</script>
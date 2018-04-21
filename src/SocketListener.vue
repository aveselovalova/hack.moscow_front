<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <button @click="sendRequestToServer()">SendData</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isConnected: false,
      socketMessage: ''
    }
  },

  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
    },

    disconnect() {
      this.isConnected = false;
    },

    // Fired when the server sends something on the "messageChannel" channel.
    imageResponse(data) {
      this.socketMessage = data
      console.log(data)
    }
  },

  methods: {
    sendRequestToServer(text) {
      this.$socket.emit('getImage', "bmw x2")
    }
  }
}
</script>
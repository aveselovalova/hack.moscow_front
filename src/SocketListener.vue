<template>
  <div>
    <p v-if="isConnected">We're connected to the server!</p>
    <p>Message from server: "{{socketMessage}}"</p>
    <button @click="sendRequestToServer">SendData</button>
  </div>
</template>

<script>
import VueCamera from './components/VueCamera.vue'
import { EventBus } from './event_bus.js'

export default {
  components: {
    VueCamera    
  },
  data() {
    return {
      isConnected: false,
      socketMessage: '',
      interval: ''
    }
  },

  props: {
    Query: {
       type: String,
    }
  },

 // computed: {
 //    // геттер вычисляемого значения
 //    ttt: {
 //      get: function () {
 //        return this.Test
 //      },
 //      // сеттер:
 //      set: function (val) {
 //        this.Test = val
 //        console.log(val)
 //      }
 //    }
 //  },
  mounted() {
   // this.timer();
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
      //VueCamera.$emit('smth', {item:this.socketMessage})
      EventBus.$emit('get_image', data)
      VueCamera.drawImage(data)
    }
  },

  methods: {
    sendRequestToServer(text) {
      console.log('TEST - ', this.Query)
      console.log(VueCamera.$refs)

    // if (this.Query != '') {
       this.$socket.emit('getImage', 'корги')
    },
    func: function() {
        
      console.log('TEST - ', this.Query)
     if (this.Query != '') {
       this.$socket.emit('getImage', this.Query)
      }
    },
    timer: function() {
      this.interval = setInterval(this.func, 1000)
    }
  }
}
</script>
import Vue from 'vue'
import App from './App.vue'
import SocketListener from './components/SocketListener.vue'
import VueCamera from './components/VueCamera.vue'
import Mic from './components/Mic.vue'

import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

Vue.component('camera', VueCamera);
Vue.component('mic', Mic)
Vue.component('socketListener', SocketListener)

export const SocketInstance = socketio('http://localhost:5000');

Vue.use(VueSocketIO, SocketInstance)

new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
})
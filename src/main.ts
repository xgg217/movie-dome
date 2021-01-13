import { createApp } from 'vue'
import router from "./router";
import App from './App.vue'
import "./assets/styles/reset.css"
import "./assets/styles/vant.css"

createApp(App).use(router).mount('#app')

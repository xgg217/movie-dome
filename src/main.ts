import { createApp } from 'vue'
import router from "./router";
import App from './App.vue'
import "./assets/styles/reset.css"
// import 'vant/lib/index.css';

createApp(App).use(router).mount('#app')
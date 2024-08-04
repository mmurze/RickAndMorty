import { createApp } from 'vue'
import App from './App.vue'
import './global.css'
import i18n from '../i18n.js'
import router from "./plugins/router.js";

import axios from "axios";
axios.defaults.baseURL = "https://rickandmortyapi.com/api"

createApp(App).use(i18n).use(router).mount('#app')

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import VueMapboxTs from "vue-mapbox-ts";

const app = createApp(App)
app.use(store).use(router).use(VueMapboxTs)
app.mount('#app')
export default app

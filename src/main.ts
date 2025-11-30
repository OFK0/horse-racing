import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.scss';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import i18nConfig from '@/i18n/config';

const app = createApp(App);

app.use(createPinia());

app.use(createI18n(i18nConfig));

app.mount('#app');

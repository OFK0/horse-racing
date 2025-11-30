import { describe, it, expect, beforeEach } from 'vitest';

import { mount } from '@vue/test-utils';
import App from '../App.vue';
import { createPinia, setActivePinia } from 'pinia';
import i18nConfig from '@/i18n/config';
import { createI18n } from 'vue-i18n';

describe('App', () => {
  let pinia: ReturnType<typeof createPinia>;
  let i18n: ReturnType<typeof createI18n>;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    // Create i18n with the actual messages and explicit locale
    const { messages, fallbackLocale } = i18nConfig;
    i18n = createI18n({
      locale: 'en',
      fallbackLocale: fallbackLocale || 'en',
      messages,
      legacy: false,
    });
  });

  it('mounts renders properly', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [pinia, i18n],
      },
    });
    expect(wrapper.find('.app-root')).toBeTruthy();
  });
});

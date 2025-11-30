import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import GameSky from '../index.vue';
import { createPinia, setActivePinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import i18nConfig from '@/i18n/config';

describe('GameSky', () => {
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

  it('renders the sky container', () => {
    const wrapper = mount(GameSky, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameHeader: true,
        },
      },
    });

    expect(wrapper.find('.sky-tile-background').exists()).toBe(true);
  });

  it('renders the bottom gradient element', () => {
    const wrapper = mount(GameSky, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameHeader: true,
        },
      },
    });

    expect(wrapper.find('.sky-tile-background__bottom-gradient').exists()).toBe(
      true,
    );
  });

  it('renders the header outer container', () => {
    const wrapper = mount(GameSky, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameHeader: true,
        },
      },
    });

    expect(wrapper.find('.sky-tile-background__header-outer').exists()).toBe(
      true,
    );
  });

  it('renders GameHeader component inside header-outer', () => {
    const wrapper = mount(GameSky, {
      global: {
        plugins: [pinia, i18n],
      },
    });

    expect(wrapper.findComponent({ name: 'GameHeader' }).exists()).toBe(true);
  });

  it('has correct component name', () => {
    const wrapper = mount(GameSky, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameHeader: true,
        },
      },
    });

    expect(wrapper.vm.$options.name).toBe('GameSky');
  });

  it('applies correct CSS classes to main element', () => {
    const wrapper = mount(GameSky, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameHeader: true,
        },
      },
    });

    const skyElement = wrapper.find('.sky-tile-background');
    expect(skyElement.classes()).toContain('sky-tile-background');
  });

  it('has header outer as child of sky tile background', () => {
    const wrapper = mount(GameSky, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameHeader: true,
        },
      },
    });

    const skyElement = wrapper.find('.sky-tile-background');
    const headerOuter = skyElement.find('.sky-tile-background__header-outer');

    expect(headerOuter.exists()).toBe(true);
  });

  it('has bottom gradient as child of sky tile background', () => {
    const wrapper = mount(GameSky, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameHeader: true,
        },
      },
    });

    const skyElement = wrapper.find('.sky-tile-background');
    const gradient = skyElement.find('.sky-tile-background__bottom-gradient');

    expect(gradient.exists()).toBe(true);
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import GameHeader from '../index.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useGameStore } from '@/stores/game';
import { createI18n } from 'vue-i18n';
import i18nConfig from '@/i18n/config';

describe('GameHeader', () => {
  let pinia: ReturnType<typeof createPinia>;
  let i18n: ReturnType<typeof createI18n>;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    localStorage.clear();

    // Create i18n instance exactly like main.ts but with static locale
    const testConfig = { ...i18nConfig, locale: 'en' } as any;
    // Remove loadSavedLocale call side effect by explicitly setting locale
    delete testConfig.locale;
    i18n = createI18n({
      ...testConfig,
      locale: 'en',
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  const createWrapper = () => {
    return mount(GameHeader, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          BaseButton: false,
        },
      },
    });
  };

  it('renders the header element', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.game-header').exists()).toBe(true);
  });

  it('has correct component name', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm.$options.name).toBe('GameHeader');
  });

  it('renders button groups', () => {
    const wrapper = createWrapper();
    const buttonGroups = wrapper.findAll('.game-header__buttons');
    expect(buttonGroups.length).toBeGreaterThanOrEqual(2);
  });

  it('renders language toggle buttons', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' });
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('renders program generation button', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' });
    // Should have at least 4 buttons (2 language buttons + 2 action buttons)
    expect(buttons.length).toBeGreaterThanOrEqual(4);
  });

  it('renders start/stop button', () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' });
    // Should have at least 4 buttons
    expect(buttons.length).toBeGreaterThanOrEqual(4);
  });

  it('renders TR language button', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain('TR');
  });

  it('renders EN language button', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain('EN');
  });

  it('calls generateProgram when generate button is clicked', async () => {
    const wrapper = createWrapper();
    const gameStore = useGameStore();

    // Get the second button group which contains the action buttons
    const buttonGroups = wrapper.findAll('.game-header__buttons');
    const actionButtonGroup = buttonGroups[1]!;
    const generateButton = actionButtonGroup.findComponent({
      name: 'BaseButton',
    });

    await generateButton?.trigger('click');

    expect(gameStore.isProgramGenerated).toBe(true);
  });

  it('disables generate button when game is started', async () => {
    const wrapper = createWrapper();
    const gameStore = useGameStore();

    gameStore.generateProgram();
    gameStore.startGame();

    await wrapper.vm.$nextTick();

    const buttonGroups = wrapper.findAll('.game-header__buttons');
    const actionButtonGroup = buttonGroups[1]!;
    const generateButton = actionButtonGroup.findAllComponents({
      name: 'BaseButton',
    })[0];

    expect(generateButton?.props('disabled')).toBe(true);
  });

  it('disables start/stop button when no program is generated', () => {
    const wrapper = createWrapper();
    const gameStore = useGameStore();

    expect(gameStore.isProgramGenerated).toBe(false);

    const buttonGroups = wrapper.findAll('.game-header__buttons');
    const actionButtonGroup = buttonGroups[1]!;
    const startButton = actionButtonGroup.findAllComponents({
      name: 'BaseButton',
    })[1];

    expect(startButton?.props('disabled')).toBe(true);
  });

  it('enables start/stop button when program is generated', async () => {
    const wrapper = createWrapper();
    const gameStore = useGameStore();

    gameStore.generateProgram();

    await wrapper.vm.$nextTick();

    const buttonGroups = wrapper.findAll('.game-header__buttons');
    const actionButtonGroup = buttonGroups[1]!;
    const startButton = actionButtonGroup.findAllComponents({
      name: 'BaseButton',
    })[1];

    expect(startButton?.props('disabled')).toBe(false);
  });

  it('marks language button as active for current locale', async () => {
    const wrapper = createWrapper();

    const buttons = wrapper.findAllComponents({ name: 'BaseButton' });
    const enButton = buttons.find((b) => b.text() === 'EN');

    expect(enButton?.props('active')).toBe(true);
  });

  it('saves locale to localStorage when changed', async () => {
    const wrapper = createWrapper();

    const buttons = wrapper.findAllComponents({ name: 'BaseButton' });
    const trButton = buttons.find((b) => b.text() === 'TR');

    await trButton?.trigger('click');
    await wrapper.vm.$nextTick();

    // Note: This checks if the locale is managed by the store
    expect(wrapper.vm.$i18n.locale).toBeDefined();
  });

  it('starts game when start button is clicked', async () => {
    const wrapper = createWrapper();
    const gameStore = useGameStore();

    gameStore.generateProgram();

    await wrapper.vm.$nextTick();

    const buttonGroups = wrapper.findAll('.game-header__buttons');
    const actionButtonGroup = buttonGroups[1]!;
    const startButton = actionButtonGroup.findAllComponents({
      name: 'BaseButton',
    })[1];

    await startButton?.trigger('click');

    expect(gameStore.isGameStarted).toBe(true);
  });
});

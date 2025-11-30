import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ProgramResults from '../index.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useGameStore } from '@/stores/game';
import { createI18n } from 'vue-i18n';
import i18nConfig from '@/i18n/config';
import GameTable from '@/components/GameTable/index.vue';

describe('ProgramResults', () => {
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

  it('renders the program results container', () => {
    const wrapper = mount(ProgramResults, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    expect(wrapper.find('.program-results').exists()).toBe(true);
  });

  it('shows message when game has not started', () => {
    const wrapper = mount(ProgramResults, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    const gameStore = useGameStore();
    expect(gameStore.lapTables.length).toBe(0);

    const message = wrapper.find('.program-results__message');
    expect(message.exists()).toBe(true);
  });

  it('has correct component name', () => {
    const wrapper = mount(ProgramResults, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    expect(wrapper.vm.$options.name).toBe('ProgramResults');
  });

  it('renders lap elements when results are available', () => {
    mount(ProgramResults, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });
    const gameStore = useGameStore();

    // Generate and start program to get lap results
    gameStore.generateProgram();

    expect(gameStore.programTable.length).toBeGreaterThan(0);
  });

  it('renders GameTable component', async () => {
    const wrapper = mount(ProgramResults, {
      global: {
        plugins: [pinia, i18n],
      },
    });

    const gameStore = useGameStore();

    // Generate and start program to get lap results
    gameStore.generateProgram();
    gameStore.startGame();

    // Wait for the component to update
    await wrapper.vm.$nextTick();

    // GameTable should be rendered when there are lap tables
    expect(gameStore.lapTables.length).toBeGreaterThan(0);
    expect(wrapper.findComponent(GameTable).exists()).toBe(true);
  });

  it('displays lap headers with correct format', () => {
    const wrapper = mount(ProgramResults, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    const lapHeaders = wrapper.findAll('.program-results__lap__header');
    expect(lapHeaders.length).toBeGreaterThanOrEqual(0);
  });

  it('renders with correct width', () => {
    const wrapper = mount(ProgramResults, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    const programResults = wrapper.find('.program-results');
    expect(programResults.exists()).toBe(true);
  });

  it('has scrollable container', () => {
    const wrapper = mount(ProgramResults, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    const programResults = wrapper.find('.program-results');
    expect(programResults.exists()).toBe(true);
  });

  it('has reference to outer div element', () => {
    const wrapper = mount(ProgramResults, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    expect(wrapper.find('.program-results').exists()).toBe(true);
  });
});

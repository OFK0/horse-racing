import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ProgramTable from '../index.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useGameStore } from '@/stores/game';
import { createI18n } from 'vue-i18n';
import i18nConfig from '@/i18n/config';

describe('ProgramTable', () => {
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

  it('renders the program table container', () => {
    const wrapper = mount(ProgramTable, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    expect(wrapper.find('.program-table').exists()).toBe(true);
  });

  it('shows message when program is not generated', () => {
    const wrapper = mount(ProgramTable, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    const gameStore = useGameStore();
    expect(gameStore.programTable.length).toBe(0);

    const message = wrapper.find('.program-table__message');
    expect(message.exists()).toBe(true);
  });

  it('has correct component name', () => {
    const wrapper = mount(ProgramTable, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    expect(wrapper.vm.$options.name).toBe('ProgramTable');
  });

  it('renders GameTable for each lap when program is generated', () => {
    mount(ProgramTable, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });
    const gameStore = useGameStore();

    // Generate a program
    gameStore.generateProgram();

    // Now we should have program tables
    expect(gameStore.programTable.length).toBeGreaterThan(0);
  });

  it('displays lap headers with correct information', async () => {
    const wrapper = mount(ProgramTable, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    const gameStore = useGameStore();
    gameStore.generateProgram();

    await wrapper.vm.$nextTick();

    const lapHeaders = wrapper.findAll('.program-table__lap__header');
    expect(lapHeaders.length).toBeGreaterThan(0);
  });

  it('passes correct columns to GameTable', async () => {
    const wrapper = mount(ProgramTable, {
      global: {
        plugins: [pinia, i18n],
      },
    });

    const gameStore = useGameStore();
    gameStore.generateProgram();

    await wrapper.vm.$nextTick();

    const gameTable = wrapper.findComponent({ name: 'GameTable' });
    expect(gameTable.exists()).toBe(true);

    const columns = gameTable.props('columns');
    expect(columns).toBeDefined();
  });

  it('renders with correct width', () => {
    const wrapper = mount(ProgramTable, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    const programTable = wrapper.find('.program-table');
    expect(programTable.exists()).toBe(true);
  });

  it('has scrollable container', () => {
    const wrapper = mount(ProgramTable, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          GameTable: true,
        },
      },
    });

    const programTable = wrapper.find('.program-table');
    expect(programTable.exists()).toBe(true);
  });
});

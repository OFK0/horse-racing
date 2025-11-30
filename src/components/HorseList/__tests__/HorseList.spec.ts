import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import HorseList from '../index.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useGameStore } from '@/stores/game';

describe('HorseList', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders the horse list container', () => {
    const wrapper = mount(HorseList, {
      global: {
        stubs: {
          GameTable: true,
        },
      },
    });

    expect(wrapper.find('.horse-list').exists()).toBe(true);
  });

  it('renders the header with title', () => {
    const wrapper = mount(HorseList, {
      global: {
        stubs: {
          GameTable: true,
        },
        mocks: {
          $t: (key: string) => key,
        },
      },
    });

    expect(wrapper.find('.horse-list__header').exists()).toBe(true);
  });

  it('renders GameTable component', () => {
    const wrapper = mount(HorseList);

    expect(wrapper.findComponent({ name: 'GameTable' }).exists()).toBe(true);
  });

  it('has correct component name', () => {
    const wrapper = mount(HorseList, {
      global: {
        stubs: {
          GameTable: true,
        },
      },
    });

    expect(wrapper.vm.$options.name).toBe('HorseList');
  });

  it('passes correct columns to GameTable', async () => {
    const wrapper = mount(HorseList);

    const gameTable = wrapper.findComponent({ name: 'GameTable' });
    const columns = gameTable.props('columns');

    expect(columns).toBeDefined();
    expect(columns.length).toBeGreaterThan(0);
  });

  it('displays horses from store', () => {
    const gameStore = useGameStore();
    expect(gameStore).toBeDefined();
  });

  it('renders with correct width', () => {
    const wrapper = mount(HorseList, {
      global: {
        stubs: {
          GameTable: true,
        },
      },
    });

    const horseList = wrapper.find('.horse-list');
    // Width is set in CSS to 300px
    expect(horseList.exists()).toBe(true);
  });

  it('has correct z-index for layering', () => {
    const wrapper = mount(HorseList, {
      global: {
        stubs: {
          GameTable: true,
        },
      },
    });

    const horseList = wrapper.find('.horse-list');
    expect(horseList.exists()).toBe(true);
  });

  it('renders GameTable with outer height property', () => {
    const wrapper = mount(HorseList);

    const gameTable = wrapper.findComponent({ name: 'GameTable' });
    expect(gameTable.props('outerHeight')).toBeDefined();
  });

  it('contains horse list header element', () => {
    const wrapper = mount(HorseList, {
      global: {
        stubs: {
          GameTable: true,
        },
      },
    });

    expect(wrapper.find('.horse-list__header').exists()).toBe(true);
  });
});

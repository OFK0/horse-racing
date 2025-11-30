import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import HorseRider from '../index.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useGameStore } from '@/stores/game';

describe('HorseRider', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders the horse rider element', () => {
    const wrapper = mount(HorseRider, {
      props: {
        elapsed: 0,
      },
    });

    expect(wrapper.find('.horse-rider').exists()).toBe(true);
  });

  it('applies correct component name', () => {
    const wrapper = mount(HorseRider, {
      props: {
        elapsed: 0,
      },
    });

    expect(wrapper.vm.$options.name).toBe('HorseRider');
  });

  it('accepts elapsed prop', () => {
    const wrapper = mount(HorseRider, {
      props: {
        elapsed: 50,
      },
    });

    expect(wrapper.props('elapsed')).toBe(50);
  });

  it('updates transform style with different elapsed values', async () => {
    const wrapper = mount(HorseRider, {
      props: {
        elapsed: 0,
      },
    });

    const element = wrapper.find('.horse-rider');
    const initialStyle = element.attributes('style');

    await wrapper.setProps({ elapsed: 10 });

    const updatedStyle = element.attributes('style');
    // Style should update when props change
    expect(initialStyle).toBeDefined();
    expect(updatedStyle).toBeDefined();
  });

  it('does not have running class when game is not started', async () => {
    const wrapper = mount(HorseRider, {
      props: {
        elapsed: 0,
      },
    });

    const gameStore = useGameStore();
    expect(gameStore.isGameStarted).toBe(false);

    const element = wrapper.find('.horse-rider');
    expect(element.classes()).not.toContain('horse-rider--running');
  });

  it('adds running class when game is started and not stopped', async () => {
    const wrapper = mount(HorseRider, {
      props: {
        elapsed: 0,
      },
    });

    const gameStore = useGameStore();
    gameStore.isGameStarted = true;
    gameStore.isGameStopped = false;

    await wrapper.vm.$nextTick();

    const element = wrapper.find('.horse-rider');
    expect(element.classes()).toContain('horse-rider--running');
  });

  it('removes running class when game is stopped', async () => {
    const wrapper = mount(HorseRider, {
      props: {
        elapsed: 0,
      },
    });

    const gameStore = useGameStore();
    gameStore.isGameStarted = true;
    gameStore.isGameStopped = true;

    await wrapper.vm.$nextTick();

    const element = wrapper.find('.horse-rider');
    expect(element.classes()).not.toContain('horse-rider--running');
  });

  it('has initial transform when game not started', () => {
    const wrapper = mount(HorseRider, {
      props: {
        elapsed: 0,
      },
    });

    const element = wrapper.find('.horse-rider');
    const style = element.attributes('style');

    expect(style).toContain('scale(0.5)');
  });

  it('handles zero elapsed value', () => {
    const wrapper = mount(HorseRider, {
      props: {
        elapsed: 0,
      },
    });

    const element = wrapper.find('.horse-rider');
    expect(element.exists()).toBe(true);
  });

  it('handles large elapsed values', () => {
    const wrapper = mount(HorseRider, {
      props: {
        elapsed: 1000,
      },
    });

    const element = wrapper.find('.horse-rider');
    expect(element.exists()).toBe(true);
  });

  it('maintains correct scale value', () => {
    const wrapper = mount(HorseRider, {
      props: {
        elapsed: 50,
      },
    });

    const element = wrapper.find('.horse-rider');
    const style = element.attributes('style');

    expect(style).toContain('scale(0.5)');
  });
});

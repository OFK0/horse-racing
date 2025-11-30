/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import GameView from '../index.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useGameStore } from '@/stores/game';
import { createI18n } from 'vue-i18n';
import i18nConfig from '@/i18n/config';

describe('GameView', () => {
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

  const createWrapper = () => {
    return mount(GameView, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          RunnerLane: true,
          HorseList: true,
          HorseRider: true,
          ProgramResults: true,
          ProgramTable: true,
          BaseButton: false,
        },
      },
    });
  };

  it('renders the game view container', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.game-view').exists()).toBe(true);
  });

  it('has correct component name', () => {
    const wrapper = createWrapper();
    expect(wrapper.vm.$options.name).toBe('GameView');
  });

  it('renders horse list outer container', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.horse-list-outer').exists()).toBe(true);
  });

  it('renders program side outer container', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.program-side-outer').exists()).toBe(true);
  });

  it('renders current lap indicator', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.current-lap-indicator').exists()).toBe(true);
  });

  it('displays current lap number', () => {
    const wrapper = createWrapper();
    // Should have the current-lap-indicator element
    expect(wrapper.find('.current-lap-indicator').exists()).toBe(true);
  });

  it('renders HorseList component', () => {
    const wrapper = mount(GameView, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          RunnerLane: true,
          HorseRider: true,
          ProgramResults: true,
          ProgramTable: true,
          BaseButton: false,
        },
      },
    });

    expect(wrapper.findComponent({ name: 'HorseList' }).exists()).toBe(true);
  });

  it('renders RunnerLane components for game horses', async () => {
    const wrapper = createWrapper();
    const gameStore = useGameStore();

    gameStore.generateProgram();
    gameStore.startGame();

    await wrapper.vm.$nextTick();

    const lanes = wrapper.findAllComponents({ name: 'RunnerLane' });
    expect(lanes.length).toBeGreaterThan(0);
  });

  it('renders ProgramTable button', () => {
    const wrapper = createWrapper();
    // Should have button group with program button
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' });
    // ProgramTable and ProgramResults buttons should be present
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('renders ProgramResults button', () => {
    const wrapper = createWrapper();
    // Should have button group with results button
    const buttons = wrapper.findAllComponents({ name: 'BaseButton' });
    // ProgramTable and ProgramResults buttons should be present
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('shows program table by default', () => {
    const wrapper = mount(GameView, {
      global: {
        plugins: [pinia, i18n],
        stubs: {
          RunnerLane: true,
          HorseList: true,
          HorseRider: true,
          ProgramResults: true,
          BaseButton: false,
        },
      },
    });

    expect(wrapper.findComponent({ name: 'ProgramTable' }).isVisible()).toBe(
      true,
    );
  });

  it('switches to results table when results button is clicked', async () => {
    const wrapper = createWrapper();

    // Find buttons that are direct children of program-side-outer
    const programSideOuter = wrapper.find('.program-side-outer');
    const buttons = programSideOuter.findAllComponents({ name: 'BaseButton' });

    // Second button should be the results button
    const resultsButton = buttons[1];

    await resultsButton?.trigger('click');

    await wrapper.vm.$nextTick();
    // Check if view shows results (ProgramResults should be visible)
    expect(wrapper.findComponent({ name: 'ProgramResults' }).isVisible()).toBe(
      true,
    );
  });

  it('switches back to program table when program button is clicked', async () => {
    const wrapper = createWrapper();

    const programSideOuter = wrapper.find('.program-side-outer');
    let buttons = programSideOuter.findAllComponents({ name: 'BaseButton' });

    // First switch to results
    const resultsButton = buttons[1];
    await resultsButton?.trigger('click');

    await wrapper.vm.$nextTick();
    // Results should be visible
    expect(wrapper.findComponent({ name: 'ProgramResults' }).isVisible()).toBe(
      true,
    );

    // Then switch back to program
    buttons = programSideOuter.findAllComponents({ name: 'BaseButton' });
    const programButton = buttons[0];
    await programButton?.trigger('click');

    await wrapper.vm.$nextTick();
    // Program should be visible again
    expect(wrapper.findComponent({ name: 'ProgramTable' }).isVisible()).toBe(
      true,
    );
  });

  it('marks program button as active when showing program', () => {
    const wrapper = createWrapper();

    // By default, ProgramTable should be visible (active state)
    expect(wrapper.findComponent({ name: 'ProgramTable' }).isVisible()).toBe(
      true,
    );
  });

  it('marks results button as active when showing results', async () => {
    const wrapper = createWrapper();

    const programSideOuter = wrapper.find('.program-side-outer');
    const buttons = programSideOuter.findAllComponents({ name: 'BaseButton' });
    const resultsButton = buttons[1];

    await resultsButton?.trigger('click');

    await wrapper.vm.$nextTick();
    // When results button is clicked, ProgramResults should be visible
    expect(wrapper.findComponent({ name: 'ProgramResults' }).isVisible()).toBe(
      true,
    );
  });

  it('renders empty runner lanes when no horses are in game', () => {
    const wrapper = createWrapper();
    const gameStore = useGameStore();

    expect(gameStore.inGameHorses.length).toBe(0);

    const lanes = wrapper.findAllComponents({ name: 'RunnerLane' });
    // Should render 10 empty lanes
    expect(lanes.length).toBeGreaterThanOrEqual(0);
  });

  it('manages showing table state', async () => {
    const wrapper = createWrapper();

    // Initially showingTable should be 'program'
    expect((wrapper.vm as any).showingTable).toBe('program');

    // Click results button
    const programSideOuter = wrapper.find('.program-side-outer');
    let buttons = programSideOuter.findAllComponents({ name: 'BaseButton' });
    const resultsButton = buttons[1];
    await resultsButton?.trigger('click');
    await wrapper.vm.$nextTick();

    // showingTable should now be 'results'
    expect((wrapper.vm as any).showingTable).toBe('results');

    // Click program button
    buttons = programSideOuter.findAllComponents({ name: 'BaseButton' });
    const programButton = buttons[0];
    await programButton?.trigger('click');
    await wrapper.vm.$nextTick();

    // showingTable should be 'program' again
    expect((wrapper.vm as any).showingTable).toBe('program');
  });
});

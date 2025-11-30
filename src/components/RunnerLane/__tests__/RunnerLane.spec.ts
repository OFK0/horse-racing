import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import RunnerLane from '../index.vue';

describe('RunnerLane', () => {
  it('renders the component with correct structure', () => {
    const wrapper = mount(RunnerLane, {
      props: {
        number: 1,
        color: '#FF0000',
      },
    });

    expect(wrapper.find('.runner-lane').exists()).toBe(true);
    expect(wrapper.find('.runner-lane__num').exists()).toBe(true);
    expect(wrapper.find('.runner-lane__inner').exists()).toBe(true);
    expect(wrapper.find('.runner-lane__end').exists()).toBe(true);
  });

  it('displays the correct lane number', () => {
    const wrapper = mount(RunnerLane, {
      props: {
        number: 3,
        color: '#00FF00',
      },
    });

    expect(wrapper.find('.runner-lane__num').text()).toBe('3');
  });

  it('applies the correct color to the lane number element', () => {
    const wrapper = mount(RunnerLane, {
      props: {
        number: 1,
        color: 'blue',
      },
    });

    const numElement = wrapper.find('.runner-lane__num');
    expect(numElement.attributes('style')).toContain('background-color: blue');
  });

  it('renders slot content in the inner element', () => {
    const wrapper = mount(RunnerLane, {
      props: {
        number: 1,
        color: '#FF0000',
      },
      slots: {
        default: '<div class="test-content">Horse Rider</div>',
      },
    });

    expect(wrapper.find('.runner-lane__inner').html()).toContain('Horse Rider');
  });

  it('accepts different lane numbers', () => {
    const numbers = [1, 5, 10];

    numbers.forEach((num) => {
      const wrapper = mount(RunnerLane, {
        props: {
          number: num,
          color: '#FF0000',
        },
      });

      expect(wrapper.find('.runner-lane__num').text()).toBe(String(num));
    });
  });

  it('accepts different colors', () => {
    const colors = ['red', 'green', 'blue'];

    colors.forEach((color) => {
      const wrapper = mount(RunnerLane, {
        props: {
          number: 1,
          color,
        },
      });

      expect(wrapper.find('.runner-lane__num').attributes('style')).toContain(
        `background-color: ${color}`,
      );
    });
  });
});

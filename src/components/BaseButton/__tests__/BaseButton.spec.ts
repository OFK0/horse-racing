import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '../index.vue';

describe('BaseButton', () => {
  it('renders button with slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.text()).toBe('Click me');
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('applies default variant class', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Button',
      },
    });

    expect(wrapper.find('button').classes()).toContain('button--default');
  });

  it('applies primary variant class', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'primary',
      },
      slots: {
        default: 'Primary',
      },
    });

    expect(wrapper.find('button').classes()).toContain('button--primary');
  });

  it('applies secondary variant class', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'secondary',
      },
      slots: {
        default: 'Secondary',
      },
    });

    expect(wrapper.find('button').classes()).toContain('button--secondary');
  });

  it('applies disabled class when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Disabled',
      },
    });

    expect(wrapper.find('button').classes()).toContain('button--disabled');
  });

  it('applies block class when block prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        block: true,
      },
      slots: {
        default: 'Block Button',
      },
    });

    expect(wrapper.find('button').classes()).toContain('button--block');
  });

  it('applies active class when active prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        active: true,
      },
      slots: {
        default: 'Active',
      },
    });

    expect(wrapper.find('button').classes()).toContain('button--active');
  });

  it('emits click event when button is clicked', async () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Clickable',
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('button has disabled class when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Disabled',
      },
    });

    expect(wrapper.find('button').classes()).toContain('button--disabled');
  });

  it('applies multiple classes together', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'primary',
        disabled: true,
        block: true,
        active: true,
      },
      slots: {
        default: 'Multi',
      },
    });

    const classes = wrapper.find('button').classes();
    expect(classes).toContain('button--primary');
    expect(classes).toContain('button--disabled');
    expect(classes).toContain('button--block');
    expect(classes).toContain('button--active');
  });
});

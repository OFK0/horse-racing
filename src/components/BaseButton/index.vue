<template>
  <button :class="classes" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export type ButtonVariant = 'primary' | 'secondary' | 'default';

export interface Props {
  variant?: ButtonVariant;
  disabled?: boolean;
  block?: boolean;
  active?: boolean;
}

defineOptions({
  name: 'BaseButton',
});

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  disabled: false,
  active: false,
});

const classes = computed(() => ({
  button: true,
  'button--disabled': props.disabled,
  'button--block': props.block,
  'button--active': props.active,
  [`button--${props.variant}`]: true,
}));
</script>

<style lang="scss" scoped>
.button {
  $this: &;
  font-family: var(--base-font-family);
  background-color: white;
  padding: 10px 20px;
  border: 0;
  font-size: 20px;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
  border-top: 2px solid var(--color-light-light);
  border-left: 2px solid var(--color-light-light);
  border-bottom: 2px solid var(--color-light-dark);
  border-right: 2px solid var(--color-light-dark);
  transition: border 0.1s ease-in-out;
  --button-bg-color: white;

  &:active,
  &--active {
    text-shadow: -2px -2px 0 rgba(0, 0, 0, 0.15);
    border-top: 2px solid var(--color-light-dark);
    border-left: 2px solid var(--color-light-dark);
    border-bottom: 2px solid var(--color-light-light);
    border-right: 2px solid var(--color-light-light);
  }

  &--disabled,
  &:disabled {
    opacity: 0.8;
    cursor: default;
    border-color: var(--button-bg-color) !important;

    &#{$this}--active,
    &:active {
      text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.15);
      border-color: var(--button-bg-color) !important;
    }
  }

  &--primary {
    background-color: var(--color-primary);
    --button-bg-color: var(--color-primary);
    color: black;
    border-top: 2px solid var(--color-primary-light);
    border-left: 2px solid var(--color-primary-light);
    border-bottom: 2px solid var(--color-primary-dark);
    border-right: 2px solid var(--color-primary-dark);

    &#{$this}--active,
    &:active {
      border-top: 2px solid var(--color-primary-dark);
      border-left: 2px solid var(--color-primary-dark);
      border-bottom: 2px solid var(--color-primary-light);
      border-right: 2px solid var(--color-primary-light);
    }
  }

  &--secondary {
    background-color: var(--color-secondary);
    --button-bg-color: var(--color-secondary);
    color: white;
    border-top: 2px solid var(--color-secondary-light);
    border-left: 2px solid var(--color-secondary-light);
    border-bottom: 2px solid var(--color-secondary-dark);
    border-right: 2px solid var(--color-secondary-dark);

    &#{$this}--active,
    &:active {
      border-top: 2px solid var(--color-secondary-dark);
      border-left: 2px solid var(--color-secondary-dark);
      border-bottom: 2px solid var(--color-secondary-light);
      border-right: 2px solid var(--color-secondary-light);
    }
  }

  &--block {
    display: block;
    width: 100%;
  }
}
</style>

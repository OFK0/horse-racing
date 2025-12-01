<template>
  <div className="horizontal-direction-indicator" v-if="isShowable">
    <div className="horizontal-direction-indicator__icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-rotate-cw-icon lucide-rotate-cw"
      >
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
    </div>

    <div class="horizontal-direction-indicator__text">
      {{ $t('horizontal-direction-indicator.message') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';

defineOptions({
  name: 'HorizontalDirectionIndicator',
});

const show = ref<boolean>(false);

const isShowable = computed(() => show.value && window.innerWidth < 1490);

const displayOrientation = () => {
  const screenOrientation = window.screen.orientation.type;

  show.value =
    screenOrientation === 'portrait-secondary' ||
    screenOrientation === 'portrait-primary' ||
    screenOrientation === undefined;
};

onBeforeMount(() => {
  if (screen && screen.orientation !== null) {
    displayOrientation();
  }

  window.addEventListener('orientationchange', displayOrientation);
});

onBeforeUnmount(() => {
  window.removeEventListener('orientationchange', displayOrientation);
});
</script>

<style lang="scss" scoped>
.horizontal-direction-indicator {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;

  &__icon {
    color: white;

    svg {
      width: 32px;
      height: 32px;
    }
  }

  &__message {
    color: white;
  }
}
</style>

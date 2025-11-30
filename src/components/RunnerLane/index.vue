<template>
  <div class="runner-lane">
    <div class="runner-lane__num" :style="{ backgroundColor: props.color }">
      {{ props.number }}
    </div>
    <div class="runner-lane__inner">
      <slot />
    </div>
    <div class="runner-lane__end"></div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'RunnerLane',
});

const props = defineProps<{
  number: number;
  color: string;
}>();
</script>

<style scoped lang="scss">
.runner-lane {
  position: relative;
  height: 80px;
  border-bottom: 4px solid white;
  border-left: 4px solid white;
  overflow-x: hidden;

  &:first-of-type {
    border-top: 4px solid white;
  }

  &__inner {
    position: relative;
    width: 100%;
    height: 72px;
    transform: translateY(-40px);
  }

  &__num {
    position: absolute;
    left: 0;
    background-color: white;
    top: 0;
    height: 100%;
    width: 32px;
    color: white;
    text-shadow:
      2px 2px 0px black,
      -2px -2px 0px black,
      2px -2px 0px black,
      -2px 2px 0px black;
    display: flex;
    padding-bottom: 10px;
    align-items: flex-end;
    justify-content: center;
  }

  &__end {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 8px;
    background-color: black;
    border-right: 4px dashed white;
  }
}
</style>

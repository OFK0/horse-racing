<template>
  <header class="game-header">
    <div class="game-header__buttons">
      <BaseButton
        variant="primary"
        :active="locale === 'tr'"
        @click="locale = 'tr'"
        >TR</BaseButton
      >
      <BaseButton
        variant="primary"
        :active="locale === 'en'"
        @click="locale = 'en'"
        >EN</BaseButton
      >
    </div>
    <div class="game-header__buttons">
      <BaseButton
        variant="primary"
        :disabled="gameStore.isGameStarted"
        data-testid="generate-program-button"
        @click="onGenerateProgramClick"
        >{{ $t('header.generate-program-button') }}</BaseButton
      >
      <BaseButton
        variant="secondary"
        :disabled="!gameStore.isProgramGenerated"
        data-testid="start-stop-button"
        @click="onStartStopClick"
        >{{ $t('header.start-stop-button') }}</BaseButton
      >
    </div>
  </header>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import BaseButton from '../BaseButton/index.vue';
import { useGameStore } from '@/stores/game';
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'GameHeader',
});

const gameStore = useGameStore();
const { locale } = useI18n({ useScope: 'global' });

function onGenerateProgramClick() {
  gameStore.generateProgram();
}

function onStartStopClick() {
  if (gameStore.isGameStopped) {
    gameStore.resumeGame();
    return;
  }

  if (gameStore.isGameStarted) {
    gameStore.stopGame();
    return;
  }

  gameStore.startGame();
}

watch(locale, (newLocaleValue) => {
  localStorage.setItem('lang', newLocaleValue);
});
</script>

<style scoped lang="scss">
.game-header {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  padding: 0 24px;

  &__buttons {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>

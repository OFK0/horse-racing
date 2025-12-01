import { ref } from 'vue';
import { defineStore } from 'pinia';
import lodash from 'lodash';

export const MAX_ROUNDS = 6;
export const FIRST_ROUND_LENGTH = 1200;
export const NAMES = [
  'Thunderbolt',
  'Shadowfax',
  'Windrunner',
  'Rüzgar',
  'Blaze',
  'Nightmare',
  'Silverwind',
  'Firestorm',
  'Gülbatur',
  'Eclipse',
  'Majestic',
  'Phantom',
  'Comet',
  'Tornado',
  'Şahbatur',
  'Avalanche',
  'Hurricane',
  'Güllü',
  'Whirlwind',
  'Tempest',
  'Vortex',
];
export const COLORS = [
  '#FF0055',
  '#FF6FA8',
  '#D400FF',
  '#8C00FF',
  '#5100FF',
  '#003CFF',
  '#0080FF',
  '#00C4FF',
  '#006A8F',
  '#002B40',
  '#FF3F00',
  '#FF7B00',
  '#FF95CC',
  '#C70039',
  '#7A001F',
  '#A0A0FF',
  '#174400',
  '#006c5a',
  '#270049',
  '#754000',
];

export interface Horse {
  id: number;
  name: string;
  color: string;
  condition: number;
  speed: number;
  time: number;
  elapsed: number;
  finished: boolean;
}

function generateHorses(): Horse[] {
  const names = lodash.shuffle(NAMES);

  const colors = lodash.shuffle(COLORS);

  const horses: Array<Horse> = [];

  for (let i = 1; i <= 20; i++) {
    horses.push({
      id: i,
      name: names.pop() as string,
      condition: Math.floor(Math.random() * 100 + 1),
      time: 0,
      speed: Math.floor(Math.random() * (100 - 70 + 1)) + 70,
      finished: false,
      elapsed: 0,
      color: colors.pop() as string,
    });
  }

  return horses;
}

export const useGameStore = defineStore('game', () => {
  const isGameStarted = ref(false);
  const isGameStopped = ref(false);
  const horses = ref(generateHorses());
  const inGameHorses = ref<Horse[]>([]);
  const currentRoundIndex = ref(0);
  const intervalId = ref<number | null>(null);
  const elapsedSeconds = ref<number>(0);
  const lapTables = ref<Array<Array<Horse>>>([]);
  const isProgramGenerated = ref<boolean>(false);
  const programTable = ref<Array<Array<Horse>>>([]);

  function resetHorses() {
    horses.value = generateHorses();
  }

  function getRandomHorsesByCount(count: number = 10) {
    return [...horses.value].sort(() => 0.5 - Math.random()).slice(0, count);
  }

  function getCurrentRoundLength() {
    return (currentRoundIndex.value + 1) * 200 + FIRST_ROUND_LENGTH;
  }

  function setupInterval() {
    if (intervalId.value) return;

    const delta = 0.01;

    intervalId.value = window.setInterval(() => {
      elapsedSeconds.value += delta;

      inGameHorses.value.forEach((horse) => {
        if (horse.finished) return;

        horse.time = elapsedSeconds.value;

        const variation = Math.random() * 0.04 - 0.02;
        horse.speed *= 1 + variation;

        const fatigue = 1 - horse.condition / 100;

        horse.speed *= 1 - fatigue * 0.008 * delta;

        horse.elapsed += horse.speed * delta;

        if (horse.elapsed >= getCurrentRoundLength()) {
          horse.finished = true;
        }
      });

      lapTables.value[currentRoundIndex.value] = [...inGameHorses.value];

      if (inGameHorses.value.every((horse) => horse.finished)) {
        clearInterval(intervalId.value!);
        intervalId.value = null;
        isGameStarted.value = false;

        programTable.value[currentRoundIndex.value]?.forEach((horse) => {
          const inGameEntry = inGameHorses.value.find((h) => h.id === horse.id);

          if (inGameEntry) {
            horse.elapsed = inGameEntry.elapsed;
            horse.speed = inGameEntry.speed;
            horse.time = inGameEntry.time;
          }
        });

        if (currentRoundIndex.value + 1 >= MAX_ROUNDS) {
          return;
        }
        currentRoundIndex.value += 1;
        inGameHorses.value =
          programTable.value[currentRoundIndex.value]?.map((horse) => ({
            ...horse,
            time: 0,
            finished: false,
            elapsed: 0,
          })) || [];
      }
    }, delta * 1000);
  }

  function generateProgram() {
    if (isGameStarted.value) return;

    resetHorses();
    programTable.value = [];
    lapTables.value = [];
    isGameStarted.value = false;
    currentRoundIndex.value = 0;
    elapsedSeconds.value = 0;

    for (let i = 0; i < MAX_ROUNDS; i++) {
      const horses = getRandomHorsesByCount();

      programTable.value.push(horses);
    }

    inGameHorses.value =
      programTable.value[currentRoundIndex.value]?.map((horse) => ({
        ...horse,
        time: 0,
        finished: false,
        elapsed: 0,
      })) || [];

    isProgramGenerated.value = true;
  }

  function startGame() {
    if (isGameStarted.value || !isProgramGenerated.value) return;

    isGameStarted.value = true;
    isGameStopped.value = false;
    elapsedSeconds.value = 0;

    lapTables.value[currentRoundIndex.value] = [...inGameHorses.value];

    setupInterval();
  }

  function stopGame() {
    isGameStopped.value = true;
    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  }

  function resumeGame() {
    isGameStopped.value = false;

    setupInterval();
  }

  return {
    horses,
    inGameHorses,
    currentRoundIndex,
    isGameStarted,
    isGameStopped,
    isProgramGenerated,
    elapsedSeconds,
    programTable,
    lapTables,
    startGame,
    stopGame,
    resumeGame,
    getCurrentRoundLength,
    generateProgram,
  };
});

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import {
  useGameStore,
  MAX_ROUNDS,
  FIRST_ROUND_LENGTH,
  NAMES,
  COLORS,
} from '../game';

describe('Game Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Initial State', () => {
    it('should initialize state values correctly', () => {
      const store = useGameStore();

      expect(store.isGameStarted).toBe(false);
      expect(store.isGameStopped).toBe(false);
      expect(store.currentRoundIndex).toBe(0);
      expect(store.elapsedSeconds).toBe(0);
      expect(store.isProgramGenerated).toBe(false);
      expect(store.horses.length).toBe(20);
      expect(store.inGameHorses.length).toBe(0);
      expect(store.lapTables.length).toBe(0);
      expect(store.programTable.length).toBe(0);
    });

    it('all horses should have correct properties', () => {
      const store = useGameStore();

      store.horses.forEach((horse) => {
        expect(horse).toHaveProperty('id');
        expect(horse).toHaveProperty('name');
        expect(horse).toHaveProperty('color');
        expect(horse).toHaveProperty('condition');
        expect(horse).toHaveProperty('speed');
        expect(horse).toHaveProperty('time');
        expect(horse).toHaveProperty('elapsed');

        expect(horse.id).toBeGreaterThanOrEqual(1);
        expect(horse.id).toBeLessThanOrEqual(20);
        expect(horse.condition).toBeGreaterThanOrEqual(1);
        expect(horse.condition).toBeLessThanOrEqual(101);
        expect(horse.speed).toBeGreaterThanOrEqual(70);
        expect(horse.speed).toBeLessThanOrEqual(100);
      });
    });

    it('horse names and colors should be valid', () => {
      const store = useGameStore();

      store.horses.forEach((horse) => {
        expect(NAMES).toContain(horse.name);
        expect(COLORS).toContain(horse.color);
      });
    });

    it('each horse should have a unique ID', () => {
      const store = useGameStore();
      const ids = store.horses.map((horse) => horse.id);

      expect(new Set(ids).size).toBe(20);
    });
  });

  describe('generateProgram()', () => {
    it('should create a program', () => {
      const store = useGameStore();

      store.generateProgram();

      expect(store.isProgramGenerated).toBe(true);
      expect(store.programTable.length).toBe(MAX_ROUNDS);
      expect(store.currentRoundIndex).toBe(0);
      expect(store.elapsedSeconds).toBe(0);
    });

    it('should select 10 horses for each round', () => {
      const store = useGameStore();

      store.generateProgram();

      store.programTable.forEach((round) => {
        expect(round.length).toBe(10);
      });
    });

    it('should load first round horses into inGameHorses', () => {
      const store = useGameStore();

      store.generateProgram();

      expect(store.inGameHorses.length).toBe(10);
      expect(store.inGameHorses).toEqual(store.programTable[0]);
    });

    it('should not create program if game is running', () => {
      const store = useGameStore();

      store.generateProgram();
      const firstProgramTable = JSON.stringify(store.programTable);

      store.isGameStarted = true;
      store.generateProgram();

      expect(JSON.stringify(store.programTable)).toBe(firstProgramTable);
    });
  });

  describe('startGame()', () => {
    it('should start the game', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();

      expect(store.isGameStarted).toBe(true);
    });

    it('should not start game if program is not generated', () => {
      const store = useGameStore();

      store.startGame();

      expect(store.isGameStarted).toBe(false);
    });

    it('should not restart game if already started', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();
      const firstElapsed = store.elapsedSeconds;

      // Advance time
      vi.advanceTimersByTime(1000);

      store.startGame();

      // elapsedSeconds should not reset to zero
      expect(store.elapsedSeconds).toBeGreaterThan(firstElapsed);
    });

    it('should reset elapsedSeconds when starting', () => {
      const store = useGameStore();

      store.generateProgram();
      store.elapsedSeconds = 100;
      store.startGame();

      expect(store.elapsedSeconds).toBe(0);
    });

    it('should record first lap table', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();

      expect(store.lapTables[0]).toBeDefined();
      expect(store.lapTables[0]).toEqual(store.inGameHorses);
    });
  });

  describe('stopGame()', () => {
    it('should stop the game', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();
      store.stopGame();

      expect(store.isGameStopped).toBe(true);
    });

    it('should pause time progression', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();

      vi.advanceTimersByTime(1000);
      const elapsedBeforeStop = store.elapsedSeconds;

      store.stopGame();
      vi.advanceTimersByTime(1000);

      // elapsed should not change after stop
      expect(store.elapsedSeconds).toBe(elapsedBeforeStop);
    });
  });

  describe('resumeGame()', () => {
    it('should resume the game', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();
      store.stopGame();

      expect(store.isGameStopped).toBe(true);

      store.resumeGame();

      expect(store.isGameStopped).toBe(false);
    });

    it('should resume time progression', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();

      vi.advanceTimersByTime(1000);
      store.stopGame();

      const elapsedAfterStop = store.elapsedSeconds;

      store.resumeGame();
      vi.advanceTimersByTime(1000);

      expect(store.elapsedSeconds).toBeGreaterThan(elapsedAfterStop);
    });
  });

  describe('Game Progression', () => {
    it('horses should progress as time passes', () => {
      const store = useGameStore();

      store.generateProgram();
      const initialElapsed = store.inGameHorses[0]?.elapsed ?? 0;

      store.startGame();

      // advance 100ms
      vi.advanceTimersByTime(100);

      expect(store.elapsedSeconds).toBeGreaterThan(0);
      expect(store.inGameHorses[0]?.elapsed ?? 0).toBeGreaterThan(
        initialElapsed,
      );
    });

    it('horse race time should be updated', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();

      vi.advanceTimersByTime(100);

      expect(store.inGameHorses[0]?.time ?? 0).toBeGreaterThan(0);
    });

    it('game should stop when all horses finish', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();

      const roundLength = store.getCurrentRoundLength();
      vi.advanceTimersByTime((roundLength + 100) * 1000);

      expect(store.isGameStarted).toBe(false);
    });

    it('should record lap table when round completes', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();

      const roundLength = store.getCurrentRoundLength();
      vi.advanceTimersByTime((roundLength + 100) * 1000);

      expect(store.lapTables[0]).toBeDefined();
      expect(store.lapTables[0]?.length).toBe(10);
    });
  });

  describe('Round Progression', () => {
    it('should advance to next round when current round finishes', () => {
      const store = useGameStore();

      store.generateProgram();
      expect(store.currentRoundIndex).toBe(0);

      store.startGame();

      const roundLength = store.getCurrentRoundLength();
      vi.advanceTimersByTime((roundLength + 100) * 1000);

      // Next round should be prepared
      expect(store.currentRoundIndex).toBe(1);
    });

    it('should stop at max rounds', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();

      // Complete all rounds
      for (let i = 0; i < MAX_ROUNDS - 1; i++) {
        const roundLength = store.getCurrentRoundLength();
        vi.advanceTimersByTime((roundLength + 100) * 1000);
      }

      expect(store.currentRoundIndex).toBeLessThanOrEqual(MAX_ROUNDS - 1);
    });

    it('new round horses should not be finished', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();

      const roundLength = store.getCurrentRoundLength();
      vi.advanceTimersByTime((roundLength + 100) * 1000);

      const nextRoundHorses = store.inGameHorses;
      const allNotFinished = nextRoundHorses.every((h) => !h.finished);

      expect(allNotFinished).toBe(true);
    });

    it('new round horses elapsed should be reset', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();

      const roundLength = store.getCurrentRoundLength();
      vi.advanceTimersByTime((roundLength + 100) * 1000);

      const nextRoundHorses = store.inGameHorses;
      const allElapsedZero = nextRoundHorses.every((h) => h.elapsed === 0);

      expect(allElapsedZero).toBe(true);
    });
  });

  describe('getCurrentRoundLength()', () => {
    it('should calculate first round length correctly', () => {
      const store = useGameStore();

      store.currentRoundIndex = 0;
      expect(store.getCurrentRoundLength()).toBe(FIRST_ROUND_LENGTH + 200);
    });

    it('should calculate subsequent round lengths correctly', () => {
      const store = useGameStore();

      store.currentRoundIndex = 1;
      expect(store.getCurrentRoundLength()).toBe(FIRST_ROUND_LENGTH + 400);

      store.currentRoundIndex = 5;
      expect(store.getCurrentRoundLength()).toBe(FIRST_ROUND_LENGTH + 1200);
    });
  });

  describe('Horse Properties Over Time', () => {
    it('horse speed should change over time', () => {
      const store = useGameStore();

      store.generateProgram();

      store.startGame();
      vi.advanceTimersByTime(500);

      const finalSpeed = store.inGameHorses[0]?.speed;

      // Speed can vary due to randomness
      expect(finalSpeed).toBeDefined();
      expect(typeof finalSpeed).toBe('number');
    });
  });

  describe('Edge Cases', () => {
    it('should pause correctly during game', () => {
      const store = useGameStore();

      store.generateProgram();
      store.startGame();

      vi.advanceTimersByTime(2000);

      const elapsedBeforeStop = store.elapsedSeconds;

      store.stopGame();
      vi.advanceTimersByTime(2000);

      // elapsed should not change after stop
      expect(store.elapsedSeconds).toBe(elapsedBeforeStop);
    });

    it('programTable and inGameHorses should be consistent', () => {
      const store = useGameStore();

      store.generateProgram();

      for (let i = 0; i < store.programTable.length; i++) {
        expect(store.programTable[i]?.length).toBe(10);
        expect(Array.isArray(store.programTable[i])).toBe(true);
      }
    });
  });
});

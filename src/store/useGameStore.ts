import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  // --- Permanent Wisdom (100-Year Growth) ---
  credits: number;
  codingWisdom: number;
  farmingWisdom: number;
  organicProduce: number;
  
  // --- Daily Harmony & Health ---
  creativity: number; 
  vitality: number;   
  connection: number; 
  gardenHealth: number;
  digitalFog: number; // Represents cognitive load from distractions

  // --- States ---
  isYogaActive: boolean;
  isSleeping: boolean;
  isWatering: boolean;

  // --- Actions ---
  completeCodingTask: (reward: number) => void;
  waterPlants: () => void;
  tendFarm: () => void;
  performYoga: () => void;
  spendFamilyTime: () => void;
  
  // Digital Management
  logGrowthContent: () => void; // Learning that boosts wisdom
  logUselessDistraction: () => void; // Scrolling that drains energy
  
  startSleep: () => void;
  stopSleep: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      credits: 0,
      codingWisdom: 0,
      farmingWisdom: 0,
      organicProduce: 0,
      creativity: 50,
      vitality: 50,
      connection: 50,
      gardenHealth: 50,
      digitalFog: 0,
      isYogaActive: false,
      isSleeping: false,
      isWatering: false,

      completeCodingTask: (reward) => set((s) => ({
        credits: s.credits + reward,
        codingWisdom: s.codingWisdom + 15,
        // Success increases creativity, but Fog makes it harder
        creativity: Math.min(s.creativity + (s.digitalFog > 50 ? 5 : 15), 100)
      })),

      logGrowthContent: () => set((s) => ({
        creativity: Math.min(s.creativity + 10, 100),
        codingWisdom: s.codingWisdom + 5,
        digitalFog: Math.max(s.digitalFog - 15, 0) // Quality learning clears fog
      })),

      logUselessDistraction: () => set((s) => ({
        digitalFog: Math.min(s.digitalFog + 35, 100), // Heavy drain from shorts/reels
        creativity: Math.max(s.creativity - 25, 0),
        vitality: Math.max(s.vitality - 10, 0)
      })),

      waterPlants: () => {
        if (get().isWatering) return;
        set({ isWatering: true });
        setTimeout(() => {
          set((s) => ({
            isWatering: false,
            gardenHealth: Math.min(s.gardenHealth + 20, 100),
            digitalFog: Math.max(s.digitalFog - 40, 0), // Nature is the best reset
            vitality: Math.min(s.vitality + 5, 100)
          }));
        }, 3000);
      },

      tendFarm: () => set((s) => ({
        organicProduce: s.organicProduce + 1,
        farmingWisdom: s.farmingWisdom + 30,
        vitality: Math.min(s.vitality + 25, 100),
        digitalFog: 0, // Deep labor completely clears the mind
        connection: Math.min(s.connection + 10, 100)
      })),

      performYoga: () => {
        if (get().isYogaActive) return;
        set({ isYogaActive: true });
        setTimeout(() => {
          set((s) => ({
            isYogaActive: false,
            vitality: Math.min(s.vitality + 35, 100),
            digitalFog: Math.max(s.digitalFog - 30, 0)
          }));
        }, 5000);
      },

      spendFamilyTime: () => set((s) => ({
        connection: Math.min(s.connection + 30, 100),
        creativity: Math.min(s.creativity + 10, 100)
      })),

      startSleep: () => set({ isSleeping: true }),
      stopSleep: () => set((s) => ({
        isSleeping: false,
        creativity: 100, // Total reset
        digitalFog: 0,
        vitality: Math.min(s.vitality + 50, 100)
      })),
    }),
    { name: 'chakaluwa-100-year-path' }
  )
);
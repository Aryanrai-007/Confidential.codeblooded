import { create } from 'zustand';

type BeatState = {
  beat: number;
  setBeat: (beat: number) => void;
};

export const useBeatStore = create<BeatState>((set) => ({
  beat: 0,
  setBeat: (beat) => set({ beat }),
}));

import { create } from "zustand";

export const useQcmStore = create<any>((set, get) => ({
  QcmsData: [],
  start: false,
  completed: false,
  currentIndex: 0,
  time: 0,
  SelectedAnswer: [],
  score: 0,
  accuracy:0, 
  updateScore: (value: number) => {
    const { score ,QcmsData } = get();
    const accuracy = (score/QcmsData.length)*100
    set({ score: score + value, accuracy});
  },
  setStart: (value: boolean) => set({ start: value }),
  SetSelectedAnswer: (answer: any) => {
    const { SelectedAnswer } = get();
  },
  setCurrentIndex: (index: number) => set({ currentIndex: index }),
  handleNextQuestion: () => {
    const { currentIndex, QcmsData } = get();
    if (currentIndex < QcmsData.length - 1) {
      set({ currentIndex: currentIndex + 1 });
    } else {
      set({
        completed: true,
      });
    }
  },
  handlePreviousQuestion: () => {
    const { currentIndex } = get();
    if (currentIndex >= 0 && currentIndex !== 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },
  setQcmData: (dataQcm: any) => set({ QcmsData: dataQcm }),
  setTime: (value: number) => set({ time: value }),
  ResetQcmDetails: () => {
    set({
      QcmsData: [],
      start: false,
      completed: false,
      currentIndex: 0,
      time: 0,
      SelectedAnswer: [],
      score: 0,
      accuracy:0
    });
  },
}));

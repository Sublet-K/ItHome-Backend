import { create } from "zustand";

export const useLoginPopUpStore = create((set) => ({
  popUpState: false,
  setPopUpState: () => set((state) => ({
    popUpState: !state.popUpState
  })),

}))

export const useGuestInfoStore = create((set) => ({

}))
import { create } from "zustand";

interface GlobalState {
  location: { city: string; lat: number; lng: number };
  service: string;
  setLocation: (location: { city: string; lat: number; lng: number }) => void;
  setService: (service: string) => void;
}

const useStore = create<GlobalState>()((set) => ({
  location: {
    city: "Rabat",
    lat: 33.9716,
    lng: -6.8498,
  },
  service: "",
  setLocation: (location: { city: string; lat: number; lng: number }) =>
    set({ location }),
  setService: (service: string) => set({ service }),
}));

export default useStore;

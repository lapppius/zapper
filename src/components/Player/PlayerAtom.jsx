import { atom } from "jotai";

export const playerAtom = atom({
  streamUrl: null,
  logoUrl: null,
  name: null,
  playing: false,
  waiting: false,
  slug: null,
  curId: null,
  volume: 0.5,
});

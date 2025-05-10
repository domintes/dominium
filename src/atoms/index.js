import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

// Core storage atoms with persistence
export const universesAtom = atomWithStorage('universes', []);
export const objectsAtom = atomWithStorage('objects', []);
export const tagsAtom = atomWithStorage('tags', []);
export const collectionsAtom = atomWithStorage('collections', []);

// UI state atoms (no persistence needed)
export const currentUniverseAtom = atom(null);
export const selectedTagsAtom = atom([]);
export const displayModeAtom = atom('gallery');

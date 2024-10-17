/**
 * This file adheres to our standard for Zustand stores.
 * The state and actions are externalized, promoting modularity and separation of concerns,
 * as outlined in Zustand's best practices: https://zustand.docs.pmnd.rs/guides/practice-with-no-store-actions.
 *
 * This structure simplifies state management and ensures consistency across the project.
 */

import { create } from "zustand";

export type ExampleStoreState = {
  firstValue: string | null;
  secondValue: number | null;
  thirdValue: number | null;
};

const useStore = create<ExampleStoreState>(() => ({
  firstValue: null,
  secondValue: null,
  thirdValue: null,
}));

export const getFirstValue = () => useStore((state) => state.firstValue);
export const getSecondValue = () => useStore((state) => state.secondValue);
export const getThirdValue = () => useStore((state) => state.thirdValue);

export const setFirstValue = (firstValue: ExampleStoreState["firstValue"]) =>
  useStore.setState(() => ({ firstValue }));

export const setSecondValue = (secondValue: ExampleStoreState["secondValue"]) =>
  useStore.setState(() => ({ secondValue }));

export const setThirdValue = (thirdValue: ExampleStoreState["thirdValue"]) =>
  useStore.setState(() => ({ thirdValue }));

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

export const useStore = create<ExampleStoreState>()(() => ({
  firstValue: null,
  secondValue: null,
  thirdValue: null,
}));

export const setFirstValue = () =>
  useStore.setState((state) => ({ firstValue: state.firstValue }));

export const setSecondValue = () =>
  useStore.setState((state) => ({ secondValue: state.secondValue }));

export const setThirdValue = () =>
  useStore.setState((state) => ({ thirdValue: state.thirdValue }));

import { create } from 'zustand';

// Define the type for the state
interface DialogState {
  value: string;
  setValue: (value: string) => void;
}

// Create the store with typed state and actions
export const useDialogStore = create<DialogState>((set) => ({
  value: '',
  setValue: (value: string) => set({ value }),
}));

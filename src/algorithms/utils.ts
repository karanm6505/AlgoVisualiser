import { ArrayBar } from '../types';

// Helper function to create a deep copy of the array
export const copyArray = (arr: ArrayBar[]): ArrayBar[] => {
  return arr.map(item => ({ ...item }));
};

// Helper function for the animations with delay
export const sleep = (ms: number): Promise<void> => {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
};

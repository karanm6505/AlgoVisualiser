import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const bogoSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  // WARNING: This is inefficient for arrays larger than ~10 elements
  // Limit to 20 shuffle attempts to prevent browser hanging
  let attempts = 0;
  const maxAttempts = 20;
  
  while (!isSorted(arrayCopy) && attempts < maxAttempts) {
    attempts++;
    await shuffle(arrayCopy, setArray, animationSpeed, sleep);
  }
  
  // Mark all as sorted, whether they actually are or not
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = isSorted(arrayCopy) ? 'sorted' : 'default';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 4);
  }
};

// A function to check if array is sorted
const isSorted = (array: ArrayBar[]): boolean => {
  for (let i = 1; i < array.length; i++) {
    if (array[i].value < array[i - 1].value) {
      return false;
    }
  }
  return true;
};

// A function to shuffle an array
const shuffle = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep: (ms: number) => Promise<void>
) => {
  for (let i = array.length - 1; i > 0; i--) {
    array[i].state = 'comparing';
    setArray([...array]);
    await sleep(animationSpeed / 2);
    
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    
    array[j].state = 'comparing';
    setArray([...array]);
    await sleep(animationSpeed / 2);
    
    // Swap array[i] and array[j]
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    
    array[i].state = 'default';
    array[j].state = 'default';
    setArray([...array]);
    await sleep(animationSpeed / 2);
  }
};

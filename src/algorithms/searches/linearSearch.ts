import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const linearSearch = async (
  array: ArrayBar[],
  target: number,
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
): Promise<number> => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  for (let i = 0; i < n; i++) {
    // Highlight current element being examined
    arrayCopy[i].state = 'comparing';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    // Check if current element is the target
    if (arrayCopy[i].value === target) {
      arrayCopy[i].state = 'found';
      setArray([...arrayCopy]);
      return i;
    }
    
    // Mark as checked and move to next
    arrayCopy[i].state = 'not-found';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 2);
  }
  
  return -1; // Element not found
};

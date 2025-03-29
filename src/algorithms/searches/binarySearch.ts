import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const binarySearch = async (
  array: ArrayBar[],
  target: number,
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
): Promise<number> => {
  // Binary search requires a sorted array
  const arrayCopy = copyArray(array);
  let left = 0;
  let right = arrayCopy.length - 1;
  
  while (left <= right) {
    // Reset states from previous iteration
    for (let i = 0; i < arrayCopy.length; i++) {
      if (arrayCopy[i].state !== 'found') {
        arrayCopy[i].state = 'default';
      }
    }
    
    // Calculate middle index
    const mid = Math.floor((left + right) / 2);
    arrayCopy[mid].state = 'comparing';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    // Check if middle element is the target
    if (arrayCopy[mid].value === target) {
      arrayCopy[mid].state = 'found';
      setArray([...arrayCopy]);
      return mid;
    }
    
    // If target is greater, ignore left half
    if (arrayCopy[mid].value < target) {
      left = mid + 1;
      
      // Mark the left half as not-found
      for (let i = 0; i <= mid; i++) {
        arrayCopy[i].state = 'not-found';
      }
    } 
    // If target is smaller, ignore right half
    else {
      right = mid - 1;
      
      // Mark the right half as not-found
      for (let i = mid; i < arrayCopy.length; i++) {
        arrayCopy[i].state = 'not-found';
      }
    }
    
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
  }
  
  // Element not found
  setArray([...arrayCopy]);
  return -1;
};

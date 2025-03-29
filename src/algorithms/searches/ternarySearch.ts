import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const ternarySearch = async (
  array: ArrayBar[],
  target: number,
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
): Promise<number> => {
  // Ternary search requires a sorted array
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
    
    // Calculate the two mid points
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);
    
    // Highlight the points we're comparing
    arrayCopy[mid1].state = 'comparing';
    arrayCopy[mid2].state = 'comparing';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    // Check if middle elements are the target
    if (arrayCopy[mid1].value === target) {
      arrayCopy[mid1].state = 'found';
      setArray([...arrayCopy]);
      return mid1;
    }
    
    if (arrayCopy[mid2].value === target) {
      arrayCopy[mid2].state = 'found';
      setArray([...arrayCopy]);
      return mid2;
    }
    
    // Determine which third to search
    if (target < arrayCopy[mid1].value) {
      // The target is in the first third
      right = mid1 - 1;
      
      // Mark the other parts as not-found
      for (let i = mid1; i < arrayCopy.length; i++) {
        arrayCopy[i].state = 'not-found';
      }
    } else if (target > arrayCopy[mid2].value) {
      // The target is in the last third
      left = mid2 + 1;
      
      // Mark the other parts as not-found
      for (let i = 0; i <= mid2; i++) {
        arrayCopy[i].state = 'not-found';
      }
    } else {
      // The target is in the middle third
      left = mid1 + 1;
      right = mid2 - 1;
      
      // Mark the other parts as not-found
      for (let i = 0; i <= mid1; i++) {
        arrayCopy[i].state = 'not-found';
      }
      for (let i = mid2; i < arrayCopy.length; i++) {
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

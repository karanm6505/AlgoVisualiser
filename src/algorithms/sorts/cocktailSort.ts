import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const cocktailSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  let swapped = true;
  let start = 0;
  let end = n - 1;
  
  while (swapped) {
    // Reset swapped flag for the first pass
    swapped = false;
    
    // Move from left to right, like bubble sort
    for (let i = start; i < end; i++) {
      arrayCopy[i].state = 'comparing';
      arrayCopy[i + 1].state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      if (arrayCopy[i].value > arrayCopy[i + 1].value) {
        // Swap
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + 1];
        arrayCopy[i + 1] = temp;
        swapped = true;
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
      }
      
      arrayCopy[i].state = 'default';
      arrayCopy[i + 1].state = 'default';
      setArray([...arrayCopy]);
    }
    
    // If nothing moved, then array is sorted
    if (!swapped) {
      break;
    }
    
    // Mark the last element as sorted
    arrayCopy[end].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    // Otherwise, reset swapped flag for the second pass
    swapped = false;
    
    // Decrease end because the last item is now in place
    end--;
    
    // Move from right to left
    for (let i = end - 1; i >= start; i--) {
      arrayCopy[i].state = 'comparing';
      arrayCopy[i + 1].state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      if (arrayCopy[i].value > arrayCopy[i + 1].value) {
        // Swap
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + 1];
        arrayCopy[i + 1] = temp;
        swapped = true;
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
      }
      
      arrayCopy[i].state = 'default';
      arrayCopy[i + 1].state = 'default';
      setArray([...arrayCopy]);
    }
    
    // Mark the first element as sorted
    arrayCopy[start].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    // Increase start because the first item is now in place
    start++;
  }
  
  // Mark all remaining elements as sorted
  for (let i = start; i <= end; i++) {
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 4);
  }
};

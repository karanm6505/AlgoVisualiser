import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const combSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  // Initialize gap
  let gap = n;
  
  // Initialize swapped as true to make sure that loop runs
  let swapped = true;
  
  // Keep running while gap is more than 1 and last
  // iteration caused a swap
  while (gap !== 1 || swapped === true) {
    // Find next gap
    gap = Math.floor(gap / 1.3);
    if (gap < 1) {
      gap = 1;
    }
    
    swapped = false;
    
    // Compare all elements with current gap
    for (let i = 0; i < n - gap; i++) {
      arrayCopy[i].state = 'comparing';
      arrayCopy[i + gap].state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      if (arrayCopy[i].value > arrayCopy[i + gap].value) {
        // Swap arr[i] and arr[i+gap]
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + gap];
        arrayCopy[i + gap] = temp;
        swapped = true;
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
      }
      
      arrayCopy[i].state = 'default';
      arrayCopy[i + gap].state = 'default';
      setArray([...arrayCopy]);
    }
  }
  
  // Mark all elements as sorted
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 4);
  }
};

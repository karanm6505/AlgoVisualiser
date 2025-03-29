import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const pancakeSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  // Start from the complete array and reduce the size one by one
  for (let curr_size = n; curr_size > 1; curr_size--) {
    // Find index of the maximum element in arr[0..curr_size-1]
    let maxIdx = 0;
    for (let i = 0; i < curr_size; i++) {
      arrayCopy[i].state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      if (arrayCopy[i].value > arrayCopy[maxIdx].value) {
        arrayCopy[maxIdx].state = 'default';
        maxIdx = i;
      } else {
        arrayCopy[i].state = 'default';
      }
      
      setArray([...arrayCopy]);
      await sleep(animationSpeed / 2);
    }
    
    // Move the maximum element to end of current array if it's not already at the end
    if (maxIdx !== curr_size - 1) {
      // First flip: to get max to the beginning
      await flip(arrayCopy, maxIdx, setArray, animationSpeed, sleep);
      
      // Second flip: to get max to the end
      await flip(arrayCopy, curr_size - 1, setArray, animationSpeed, sleep);
    }
    
    arrayCopy[curr_size - 1].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
  }
  
  // Mark first element as sorted too
  if (n > 0) {
    arrayCopy[0].state = 'sorted';
    setArray([...arrayCopy]);
  }
};

// Reverses arr[0..idx]
const flip = async (
  array: ArrayBar[], 
  idx: number, 
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep: (ms: number) => Promise<void>
) => {
  let start = 0;
  while (start < idx) {
    array[start].state = 'comparing';
    array[idx].state = 'comparing';
    setArray([...array]);
    await sleep(animationSpeed);
    
    // Swap
    const temp = array[start];
    array[start] = array[idx];
    array[idx] = temp;
    
    array[start].state = 'default';
    array[idx].state = 'default';
    setArray([...array]);
    await sleep(animationSpeed);
    
    start++;
    idx--;
  }
};

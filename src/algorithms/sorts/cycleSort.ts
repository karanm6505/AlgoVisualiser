import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const cycleSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  // Loop through the array to find cycles to rotate
  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = arrayCopy[cycleStart];
    
    // Find the position where we put the item
    let pos = cycleStart;
    
    for (let i = cycleStart + 1; i < n; i++) {
      arrayCopy[i].state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed / 2);
      
      if (arrayCopy[i].value < item.value) {
        pos++;
      }
      
      arrayCopy[i].state = 'default';
      setArray([...arrayCopy]);
      await sleep(animationSpeed / 2);
    }
    
    // If the item is already in correct position, continue
    if (pos === cycleStart) {
      continue;
    }
    
    // Put the item in its right position
    while (item.value === arrayCopy[pos].value) {
      pos++;
    }
    
    if (pos !== cycleStart) {
      arrayCopy[pos].state = 'comparing';
      item.state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      // Swap
      let temp = item;
      item = arrayCopy[pos];
      arrayCopy[pos] = temp;
      
      arrayCopy[pos].state = 'default';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
    }
    
    // Rotate the rest of the cycle
    while (pos !== cycleStart) {
      pos = cycleStart;
      
      // Find position where to put the item
      for (let i = cycleStart + 1; i < n; i++) {
        arrayCopy[i].state = 'comparing';
        setArray([...arrayCopy]);
        await sleep(animationSpeed / 2);
        
        if (arrayCopy[i].value < item.value) {
          pos++;
        }
        
        arrayCopy[i].state = 'default';
        setArray([...arrayCopy]);
        await sleep(animationSpeed / 2);
      }
      
      // Adjust position if there are duplicates
      while (item.value === arrayCopy[pos].value) {
        pos++;
      }
      
      if (item.value !== arrayCopy[pos].value) {
        arrayCopy[pos].state = 'comparing';
        item.state = 'comparing';
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
        
        // Swap
        let temp = item;
        item = arrayCopy[pos];
        arrayCopy[pos] = temp;
        
        arrayCopy[pos].state = 'default';
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
      }
    }
  }
  
  // Mark all as sorted
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 4);
  }
};

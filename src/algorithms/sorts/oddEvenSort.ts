import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const oddEvenSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  let sorted = false;
  
  while (!sorted) {
    sorted = true;
    
    // Odd phase
    for (let i = 1; i < n - 1; i += 2) {
      arrayCopy[i].state = 'comparing';
      arrayCopy[i + 1].state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      if (arrayCopy[i].value > arrayCopy[i + 1].value) {
        // Swap
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + 1];
        arrayCopy[i + 1] = temp;
        sorted = false;
        
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
      }
      
      arrayCopy[i].state = 'default';
      arrayCopy[i + 1].state = 'default';
      setArray([...arrayCopy]);
    }
    
    // Even phase
    for (let i = 0; i < n - 1; i += 2) {
      arrayCopy[i].state = 'comparing';
      arrayCopy[i + 1].state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      if (arrayCopy[i].value > arrayCopy[i + 1].value) {
        // Swap
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + 1];
        arrayCopy[i + 1] = temp;
        sorted = false;
        
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
      }
      
      arrayCopy[i].state = 'default';
      arrayCopy[i + 1].state = 'default';
      setArray([...arrayCopy]);
    }
  }
  
  // Mark all as sorted
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 4);
  }
};

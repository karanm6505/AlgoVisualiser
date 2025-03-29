import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const shellSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort
    for (let i = gap; i < n; i++) {
      // Add array[i] to the elements that have been gap sorted
      const temp = { ...arrayCopy[i] };
      temp.state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      // Shift earlier gap-sorted elements up until the correct location for array[i] is found
      let j;
      for (j = i; j >= gap && arrayCopy[j - gap].value > temp.value; j -= gap) {
        arrayCopy[j - gap].state = 'comparing';
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
        
        arrayCopy[j] = { ...arrayCopy[j - gap], state: 'default' };
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
        
        arrayCopy[j - gap].state = 'default';
      }
      
      // Put temp in its correct location
      arrayCopy[j] = { ...temp, state: 'default' };
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
    }
  }
  
  // Mark all as sorted
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 4);
  }
};

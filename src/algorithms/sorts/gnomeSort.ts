import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const gnomeSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  let index = 0;
  
  while (index < n) {
    // Mark current element as being compared
    arrayCopy[index].state = 'comparing';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    if (index === 0) {
      index++;
    }
    
    // Compare with previous element
    if (index > 0) {
      arrayCopy[index - 1].state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      if (arrayCopy[index].value >= arrayCopy[index - 1].value) {
        // If current element is greater or equal, move forward
        arrayCopy[index].state = 'default';
        arrayCopy[index - 1].state = 'default';
        setArray([...arrayCopy]);
        index++;
      } else {
        // If current element is smaller, swap and move backward
        const temp = arrayCopy[index];
        arrayCopy[index] = arrayCopy[index - 1];
        arrayCopy[index - 1] = temp;
        
        arrayCopy[index].state = 'default';
        arrayCopy[index - 1].state = 'default';
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
        
        index--;
      }
    }
  }
  
  // Mark all elements as sorted
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 4);
  }
};

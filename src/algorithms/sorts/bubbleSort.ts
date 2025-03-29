import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const bubbleSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Set comparing state
      arrayCopy[j].state = 'comparing';
      arrayCopy[j + 1].state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);

      if (arrayCopy[j].value > arrayCopy[j + 1].value) {
        // Swap
        const temp = arrayCopy[j];
        arrayCopy[j] = arrayCopy[j + 1];
        arrayCopy[j + 1] = temp;
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
      }

      // Reset comparing state
      arrayCopy[j].state = 'default';
      arrayCopy[j + 1].state = 'default';
      setArray([...arrayCopy]);
    }
    // Mark as sorted
    arrayCopy[n - i - 1].state = 'sorted';
    setArray([...arrayCopy]);
  }
  
  // Mark the first element as sorted too
  arrayCopy[0].state = 'sorted';
  setArray([...arrayCopy]);
};

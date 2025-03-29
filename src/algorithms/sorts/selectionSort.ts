import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const selectionSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    arrayCopy[i].state = 'comparing';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);

    for (let j = i + 1; j < n; j++) {
      arrayCopy[j].state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);

      if (arrayCopy[j].value < arrayCopy[minIdx].value) {
        if (minIdx !== i) {
          arrayCopy[minIdx].state = 'default';
        }
        minIdx = j;
      } else {
        arrayCopy[j].state = 'default';
      }
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
    }

    // Swap the minimum element with the first element
    if (minIdx !== i) {
      const temp = arrayCopy[i];
      arrayCopy[i] = arrayCopy[minIdx];
      arrayCopy[minIdx] = temp;
      arrayCopy[minIdx].state = 'default';
    }
    
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
  }

  // Mark the last element as sorted too
  arrayCopy[n - 1].state = 'sorted';
  setArray([...arrayCopy]);
};

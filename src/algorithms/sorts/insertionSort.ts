import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const insertionSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;

  // Mark first element as sorted
  arrayCopy[0].state = 'sorted';
  setArray([...arrayCopy]);
  await sleep(animationSpeed);

  for (let i = 1; i < n; i++) {
    const key = arrayCopy[i];
    key.state = 'comparing';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);

    let j = i - 1;
    
    while (j >= 0 && arrayCopy[j].value > key.value) {
      arrayCopy[j + 1] = arrayCopy[j];
      j--;
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
    }
    
    arrayCopy[j + 1] = key;
    key.state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
  }
};

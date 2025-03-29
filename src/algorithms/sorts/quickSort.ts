import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const quickSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  await quickSortHelper(arrayCopy, 0, arrayCopy.length - 1, setArray, animationSpeed, sleep);
  
  // Mark all as sorted when done
  for (let i = 0; i < arrayCopy.length; i++) {
    arrayCopy[i].state = 'sorted';
  }
  setArray([...arrayCopy]);
};

const quickSortHelper = async (
  array: ArrayBar[],
  low: number,
  high: number,
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep: (ms: number) => Promise<void>
) => {
  if (low < high) {
    const pivotIndex = await partition(array, low, high, setArray, animationSpeed, sleep);
    await quickSortHelper(array, low, pivotIndex - 1, setArray, animationSpeed, sleep);
    await quickSortHelper(array, pivotIndex + 1, high, setArray, animationSpeed, sleep);
  }
};

const partition = async (
  array: ArrayBar[],
  low: number,
  high: number,
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep: (ms: number) => Promise<void>
) => {
  const pivot = array[high];
  pivot.state = 'pivot';
  setArray([...array]);
  await sleep(animationSpeed);
  
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    array[j].state = 'comparing';
    setArray([...array]);
    await sleep(animationSpeed);
    
    if (array[j].value <= pivot.value) {
      i++;
      
      // Swap array[i] and array[j]
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      setArray([...array]);
      await sleep(animationSpeed);
    }
    
    array[j].state = 'default';
    setArray([...array]);
  }
  
  // Swap array[i+1] and array[high] (pivot)
  const temp = array[i + 1];
  array[i + 1] = array[high];
  array[high] = temp;
  
  pivot.state = 'default';
  array[i + 1].state = 'sorted';
  setArray([...array]);
  await sleep(animationSpeed);
  
  return i + 1;
};

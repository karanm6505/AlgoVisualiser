import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const mergeSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  
  await mergeSortHelper(arrayCopy, 0, arrayCopy.length - 1, setArray, animationSpeed, sleep);
  
  // Mark all as sorted when done
  for (let i = 0; i < arrayCopy.length; i++) {
    arrayCopy[i].state = 'sorted';
  }
  setArray([...arrayCopy]);
};

const mergeSortHelper = async (
  array: ArrayBar[],
  start: number,
  end: number,
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep: (ms: number) => Promise<void>
) => {
  if (start >= end) return;
  
  const mid = Math.floor((start + end) / 2);
  await mergeSortHelper(array, start, mid, setArray, animationSpeed, sleep);
  await mergeSortHelper(array, mid + 1, end, setArray, animationSpeed, sleep);
  await merge(array, start, mid, end, setArray, animationSpeed, sleep);
};

const merge = async (
  array: ArrayBar[],
  start: number,
  mid: number,
  end: number,
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep: (ms: number) => Promise<void>
) => {
  const leftSize = mid - start + 1;
  const rightSize = end - mid;
  
  // Create temporary arrays
  const leftArray: ArrayBar[] = [];
  const rightArray: ArrayBar[] = [];
  
  // Copy data to temporary arrays
  for (let i = 0; i < leftSize; i++) {
    leftArray.push({ ...array[start + i] });
  }
  
  for (let i = 0; i < rightSize; i++) {
    rightArray.push({ ...array[mid + 1 + i] });
  }
  
  // Merge the temp arrays back into the main array
  let i = 0, j = 0, k = start;
  
  while (i < leftSize && j < rightSize) {
    // Highlight comparing elements
    array[start + i].state = 'comparing';
    array[mid + 1 + j].state = 'comparing';
    setArray([...array]);
    await sleep(animationSpeed);
    
    if (leftArray[i].value <= rightArray[j].value) {
      array[k] = { ...leftArray[i], state: 'default' };
      i++;
    } else {
      array[k] = { ...rightArray[j], state: 'default' };
      j++;
    }
    k++;
    setArray([...array]);
    await sleep(animationSpeed);
  }
  
  // Copy remaining elements
  while (i < leftSize) {
    array[k] = { ...leftArray[i], state: 'default' };
    i++;
    k++;
    setArray([...array]);
    await sleep(animationSpeed);
  }
  
  while (j < rightSize) {
    array[k] = { ...rightArray[j], state: 'default' };
    j++;
    k++;
    setArray([...array]);
    await sleep(animationSpeed);
  }
};

import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const heapSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arrayCopy, n, i, setArray, animationSpeed, sleep);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    arrayCopy[0].state = 'comparing';
    arrayCopy[i].state = 'comparing';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    // Swap
    const temp = arrayCopy[0];
    arrayCopy[0] = arrayCopy[i];
    arrayCopy[i] = temp;
    arrayCopy[i].state = 'sorted';
    arrayCopy[0].state = 'default';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    // Heapify reduced heap
    await heapify(arrayCopy, i, 0, setArray, animationSpeed, sleep);
  }
  
  // Mark the first element as sorted too
  arrayCopy[0].state = 'sorted';
  setArray([...arrayCopy]);
};

const heapify = async (
  array: ArrayBar[],
  n: number,
  i: number,
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep: (ms: number) => Promise<void>
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  // Set comparing state for the current node
  array[i].state = 'comparing';
  setArray([...array]);
  await sleep(animationSpeed);
  
  // If left child is larger than root
  if (left < n) {
    array[left].state = 'comparing';
    setArray([...array]);
    await sleep(animationSpeed);
    
    if (array[left].value > array[largest].value) {
      if (largest !== i) {
        array[largest].state = 'default';
      }
      largest = left;
    } else {
      array[left].state = 'default';
    }
    setArray([...array]);
    await sleep(animationSpeed);
  }
  
  // If right child is larger than largest so far
  if (right < n) {
    array[right].state = 'comparing';
    setArray([...array]);
    await sleep(animationSpeed);
    
    if (array[right].value > array[largest].value) {
      if (largest !== i) {
        array[largest].state = 'default';
      }
      largest = right;
    } else {
      array[right].state = 'default';
    }
    setArray([...array]);
    await sleep(animationSpeed);
  }
  
  // If largest is not root
  if (largest !== i) {
    // Swap
    const temp = array[i];
    array[i] = array[largest];
    array[largest] = temp;
    
    array[i].state = 'default';
    array[largest].state = 'default';
    setArray([...array]);
    await sleep(animationSpeed);
    
    // Recursively heapify the affected sub-tree
    await heapify(array, n, largest, setArray, animationSpeed, sleep);
  } else {
    array[i].state = 'default';
    setArray([...array]);
    await sleep(animationSpeed);
  }
};

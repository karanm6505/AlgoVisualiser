import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const radixSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  // Find the maximum number to know number of digits
  let max = arrayCopy[0].value;
  for (let i = 1; i < n; i++) {
    if (arrayCopy[i].value > max) {
      max = arrayCopy[i].value;
    }
  }
  
  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    await countingSortByDigit(arrayCopy, n, exp, setArray, animationSpeed, sleep);
  }
  
  // Mark all as sorted
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 4);
  }
};

const countingSortByDigit = async (
  array: ArrayBar[],
  n: number,
  exp: number,
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep: (ms: number) => Promise<void>
) => {
  const output: ArrayBar[] = new Array(n).fill(null).map(() => ({ value: 0, state: 'default' }));
  const count = new Array(10).fill(0);
  
  // Store count of occurrences in count[]
  for (let i = 0; i < n; i++) {
    array[i].state = 'comparing';
    setArray([...array]);
    await sleep(animationSpeed);
    
    const digit = Math.floor(array[i].value / exp) % 10;
    count[digit]++;
    
    array[i].state = 'default';
    setArray([...array]);
    await sleep(animationSpeed);
  }
  
  // Change count[i] so that count[i] contains actual position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    array[i].state = 'comparing';
    setArray([...array]);
    await sleep(animationSpeed);
    
    const digit = Math.floor(array[i].value / exp) % 10;
    output[count[digit] - 1] = { ...array[i], state: 'default' };
    count[digit]--;
    
    array[i].state = 'default';
    setArray([...array]);
    await sleep(animationSpeed);
  }
  
  // Copy the output array to array[]
  for (let i = 0; i < n; i++) {
    array[i].state = 'comparing';
    output[i].state = 'comparing';
    setArray([...array]);
    await sleep(animationSpeed);
    
    array[i] = { ...output[i], state: 'default' };
    
    setArray([...array]);
    await sleep(animationSpeed);
  }
};

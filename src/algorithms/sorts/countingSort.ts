import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const countingSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  // Find the maximum element to determine count array size
  let max = arrayCopy[0].value;
  for (let i = 1; i < n; i++) {
    if (arrayCopy[i].value > max) {
      max = arrayCopy[i].value;
    }
  }
  
  // Create a count array for all possible values
  const count = new Array(max + 1).fill(0);
  
  // Count occurrences of each value
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = 'comparing';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    count[arrayCopy[i].value]++;
    
    arrayCopy[i].state = 'default';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 2);
  }
  
  // Visualize the count array (optional)
  // This could be further enhanced to show the count array visually
  
  // Modify the count array to store the position of each element
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  const output = new Array(n).fill(null).map(() => ({ value: 0, state: 'default' }));
  
  // Place elements in the output array
  for (let i = n - 1; i >= 0; i--) {
    arrayCopy[i].state = 'comparing';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    const value = arrayCopy[i].value;
    const position = count[value] - 1;
    output[position] = { ...arrayCopy[i], state: 'default' };
    count[value]--;
    
    arrayCopy[i].state = 'default';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 2);
  }
  
  // Copy the output array back to the original array
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = 'comparing';
    output[i].state = 'comparing';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    arrayCopy[i] = { ...output[i], state: 'default' };
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 2);
  }
  
  // Mark all elements as sorted
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 4);
  }
};

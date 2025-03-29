import { ArrayBar } from '../../types';
import { copyArray } from '../utils';

export const bucketSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  // Find min and max values
  let minValue = arrayCopy[0].value;
  let maxValue = arrayCopy[0].value;
  
  for (let i = 1; i < n; i++) {
    if (arrayCopy[i].value < minValue) {
      minValue = arrayCopy[i].value;
    } else if (arrayCopy[i].value > maxValue) {
      maxValue = arrayCopy[i].value;
    }
  }
  
  // Create buckets
  const bucketCount = Math.floor(Math.sqrt(n));
  const bucketSize = Math.floor((maxValue - minValue) / bucketCount) + 1;
  const buckets: ArrayBar[][] = new Array(bucketCount).fill(null).map(() => []);
  
  // Put array elements into buckets
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = 'comparing';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    const bucketIndex = Math.floor((arrayCopy[i].value - minValue) / bucketSize);
    buckets[bucketIndex].push({ ...arrayCopy[i], state: 'default' });
    
    arrayCopy[i].state = 'default';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
  }
  
  // Sort each bucket (using insertion sort for demonstration)
  let currentIndex = 0;
  for (let i = 0; i < bucketCount; i++) {
    // Simple insertion sort for each bucket
    for (let j = 1; j < buckets[i].length; j++) {
      const current = { ...buckets[i][j] };
      current.state = 'comparing';
      
      let k = j - 1;
      while (k >= 0 && buckets[i][k].value > current.value) {
        buckets[i][k + 1] = buckets[i][k];
        k--;
      }
      
      buckets[i][k + 1] = current;
    }
    
    // Copy sorted buckets back to arrayCopy
    for (let j = 0; j < buckets[i].length; j++) {
      arrayCopy[currentIndex] = { ...buckets[i][j], state: 'comparing' };
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      arrayCopy[currentIndex].state = 'default';
      currentIndex++;
      setArray([...arrayCopy]);
      await sleep(animationSpeed / 2);
    }
  }
  
  // Mark all as sorted
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 4);
  }
};

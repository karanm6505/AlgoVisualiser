import { ArrayBar } from '../types';

// Helper function to create a deep copy of the array
const copyArray = (arr: ArrayBar[]): ArrayBar[] => {
  return arr.map(item => ({ ...item }));
};

// Helper function for the animations with delay
const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// BUBBLE SORT
export const bubbleSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number
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

// SELECTION SORT
export const selectionSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number
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

// INSERTION SORT
export const insertionSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number
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

// MERGE SORT
export const mergeSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number
) => {
  const arrayCopy = copyArray(array);
  
  await mergeSortHelper(arrayCopy, 0, arrayCopy.length - 1, setArray, animationSpeed);
  
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
  animationSpeed: number
) => {
  if (start >= end) return;
  
  const mid = Math.floor((start + end) / 2);
  await mergeSortHelper(array, start, mid, setArray, animationSpeed);
  await mergeSortHelper(array, mid + 1, end, setArray, animationSpeed);
  await merge(array, start, mid, end, setArray, animationSpeed);
};

const merge = async (
  array: ArrayBar[],
  start: number,
  mid: number,
  end: number,
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number
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

// QUICK SORT
export const quickSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number
) => {
  const arrayCopy = copyArray(array);
  await quickSortHelper(arrayCopy, 0, arrayCopy.length - 1, setArray, animationSpeed);
  
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
  animationSpeed: number
) => {
  if (low < high) {
    const pivotIndex = await partition(array, low, high, setArray, animationSpeed);
    await quickSortHelper(array, low, pivotIndex - 1, setArray, animationSpeed);
    await quickSortHelper(array, pivotIndex + 1, high, setArray, animationSpeed);
  }
};

const partition = async (
  array: ArrayBar[],
  low: number,
  high: number,
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number
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

// HEAP SORT
export const heapSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arrayCopy, n, i, setArray, animationSpeed);
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
    await heapify(arrayCopy, i, 0, setArray, animationSpeed);
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
  animationSpeed: number
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
    await heapify(array, n, largest, setArray, animationSpeed);
  } else {
    array[i].state = 'default';
    setArray([...array]);
    await sleep(animationSpeed);
  }
};

// RADIX SORT
export const radixSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number
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
    await countingSortByDigit(arrayCopy, n, exp, setArray, animationSpeed);
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
  animationSpeed: number
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
  
  // Change count[i] so that count[i] contains actual
  // position of this digit in output[]
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

// SHELL SORT
export const shellSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort
    for (let i = gap; i < n; i++) {
      // Add array[i] to the elements that have been gap sorted
      const temp = { ...arrayCopy[i] };
      temp.state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      // Shift earlier gap-sorted elements up until the correct location for array[i] is found
      let j;
      for (j = i; j >= gap && arrayCopy[j - gap].value > temp.value; j -= gap) {
        arrayCopy[j - gap].state = 'comparing';
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
        
        arrayCopy[j] = { ...arrayCopy[j - gap], state: 'default' };
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
        
        arrayCopy[j - gap].state = 'default';
      }
      
      // Put temp in its correct location
      arrayCopy[j] = { ...temp, state: 'default' };
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
    }
  }
  
  // Mark all as sorted
  for (let i = 0; i < n; i++) {
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 4);
  }
};

// COCKTAIL SORT (BIDIRECTIONAL BUBBLE SORT)
export const cocktailSort = async (
  array: ArrayBar[],
  setArray: React.Dispatch<React.SetStateAction<ArrayBar[]>>,
  animationSpeed: number
) => {
  const arrayCopy = copyArray(array);
  const n = arrayCopy.length;
  
  let swapped = true;
  let start = 0;
  let end = n - 1;
  
  while (swapped) {
    // Reset swapped flag for the first pass
    swapped = false;
    
    // Move from left to right, like bubble sort
    for (let i = start; i < end; i++) {
      arrayCopy[i].state = 'comparing';
      arrayCopy[i + 1].state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      if (arrayCopy[i].value > arrayCopy[i + 1].value) {
        // Swap
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + 1];
        arrayCopy[i + 1] = temp;
        swapped = true;
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
      }
      
      arrayCopy[i].state = 'default';
      arrayCopy[i + 1].state = 'default';
      setArray([...arrayCopy]);
    }
    
    // If nothing moved, then array is sorted
    if (!swapped) {
      break;
    }
    
    // Mark the last element as sorted
    arrayCopy[end].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    // Otherwise, reset swapped flag for the second pass
    swapped = false;
    
    // Decrease end because the last item is now in place
    end--;
    
    // Move from right to left
    for (let i = end - 1; i >= start; i--) {
      arrayCopy[i].state = 'comparing';
      arrayCopy[i + 1].state = 'comparing';
      setArray([...arrayCopy]);
      await sleep(animationSpeed);
      
      if (arrayCopy[i].value > arrayCopy[i + 1].value) {
        // Swap
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[i + 1];
        arrayCopy[i + 1] = temp;
        swapped = true;
        setArray([...arrayCopy]);
        await sleep(animationSpeed);
      }
      
      arrayCopy[i].state = 'default';
      arrayCopy[i + 1].state = 'default';
      setArray([...arrayCopy]);
    }
    
    // Mark the first element as sorted
    arrayCopy[start].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed);
    
    // Increase start because the first item is now in place
    start++;
  }
  
  // Mark all remaining elements as sorted
  for (let i = start; i <= end; i++) {
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await sleep(animationSpeed / 4);
  }
};

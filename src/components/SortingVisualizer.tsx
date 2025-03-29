import { useState, useEffect, useRef } from 'react';
import { AlgorithmType, SortingAlgorithmType, ArrayBar } from '../types';
import { 
  bubbleSort, 
  selectionSort, 
  insertionSort, 
  mergeSort, 
  quickSort, 
  heapSort, 
  radixSort, 
  shellSort, 
  cocktailSort,
  countingSort,
  bucketSort,
  bogoSort
} from '../algorithms/sorts';
import { Button } from './ui/button';
import AlgorithmInfo from './AlgorithmInfo';

interface SortingVisualizerProps {
  algorithm: AlgorithmType;
  speed: number;
  arraySize: number;
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ algorithm, speed, arraySize }) => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [sorting, setSorting] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [prevAlgorithm, setPrevAlgorithm] = useState<AlgorithmType>(algorithm);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const pauseRef = useRef<boolean>(false);

  useEffect(() => {
    resetArray();
  }, [arraySize]);
  
  // Generate new array when algorithm changes
  useEffect(() => {
    if (prevAlgorithm !== algorithm) {
      resetArray();
      setPrevAlgorithm(algorithm);
    }
  }, [algorithm, prevAlgorithm]);

  const resetArray = () => {
    const newArray: ArrayBar[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: randomIntFromInterval(5, 500),
        state: 'default'
      });
    }
    setArray(newArray);
    setCompleted(false);
  };

  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const visualizeSort = async () => {
    setSorting(true);
    setCompleted(false);
    pauseRef.current = false;
    setIsPaused(false);

    const animationSpeed = 101 - speed;
    
    // Custom sleep function that checks for pause state
    const controlledSleep = async (ms: number) => {
      return new Promise<void>(resolve => {
        const checkPause = () => {
          if (pauseRef.current) {
            setTimeout(checkPause, 100);
          } else {
            setTimeout(resolve, ms);
          }
        };
        checkPause();
      });
    };
    
    try {
      switch (algorithm) {
        case 'bubble':
          await bubbleSort(array, setArray, animationSpeed, controlledSleep);
          break;
        case 'selection':
          await selectionSort(array, setArray, animationSpeed, controlledSleep);
          break;
        case 'insertion':
          await insertionSort(array, setArray, animationSpeed, controlledSleep);
          break;
        case 'merge':
          await mergeSort(array, setArray, animationSpeed, controlledSleep);
          break;
        case 'quick':
          await quickSort(array, setArray, animationSpeed, controlledSleep);
          break;
        case 'heap':
          await heapSort(array, setArray, animationSpeed, controlledSleep);
          break;
        case 'radix':
          await radixSort(array, setArray, animationSpeed, controlledSleep);
          break;
        case 'shell':
          await shellSort(array, setArray, animationSpeed, controlledSleep);
          break;
        case 'cocktail':
          await cocktailSort(array, setArray, animationSpeed, controlledSleep);
          break;
        case 'counting':
          await countingSort(array, setArray, animationSpeed, controlledSleep);
          break;
        case 'bucket':
          await bucketSort(array, setArray, animationSpeed, controlledSleep);
          break;
        case 'bogo':
          if (arraySize > 10) {
            alert("Warning: Bogo Sort is extremely inefficient and may cause browser issues with arrays larger than 10 elements. Consider reducing array size for this algorithm.");
          }
          await bogoSort(array, setArray, animationSpeed, controlledSleep);
          break;
        default:
          break;
      }

      setCompleted(true);
    } catch (error) {
      console.error("Sorting was stopped", error);
    } finally {
      setSorting(false);
    }
  };

  const togglePause = () => {
    const newPauseState = !isPaused;
    pauseRef.current = newPauseState;
    setIsPaused(newPauseState);
  };

  const stopSorting = () => {
    setSorting(false);
    pauseRef.current = false;
    setIsPaused(false);
    resetArray();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="array-container w-full border border-border">
        {array.map((bar, idx) => (
          <div
            className={`array-bar ${bar.state}`}
            key={idx}
            style={{
              height: `${bar.value}px`,
              width: `${Math.max(2, 800 / arraySize - 1)}px`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <Button 
          onClick={resetArray} 
          disabled={sorting && !isPaused}
          variant="outline"
        >
          Generate New Array
        </Button>
        {!sorting && !completed && (
          <Button onClick={visualizeSort}>
            Start Sorting
          </Button>
        )}
        {sorting && (
          <Button 
            onClick={togglePause} 
            variant={isPaused ? "default" : "secondary"}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        )}
        {(sorting || completed) && (
          <Button 
            onClick={stopSorting}
            variant="destructive"
          >
            Stop
          </Button>
        )}
      </div>
      
      <AlgorithmInfo algorithm={algorithm} />
      <div className="text-sm mb-2">
        <span className="font-semibold">Time Complexity:</span> {getAlgorithmTimeComplexity(algorithm)}
      </div>
    </div>
  );
};

// Helper function to get the full algorithm name
const getAlgorithmName = (algorithm: AlgorithmType): string => {
  const names: Record<SortingAlgorithmType, string> = {
    'bubble': 'Bubble Sort',
    'selection': 'Selection Sort',
    'insertion': 'Insertion Sort',
    'merge': 'Merge Sort',
    'quick': 'Quick Sort',
    'heap': 'Heap Sort',
    'radix': 'Radix Sort',
    'shell': 'Shell Sort',
    'cocktail': 'Cocktail Sort',
    'counting': 'Counting Sort',
    'bucket': 'Bucket Sort',
    'bogo': 'Bogo Sort'
  };
  return names[algorithm as SortingAlgorithmType] || algorithm;
};

// Helper function to get algorithm description
const getAlgorithmDescription = (algorithm: AlgorithmType): string => {
  const descriptions: Record<SortingAlgorithmType, string> = {
    'bubble': 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    'selection': 'Finds the minimum element and places it at the beginning, then finds the next minimum element and places it, and so on.',
    'insertion': 'Builds the sorted array one item at a time by comparing each new element with the already sorted elements.',
    'merge': 'Divides the array into halves, sorts each half, then merges the sorted halves back together.',
    'quick': 'Picks a pivot element and partitions the array around the pivot, with smaller elements to the left and larger to the right.',
    'heap': 'Creates a max-heap from the array and repeatedly extracts the maximum element.',
    'radix': 'Processes individual digits, grouping numbers by each digit position from least to most significant.',
    'shell': 'Improves on insertion sort by allowing exchanges of elements far apart.',
    'cocktail': 'A variation of bubble sort that sorts bidirectionally through the array.',
    'counting': 'Counts occurrences of each element, then places elements in correct position based on their count and position.',
    'bucket': 'Distributes elements into a number of buckets, then sorts each bucket individually.',
    'bogo': 'A highly inefficient algorithm that randomly shuffles the array until it\'s sorted.'
  };
  return descriptions[algorithm as SortingAlgorithmType] || "No description available.";
};

// Helper function to get algorithm time complexity
const getAlgorithmTimeComplexity = (algorithm: AlgorithmType): string => {
  const complexities: Record<SortingAlgorithmType, string> = {
    'bubble': 'O(n²)',
    'selection': 'O(n²)',
    'insertion': 'O(n²)',
    'merge': 'O(n log n)',
    'quick': 'O(n log n) average, O(n²) worst case',
    'heap': 'O(n log n)',
    'radix': 'O(nk) where k is the number of digits',
    'shell': 'O(n log² n)',
    'cocktail': 'O(n²)',
    'counting': 'O(n+k) where k is the range of input',
    'bucket': 'O(n+k) average, O(n²) worst case',
    'bogo': 'O(n×n!)' // Extremely inefficient
  };
  return complexities[algorithm as SortingAlgorithmType] || "Unknown";
};

export default SortingVisualizer;

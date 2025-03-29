import { AlgorithmType, SortingAlgorithmType } from '@/types';

interface AlgorithmInfoProps {
  algorithm: AlgorithmType;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithm }) => {
  // Existing sorting algorithm information
  const complexityInfo: Record<string, {
    timeComplexity: { best: string; average: string; worst: string };
    spaceComplexity: string;
    stable: boolean;
    description: string;
  }> = {
    'bubble': {
      timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stable: true,
      description: 'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.'
    },
    'selection': {
      timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stable: false,
      description: 'Divides the input list into two parts: a sorted sublist and an unsorted sublist. It repeatedly selects the smallest (or largest) element from the unsorted sublist and moves it to the end of the sorted sublist.'
    },
    'insertion': {
      timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stable: true,
      description: 'Builds the sorted array one item at a time by comparing each new element with the already sorted elements and inserting it at the correct position.'
    },
    'merge': {
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      spaceComplexity: 'O(n)',
      stable: true,
      description: 'A divide and conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.'
    },
    'quick': {
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      spaceComplexity: 'O(log n)',
      stable: false,
      description: 'Another divide and conquer algorithm that works by selecting a pivot element and partitioning the array around the pivot, such that elements less than the pivot are on the left and greater elements are on the right.'
    },
    'heap': {
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      spaceComplexity: 'O(1)',
      stable: false,
      description: 'Uses a binary heap data structure to sort elements. It creates a max heap from the array and repeatedly extracts the maximum element.'
    },
    'radix': {
      timeComplexity: { best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)' },
      spaceComplexity: 'O(n+k)',
      stable: true,
      description: 'A non-comparative sorting algorithm that sorts data with integer keys by grouping keys by individual digits with the same significant position and value.'
    },
    'counting': {
      timeComplexity: { best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n+k)' },
      spaceComplexity: 'O(k)',
      stable: true,
      description: 'A non-comparative sorting algorithm that works by counting the number of objects with distinct key values and using arithmetic to determine positions of elements in the output.'
    },
    'shell': {
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stable: false,
      description: 'An optimization of insertion sort that allows the exchange of items that are far apart, progressively reducing the gap between elements to be compared.'
    },
    'cocktail': {
      timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      stable: true,
      description: 'A variation of bubble sort that sorts bidirectionally through the list, bubbling both the largest and smallest elements in each pass.'
    },
    'bucket': {
      timeComplexity: { best: 'O(n+k)', average: 'O(n+k)', worst: 'O(n²)' },
      spaceComplexity: 'O(n+k)',
      stable: true,
      description: 'Distributes elements into a number of buckets, individually sorts each bucket (often with another algorithm), then concatenates the sorted buckets.'
    },
    'bogo': {
      timeComplexity: { best: 'O(n)', average: 'O(n×n!)', worst: 'O(∞)' },
      spaceComplexity: 'O(1)',
      stable: false,
      description: 'A highly inefficient algorithm that randomly shuffles the array until it happens to be sorted. Mostly used as an educational example.'
    }
  };

  // Search algorithm information
  const searchComplexityInfo: Record<string, {
    timeComplexity: { best: string; average: string; worst: string };
    spaceComplexity: string;
    description: string;
    requirements?: string;
  }> = {
    'linear': {
      timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      spaceComplexity: 'O(1)',
      description: 'Sequentially checks each element until it finds the target value or reaches the end.'
    },
    'binary': {
      timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
      spaceComplexity: 'O(1)',
      description: 'Repeatedly divides the search interval in half, ignoring the half where the target cannot lie.',
      requirements: 'Requires a sorted array'
    },
    'jump': {
      timeComplexity: { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)' },
      spaceComplexity: 'O(1)',
      description: 'Jumps ahead by fixed steps and then uses linear search to find the element.',
      requirements: 'Requires a sorted array'
    },
    'interpolation': {
      timeComplexity: { best: 'O(1)', average: 'O(log log n)', worst: 'O(n)' },
      spaceComplexity: 'O(1)',
      description: 'Improved binary search that makes intelligent guesses about the position of the target.',
      requirements: 'Requires a sorted array with uniformly distributed values'
    },
    'exponential': {
      timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
      spaceComplexity: 'O(1)',
      description: 'Jumps exponentially to find a range containing the element, then uses binary search.',
      requirements: 'Requires a sorted array'
    },
    'fibonacci': {
      timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
      spaceComplexity: 'O(1)',
      description: 'Uses Fibonacci numbers to determine search intervals.',
      requirements: 'Requires a sorted array'
    },
    'ternary': {
      timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
      spaceComplexity: 'O(1)',
      description: 'Divides the array into three parts and determines which part contains the target value.',
      requirements: 'Requires a sorted array'
    }
  };
  
  // String matching algorithm information
  const stringMatchingInfo: Record<string, {
    timeComplexity: { best: string; average: string; worst: string };
    spaceComplexity: string;
    description: string;
    advantages?: string[];
    disadvantages?: string[];
  }> = {
    'naive': {
      timeComplexity: { best: 'O(n)', average: 'O(m×(n-m+1))', worst: 'O(m×n)' },
      spaceComplexity: 'O(1)',
      description: 'The simplest string matching algorithm. It checks for the pattern at each possible position in the text by comparing characters one by one.',
      advantages: ['Simple to implement', 'No preprocessing needed', 'Works well for short patterns'],
      disadvantages: ['Inefficient for long patterns', 'Many redundant comparisons']
    },
    'horspool': {
      timeComplexity: { best: 'O(n/m)', average: 'O(n)', worst: 'O(m×n)' },
      spaceComplexity: 'O(k) where k is alphabet size',
      description: 'A simplified version of Boyer-Moore that uses only the bad character rule for shifting the pattern, scanning characters from right to left.',
      advantages: ['Faster than naive approach', 'Simpler than full Boyer-Moore', 'Good for pattern matching in text'],
      disadvantages: ['Not as efficient as full Boyer-Moore', 'Preprocessing overhead', 'Worst case same as naive']
    },
    'kmp': {
      timeComplexity: { best: 'O(n)', average: 'O(n+m)', worst: 'O(n+m)' },
      spaceComplexity: 'O(m)',
      description: 'Uses information about previous matches to avoid redundant comparisons by preprocessing the pattern to create a prefix function.',
      advantages: ['Linear time complexity', 'Efficient for repetitive patterns', 'No backtracking in text'],
      disadvantages: ['Requires preprocessing', 'More complex implementation', 'Extra space for prefix table']
    },
    'rabin-karp': {
      timeComplexity: { best: 'O(n+m)', average: 'O(n+m)', worst: 'O(n×m)' },
      spaceComplexity: 'O(1)',
      description: 'Uses a rolling hash function to quickly compare patterns, checking character-by-character only when hash values match.',
      advantages: ['Good for multiple pattern search', 'Linear average time', 'Can handle patterns of different lengths'],
      disadvantages: ['Hash collisions can occur', 'Worst case is as bad as naive approach']
    },
    'boyer-moore': {
      timeComplexity: { best: 'O(n/m)', average: 'O(n)', worst: 'O(n×m)' },
      spaceComplexity: 'O(k) where k is alphabet size',
      description: 'Skips sections of the text using two heuristics: bad character rule and good suffix rule, scanning the pattern from right to left.',
      advantages: ['Very efficient in practice', 'Gets faster with longer patterns', 'Sublinear time in best cases'],
      disadvantages: ['Complex to implement fully', 'Preprocessing overhead', 'Large alphabet increases preprocessing time']
    }
  };

  const isSearchAlgorithm = ['linear', 'binary', 'jump', 'interpolation', 'exponential', 'fibonacci', 'ternary'].includes(algorithm);
  const isStringMatchingAlgorithm = ['naive', 'horspool', 'kmp', 'rabin-karp', 'boyer-moore'].includes(algorithm);
  
  let info;
  if (isSearchAlgorithm) {
    info = searchComplexityInfo[algorithm];
  } else if (isStringMatchingAlgorithm) {
    info = stringMatchingInfo[algorithm];
  } else {
    info = complexityInfo[algorithm as SortingAlgorithmType];
  }

  if (!info) {
    return (
      <div className="bg-card text-card-foreground rounded-lg shadow-sm p-6 border">
        <h3 className="text-xl font-semibold mb-2">Algorithm Information</h3>
        <p className="text-muted-foreground mb-4">Information for this algorithm is not available.</p>
      </div>
    );
  }

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-sm p-6 border">
      <h3 className="text-xl font-semibold mb-2">{getAlgorithmName(algorithm)}</h3>
      <p className="text-muted-foreground mb-4">{info.description}</p>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
        <div>
          <h4 className="text-sm font-medium">Time Complexity</h4>
          <ul className="text-sm text-muted-foreground space-y-1 mt-1">
            <li><span className="font-mono">Best:</span> {info.timeComplexity.best}</li>
            <li><span className="font-mono">Average:</span> {info.timeComplexity.average}</li>
            <li><span className="font-mono">Worst:</span> {info.timeComplexity.worst}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">Space Complexity</h4>
          <p className="font-mono text-sm text-muted-foreground mt-1">{info.spaceComplexity}</p>
          {!isSearchAlgorithm && !isStringMatchingAlgorithm && (
            <>
              <h4 className="text-sm font-medium mt-2">Stable</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {(info as any).stable ? 'Yes' : 'No'}
              </p>
            </>
          )}
          {(info as any).requirements && (
            <>
              <h4 className="text-sm font-medium mt-2">Requirements</h4>
              <p className="text-sm text-muted-foreground mt-1">{(info as any).requirements}</p>
            </>
          )}
        </div>
      </div>
      
      {isStringMatchingAlgorithm && (info as any).advantages && (info as any).disadvantages && (
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4">
          <div>
            <h4 className="text-sm font-medium">Advantages</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
              {(info as any).advantages.map((adv: string, i: number) => (
                <li key={i}>{adv}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium">Disadvantages</h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
              {(info as any).disadvantages.map((disadv: string, i: number) => (
                <li key={i}>{disadv}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get the full algorithm name
const getAlgorithmName = (algorithm: AlgorithmType): string => {
  const names: Record<string, string> = {
    // Sorting algorithms
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
    'bogo': 'Bogo Sort',
    
    // Search algorithms
    'linear': 'Linear Search',
    'binary': 'Binary Search',
    'jump': 'Jump Search',
    'interpolation': 'Interpolation Search',
    'exponential': 'Exponential Search',
    'fibonacci': 'Fibonacci Search',
    'ternary': 'Ternary Search',
    
    // String matching algorithms
    'naive': 'Naive String Matching',
    'horspool': 'Horspool Algorithm',
    'kmp': 'Knuth-Morris-Pratt',
    'rabin-karp': 'Rabin-Karp',
    'boyer-moore': 'Boyer-Moore'
  };
  return names[algorithm] || algorithm;
};

export default AlgorithmInfo;

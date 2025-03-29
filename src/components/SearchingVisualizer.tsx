import { useState, useEffect } from 'react';
import { SearchingAlgorithmType, ArrayBar } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { linearSearch, binarySearch, ternarySearch } from '../algorithms/searches';
import { copyArray } from '@/algorithms/utils';
import AlgorithmInfo from './AlgorithmInfo';

interface SearchingVisualizerProps {
  algorithm: SearchingAlgorithmType;
  speed: number;
  arraySize: number;
}

const SearchingVisualizer: React.FC<SearchingVisualizerProps> = ({ 
  algorithm, 
  speed, 
  arraySize 
}) => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [targetValue, setTargetValue] = useState<number>(50);
  const [targetInputValue, setTargetInputValue] = useState<string>("50");
  const [searchResult, setSearchResult] = useState<{
    found: boolean;
    index: number;
    comparisons: number;
  } | null>(null);

  useEffect(() => {
    generateArray();
  }, [arraySize, algorithm]);

  const generateArray = () => {
    const newArray: ArrayBar[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * (100 - 1 + 1) + 1),
        state: 'default'
      });
    }
    
    // For binary search and other algorithms that need sorted arrays
    if (algorithm !== 'linear') {
      newArray.sort((a, b) => a.value - b.value);
    }
    
    setArray(newArray);
    setSearchResult(null);
  };

  const startSearch = async () => {
    if (searching) return;

    setSearching(true);
    setSearchResult(null);
    
    const arrayCopy = copyArray(array);
    
    // Reset all states
    for (let i = 0; i < arrayCopy.length; i++) {
      arrayCopy[i].state = 'default';
    }
    setArray([...arrayCopy]);
    
    let index = -1;
    let comparisons = 0;
    
    try {
      // Modified animation speed scaling to allow for even slower animations
      // This will make low values much slower
      const animationSpeed = Math.pow(101 - speed, 1.5);
      
      switch (algorithm) {
        case 'linear':
          index = await linearSearch(arrayCopy, targetValue, setArray, animationSpeed);
          comparisons = index >= 0 ? index + 1 : arrayCopy.length;
          break;
        case 'binary':
          index = await binarySearch(arrayCopy, targetValue, setArray, animationSpeed);
          // In binary search, approximately log2(n) comparisons are made
          comparisons = Math.ceil(Math.log2(arrayCopy.length));
          break;
        case 'ternary':
          index = await ternarySearch(arrayCopy, targetValue, setArray, animationSpeed);
          // In ternary search, approximately log3(n) comparisons are made
          comparisons = Math.ceil(Math.log(arrayCopy.length) / Math.log(3));
          break;
      }
      
      setSearchResult({
        found: index !== -1,
        index,
        comparisons
      });
      
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTargetInputValue(inputValue);
    
    // Only update the actual targetValue if we have a valid number
    if (inputValue === '') {
      setTargetValue(0); // Default to 0 when empty
    } else {
      const value = parseInt(inputValue);
      if (!isNaN(value) && value >= 0 && value <= 100) {
        setTargetValue(value);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mb-6 space-y-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Value (0-100)</label>
            <Input 
              type="number" 
              value={targetInputValue} 
              onChange={handleTargetChange}
              className="w-24" 
              min={0}
              max={100}
              disabled={searching}
            />
          </div>
          
          <Button 
            onClick={generateArray} 
            variant="outline" 
            disabled={searching}
          >
            Generate New Array
          </Button>
          
          <Button 
            onClick={startSearch} 
            disabled={searching}
          >
            {searching ? 'Searching...' : 'Start Search'}
          </Button>
        </div>
        
        {searchResult && (
          <div className={`p-4 rounded-lg ${searchResult.found ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
            <p>
              {searchResult.found ? 
                `Found at index ${searchResult.index}! Value: ${array[searchResult.index]?.value}` : 
                'Element not found in the array.'
              }
            </p>
            <p className="text-sm text-muted-foreground mt-1">Comparisons made: {searchResult.comparisons}</p>
          </div>
        )}
      </div>
      
      <div className="array-container w-full border border-border mb-6">
        {array.map((bar, idx) => (
          <div
            className={`array-bar ${bar.state}`}
            key={idx}
            style={{
              height: `${bar.value * 4}px`,
              width: `${Math.max(2, 800 / arraySize - 1)}px`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 w-full mb-6">
        <div className="bg-card border rounded p-4">
          <h3 className="font-medium text-lg mb-2">Array Values</h3>
          <div className="flex flex-wrap gap-1">
            {array.map((bar, idx) => (
              <span 
                key={idx} 
                className={`
                  inline-block px-2 py-1 text-xs rounded
                  ${bar.state === 'found' ? 'bg-green-500 text-white' : 
                    bar.state === 'comparing' ? 'bg-yellow-500 text-white' : 
                    bar.state === 'not-found' ? 'bg-red-200 dark:bg-red-900/30' : 
                    'bg-muted'}
                `}
              >
                {bar.value}
              </span>
            ))}
          </div>
        </div>
        
        <AlgorithmInfo algorithm={algorithm} />
      </div>
      
      <div className="bg-muted p-4 rounded-md w-full">
        <h3 className="font-medium mb-2">Color Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-muted-foreground/30 mr-2"></span>
            <span className="text-sm">Default</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-yellow-500 mr-2"></span>
            <span className="text-sm">Comparing</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-green-500 mr-2"></span>
            <span className="text-sm">Found</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-red-500 mr-2"></span>
            <span className="text-sm">Not Found</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchingVisualizer;

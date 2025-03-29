import { useState } from 'react';
import { SearchingAlgorithmType } from '../types';
import SearchingVisualizer from '../components/SearchingVisualizer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface SearchPageProps {
  speed: number;
  arraySize: number;
}

const SearchPage: React.FC<SearchPageProps> = ({ speed: initialSpeed, arraySize }) => {
  const [algorithm, setAlgorithm] = useState<SearchingAlgorithmType>('linear');
  const [speed, setSpeed] = useState<number>(initialSpeed);
  
  const searchAlgorithms = [
    { value: 'linear', label: 'Linear Search' },
    { value: 'binary', label: 'Binary Search' },
    { value: 'ternary', label: 'Ternary Search' }
  ];
  
  return (
    <div className="space-y-8">
      <div className="bg-card border rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Search Algorithm Visualization</h2>
        <p className="text-muted-foreground mb-6">
          Visualize how different search algorithms work and compare their efficiency
        </p>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Select Algorithm</h3>
          <div className="flex flex-wrap gap-2">
            {searchAlgorithms.map(algo => (
              <Button
                key={algo.value}
                variant={algorithm === algo.value ? "default" : "outline"}
                size="sm"
                onClick={() => setAlgorithm(algo.value as SearchingAlgorithmType)}
              >
                {algo.label}
              </Button>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-muted-foreground">Animation Speed: {speed}</h3>
            <div className="max-w-xs mt-2">
              <Slider
                value={[speed]}
                onValueChange={(value) => setSpeed(value[0])}
                min={1}
                max={100}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Very Slow</span>
                <span>Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <SearchingVisualizer 
        algorithm={algorithm}
        speed={speed}
        arraySize={arraySize}
      />
      
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-bold mb-2">About {searchAlgorithms.find(a => a.value === algorithm)?.label}</h3>
        {algorithm === 'linear' && (
          <div className="space-y-2">
            <p>Linear Search is the simplest search algorithm. It sequentially checks each element of the list until a match is found or the whole list has been searched.</p>
            <p className="font-medium mt-2">Time Complexity:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Best Case: O(1) - when the element is found at the first position</li>
              <li>Average Case: O(n) - on average, half the elements are checked</li>
              <li>Worst Case: O(n) - when the element is at the last position or not present</li>
            </ul>
          </div>
        )}
        {algorithm === 'binary' && (
          <div className="space-y-2">
            <p>Binary Search is a divide-and-conquer algorithm that works on sorted arrays. It compares the target value to the middle element of the array and eliminates half of the array with each comparison.</p>
            <p className="font-medium mt-2">Time Complexity:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Best Case: O(1) - when the element is in the middle</li>
              <li>Average Case: O(log n) - due to halving the search interval each time</li>
              <li>Worst Case: O(log n)</li>
            </ul>
            <p className="text-yellow-600 dark:text-yellow-400 mt-2">Note: Requires a sorted array</p>
          </div>
        )}
        {algorithm === 'ternary' && (
          <div className="space-y-2">
            <p>Ternary Search is a divide-and-conquer algorithm that divides the array into three parts and determines which part the target is in. It's similar to binary search but divides the array into three parts instead of two.</p>
            <p className="font-medium mt-2">Time Complexity:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Best Case: O(1) - when the element is at one of the partitioning points</li>
              <li>Average Case: O(log₃ n) - due to dividing the search interval into thirds</li>
              <li>Worst Case: O(log₃ n)</li>
            </ul>
            <p className="text-yellow-600 dark:text-yellow-400 mt-2">Note: Requires a sorted array</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

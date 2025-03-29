import { useState } from 'react';
import { StringMatchingAlgorithmType } from '../types';
import StringMatchingVisualizer from '../components/StringMatchingVisualizer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface StringMatchingPageProps {
  speed: number;
}

const StringMatchingPage: React.FC<StringMatchingPageProps> = ({ speed: initialSpeed }) => {
  const [algorithm, setAlgorithm] = useState<StringMatchingAlgorithmType>('naive');
  const [speed, setSpeed] = useState<number>(initialSpeed);
  
  const stringMatchingAlgorithms = [
    { value: 'naive', label: 'Naive Search' },
    { value: 'horspool', label: 'Horspool Algorithm' },
    { value: 'boyer-moore', label: 'Boyer-Moore' }
  ];
  
  return (
    <div className="space-y-8">
      <div className="bg-card border rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">String Matching Visualization</h2>
        <p className="text-muted-foreground mb-6">
          Visualize how different string matching algorithms work to find patterns within text
        </p>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Select Algorithm</h3>
          <div className="flex flex-wrap gap-2">
            {stringMatchingAlgorithms.map(algo => (
              <Button
                key={algo.value}
                variant={algorithm === algo.value ? "default" : "outline"}
                size="sm"
                onClick={() => setAlgorithm(algo.value as StringMatchingAlgorithmType)}
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
      
      <StringMatchingVisualizer algorithm={algorithm} speed={speed} />
      
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-bold mb-2">About {stringMatchingAlgorithms.find(a => a.value === algorithm)?.label}</h3>
        
        {algorithm === 'naive' && (
          <div className="space-y-2">
            <p>Naive String Matching is the simplest pattern searching algorithm. It checks for the pattern at each possible position in the text.</p>
            <p className="font-medium mt-2">Time Complexity:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Best Case: O(n) - when immediate mismatch occurs</li>
              <li>Average Case: O(m×(n-m+1)) - where n is text length and m is pattern length</li>
              <li>Worst Case: O(m×n) - when pattern has repeating characters</li>
            </ul>
          </div>
        )}
        
        {algorithm === 'horspool' && (
          <div className="space-y-2">
            <p>Horspool's algorithm is a simplification of the Boyer-Moore algorithm that uses only the bad character rule for shifting. It's efficient and easier to implement than the full Boyer-Moore algorithm.</p>
            <p className="font-medium mt-2">Time Complexity:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Best Case: O(n/m) - sublinear time in favorable cases</li>
              <li>Average Case: O(n) - typically better than basic algorithms</li>
              <li>Worst Case: O(m×n) - in pathological cases</li>
            </ul>
            <p className="text-blue-600 dark:text-blue-400 mt-2">Note: Uses preprocessing to create a shift table for efficiency</p>
          </div>
        )}
        
        {algorithm === 'boyer-moore' && (
          <div className="space-y-2">
            <p>Boyer-Moore is considered one of the most efficient string matching algorithms, using bad character and good suffix rules to skip portions of the text.</p>
            <p className="font-medium mt-2">Time Complexity:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Best Case: O(n/m) - sublinear time in favorable cases</li>
              <li>Average Case: O(n) - typically much better than O(n)</li>
              <li>Worst Case: O(m×n) - when many matches occur</li>
            </ul>
            <p className="text-purple-600 dark:text-purple-400 mt-2">Note: Often outperforms other algorithms in practical scenarios</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StringMatchingPage;

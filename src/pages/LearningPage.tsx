import React, { useState } from 'react';
import { AlgorithmType } from '../types';
import LearningResources from '../components/LearningResources';
import { Button } from '@/components/ui/button';

interface LearningPageProps {
  algorithm?: AlgorithmType;
}

const LearningPage: React.FC<LearningPageProps> = ({ algorithm: initialAlgorithm }) => {
  // Use the algorithm passed from parent or default to undefined (overview page)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType | undefined>(initialAlgorithm);

  // Group algorithms by category
  const algorithmsByCategory = {
    "Basic Sorts": [
      { value: 'bubble', label: 'Bubble Sort' },
      { value: 'selection', label: 'Selection Sort' },
      { value: 'insertion', label: 'Insertion Sort' },
      { value: 'cocktail', label: 'Cocktail Sort' }
    ],
    "Efficient Sorts": [
      { value: 'merge', label: 'Merge Sort' },
      { value: 'quick', label: 'Quick Sort' },
      { value: 'heap', label: 'Heap Sort' },
      { value: 'shell', label: 'Shell Sort' }
    ],
    "Linear Time Sorts": [
      { value: 'counting', label: 'Counting Sort' },
      { value: 'radix', label: 'Radix Sort' },
      { value: 'bucket', label: 'Bucket Sort' }
    ],
    "Fun Sorts": [
      { value: 'bogo', label: 'Bogo Sort' }
    ],
    "Search Algorithms": [
      { value: 'linear', label: 'Linear Search' },
      { value: 'binary', label: 'Binary Search' },
      { value: 'ternary', label: 'Ternary Search' }
    ],
    "String Matching": [
      { value: 'naive', label: 'Naive Search' },
      { value: 'horspool', label: 'Horspool Algorithm' },
      { value: 'boyer-moore', label: 'Boyer-Moore' }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Algorithm Learning Resources</h2>
        <p className="text-muted-foreground mb-4">
          Select an algorithm to view detailed information about it, 
          including time and space complexity, how it works, advantages, disadvantages, and pseudocode.
        </p>

        <div className="space-y-4">
          {Object.entries(algorithmsByCategory).map(([category, algorithms]) => (
            <div key={category} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {algorithms.map(alg => (
                  <Button
                    key={alg.value}
                    variant={selectedAlgorithm === alg.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedAlgorithm(alg.value as AlgorithmType)}
                  >
                    {alg.label}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-4 pt-4 border-t">
            <Button
              variant={selectedAlgorithm === undefined ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedAlgorithm(undefined)}
            >
              Overview
            </Button>
          </div>
        </div>
      </div>

      <LearningResources algorithm={selectedAlgorithm} />
    </div>
  );
};

export default LearningPage;

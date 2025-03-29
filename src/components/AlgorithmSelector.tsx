import { AlgorithmType } from '../types';
import { Button } from './ui/button';
// import { cn } from '@/lib/utils';

interface AlgorithmSelectorProps {
  currentAlgorithm: AlgorithmType;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({ 
  currentAlgorithm, 
  onAlgorithmChange 
}) => {
  const algorithms: { value: AlgorithmType; label: string; category: string }[] = [
    { value: 'bubble', label: 'Bubble Sort', category: 'Basic Sorts' },
    { value: 'selection', label: 'Selection Sort', category: 'Basic Sorts' },
    { value: 'insertion', label: 'Insertion Sort', category: 'Basic Sorts' },
    { value: 'merge', label: 'Merge Sort', category: 'Efficient Sorts' },
    { value: 'quick', label: 'Quick Sort', category: 'Efficient Sorts' },
    { value: 'heap', label: 'Heap Sort', category: 'Efficient Sorts' },
    { value: 'radix', label: 'Radix Sort', category: 'Linear Time Sorts' },
    { value: 'counting', label: 'Counting Sort', category: 'Linear Time Sorts' },
    { value: 'bucket', label: 'Bucket Sort', category: 'Linear Time Sorts' },
    { value: 'shell', label: 'Shell Sort', category: 'Special Sorts' },
    { value: 'cocktail', label: 'Cocktail Sort', category: 'Special Sorts' },
    { value: 'bogo', label: 'Bogo Sort', category: 'Fun Sorts (Don\'t Use!)' }
  ];

  // Group algorithms by category
  const categories = algorithms.reduce<Record<string, typeof algorithms>>((acc, algorithm) => {
    if (!acc[algorithm.category]) {
      acc[algorithm.category] = [];
    }
    acc[algorithm.category].push(algorithm);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Algorithm</h3>
      
      {Object.entries(categories).map(([category, algs]) => (
        <div key={category} className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">{category}</h4>
          <div className="flex flex-wrap gap-2">
            {algs.map((algo) => (
              <Button
                key={algo.value}
                onClick={() => onAlgorithmChange(algo.value)}
                variant={currentAlgorithm === algo.value ? "default" : "outline"}
                size="sm"
              >
                {algo.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlgorithmSelector;

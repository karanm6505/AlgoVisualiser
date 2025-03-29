import React from 'react';
import { ArrayBar } from '@/types';

interface ArrayStatsProps {
  array: ArrayBar[];
}

const ArrayStats: React.FC<ArrayStatsProps> = ({ array }) => {
  // Calculate statistics
  const values = array.map(bar => bar.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const avg = sum / values.length;
  
  // Check if array is sorted
  const isSorted = values.every((val, i) => i === 0 || val >= values[i - 1]);
  
  // Count occurrences of each unique value
  const valueCounts = values.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  // Find most frequent value - but we don't use it in the UI
  // Remove the unused 'mode' variable that's causing the build error
  let maxCount = 0;
  for (const [_, count] of Object.entries(valueCounts)) {
    if (count > maxCount) {
      maxCount = count;
      // Removed: mode = parseInt(value);
    }
  }
  
  const hasDuplicates = Object.values(valueCounts).some(count => count > 1);

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-sm p-4 border w-full mb-4">
      <h3 className="text-sm font-medium mb-2">Array Statistics</h3>
      <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
        <div><span className="font-medium">Size:</span> {array.length} elements</div>
        <div><span className="font-medium">Min:</span> {min}</div>
        <div><span className="font-medium">Max:</span> {max}</div>
        <div><span className="font-medium">Average:</span> {avg.toFixed(1)}</div>
        <div><span className="font-medium">Sorted:</span> {isSorted ? "Yes" : "No"}</div>
        <div><span className="font-medium">Has Duplicates:</span> {hasDuplicates ? "Yes" : "No"}</div>
      </div>
    </div>
  );
};

export default ArrayStats;

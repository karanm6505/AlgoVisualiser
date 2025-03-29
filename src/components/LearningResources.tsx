import React from 'react';
import { AlgorithmType } from '@/types';
import AlgorithmDescription from './AlgorithmDescription';

interface LearningResourcesProps {
  algorithm?: AlgorithmType;
}

const LearningResources: React.FC<LearningResourcesProps> = ({ algorithm }) => {
  return (
    <div className="space-y-6">
      {algorithm ? (
        <div className="bg-card border rounded-lg p-6">
          <AlgorithmDescription algorithm={algorithm} />
        </div>
      ) : (
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Algorithm Learning Resources</h2>
          <p className="text-muted-foreground mb-6">
            Select an algorithm from the visualization tab to view detailed information about it, 
            including time and space complexity, how it works, advantages, disadvantages, and pseudocode.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Basic Sorts</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Bubble Sort</li>
                <li>Selection Sort</li>
                <li>Insertion Sort</li>
                <li>Cocktail Sort</li>
              </ul>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Efficient Sorts</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Merge Sort</li>
                <li>Quick Sort</li>
                <li>Heap Sort</li>
                <li>Shell Sort</li>
              </ul>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Linear Time Sorts</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Counting Sort</li>
                <li>Radix Sort</li>
                <li>Bucket Sort</li>
              </ul>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Search Algorithms</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Linear Search</li>
                <li>Binary Search</li>
                <li>Ternary Search</li>
              </ul>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">String Matching</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Naive String Matching</li>
                <li>Horspool Algorithm</li>
                <li>Boyer-Moore Algorithm</li>
              </ul>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Fun Sort</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Bogo Sort (Randomized)</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningResources;

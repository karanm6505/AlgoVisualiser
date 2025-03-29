import React, { useState, useEffect } from 'react';
import { AlgorithmType, ArrayBar } from '@/types';
import { Button } from './ui/button';

interface StepByStepVisualizerProps {
  algorithm: AlgorithmType;
  arraySize: number;
}

interface Step {
  arrayState: ArrayBar[];
  explanation: string;
  title: string;
}

const StepByStepVisualizer: React.FC<StepByStepVisualizerProps> = ({ algorithm, arraySize }) => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    generateNewArray();
  }, [arraySize]);

  useEffect(() => {
    if (steps.length > 0) {
      setArray([...steps[currentStepIndex].arrayState]);
    }
  }, [currentStepIndex, steps]);

  const generateNewArray = () => {
    const newArray: ArrayBar[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * (500 - 5 + 1) + 5),
        state: 'default'
      });
    }
    setArray(newArray);
    setSteps([]);
    setCurrentStepIndex(0);
  };

  const generateSteps = async () => {
    setIsGenerating(true);
    setSteps([]);
    setCurrentStepIndex(0);

    // Generate steps based on selected algorithm
    const generatedSteps: Step[] = [];
    
    // Just an example for bubble sort - in a real implementation,
    // we would generate actual steps from algorithm execution
    const arrayCopy = [...array].map(item => ({...item}));
    const n = arrayCopy.length;
    
    generatedSteps.push({
      arrayState: [...arrayCopy],
      explanation: "We start with an unsorted array.",
      title: "Initial Array"
    });
    
    if (algorithm === 'bubble') {
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          // Compare adjacent elements
          const comparisonState = [...arrayCopy];
          comparisonState[j].state = 'comparing';
          comparisonState[j + 1].state = 'comparing';
          
          generatedSteps.push({
            arrayState: [...comparisonState],
            explanation: `Comparing elements at indices ${j} (value: ${arrayCopy[j].value}) and ${j+1} (value: ${arrayCopy[j+1].value})`,
            title: `Comparison: Step ${generatedSteps.length}`
          });
          
          // Reset comparison state
          comparisonState[j].state = 'default';
          comparisonState[j + 1].state = 'default';
          
          // Swap if needed
          if (arrayCopy[j].value > arrayCopy[j + 1].value) {
            const temp = arrayCopy[j];
            arrayCopy[j] = arrayCopy[j + 1];
            arrayCopy[j + 1] = temp;
            
            generatedSteps.push({
              arrayState: [...arrayCopy],
              explanation: `Swapped elements ${temp.value} and ${arrayCopy[j].value} because ${temp.value} > ${arrayCopy[j].value}`,
              title: `Swap: Step ${generatedSteps.length}`
            });
          }
        }
        
        // Mark the largest element in current pass as sorted
        arrayCopy[n - i - 1].state = 'sorted';
        
        generatedSteps.push({
          arrayState: [...arrayCopy],
          explanation: `Element at index ${n-i-1} with value ${arrayCopy[n-i-1].value} is now in its correct sorted position.`,
          title: `Complete Pass ${i+1}`
        });
      }
      
      // Mark the first element as sorted too
      arrayCopy[0].state = 'sorted';
      
      generatedSteps.push({
        arrayState: [...arrayCopy],
        explanation: "The array is now completely sorted.",
        title: "Final Sorted Array"
      });
    }
    
    setSteps(generatedSteps);
    setIsGenerating(false);
    setCurrentStepIndex(0);
  };

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prevIndex => prevIndex + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prevIndex => prevIndex - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Step-by-Step Visualization</h2>
        
        <div className="array-container mb-6">
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
        
        <div className="flex gap-4 justify-center mb-6">
          <Button variant="outline" onClick={generateNewArray} disabled={isGenerating}>
            Generate New Array
          </Button>
          <Button onClick={generateSteps} disabled={isGenerating}>
            {isGenerating ? 'Generating Steps...' : 'Generate Steps'}
          </Button>
        </div>
        
        {steps.length > 0 && (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{steps[currentStepIndex].title}</h3>
              <p>{steps[currentStepIndex].explanation}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Step {currentStepIndex + 1} of {steps.length}</span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={goToPrevStep} 
                  disabled={currentStepIndex === 0}
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={goToNextStep} 
                  disabled={currentStepIndex === steps.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepByStepVisualizer;

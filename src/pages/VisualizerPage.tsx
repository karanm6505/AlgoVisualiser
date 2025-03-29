import { useState, useEffect } from 'react';
import { AlgorithmType, ArrayBar } from '../types';
import SortingVisualizer from '../components/SortingVisualizer';
import AlgorithmSelector from '../components/AlgorithmSelector';
import ArrayStats from '../components/ArrayStats';

interface VisualizerPageProps {
  algorithm: AlgorithmType;
  setAlgorithm: (algorithm: AlgorithmType) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
}

const VisualizerPage: React.FC<VisualizerPageProps> = ({
  algorithm, 
  setAlgorithm,
  speed, 
  setSpeed,
  arraySize,
  setArraySize
}) => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  
  useEffect(() => {
    generateArray();
  }, [arraySize]);
  
  const generateArray = () => {
    const newArray: ArrayBar[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * (500 - 5 + 1) + 5),
        state: 'default'
      });
    }
    setArray(newArray);
  };

  return (
    <div className="space-y-8">
      <AlgorithmSelector 
        currentAlgorithm={algorithm} 
        onAlgorithmChange={setAlgorithm} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Speed: {speed}
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Array Size: {arraySize}
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      
      <ArrayStats array={array} />
      
      <SortingVisualizer 
        algorithm={algorithm} 
        speed={speed} 
        arraySize={arraySize}
      />
    </div>
  );
};

export default VisualizerPage;

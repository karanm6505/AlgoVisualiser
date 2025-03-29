import React from 'react';
import AlgorithmComparison from '../components/AlgorithmComparison';

interface ComparisonPageProps {
  arraySize: number;
  speed: number;
}

const ComparisonPage: React.FC<ComparisonPageProps> = ({ arraySize, speed }) => {
  return (
    <div>
      <AlgorithmComparison arraySize={arraySize} speed={speed} />
    </div>
  );
};

export default ComparisonPage;

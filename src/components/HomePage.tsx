import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-10">
      <section className="bg-card text-card-foreground rounded-lg shadow-sm p-8 text-center border">
        <h2 className="text-3xl font-bold mb-4">Welcome to Algorithm Visualizer</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore sorting algorithms through interactive visualizations
        </p>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold border-b pb-2">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-all">
            <h4 className="text-lg font-semibold mb-2">Interactive Visualization</h4>
            <p className="text-muted-foreground">Watch algorithms in action with real-time visualization</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-all">
            <h4 className="text-lg font-semibold mb-2">Multiple Algorithms</h4>
            <p className="text-muted-foreground">Compare different sorting techniques and their efficiency</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border hover:shadow-md transition-all">
            <h4 className="text-lg font-semibold mb-2">Adjustable Speed</h4>
            <p className="text-muted-foreground">Control the visualization speed to understand each step</p>
          </div>
        </div>
      </section>
      
      <section className="space-y-4">
        <h3 className="text-2xl font-bold border-b pb-2">Available Algorithms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h4 className="text-lg font-semibold mb-2">Basic Sorts</h4>
            <ul className="space-y-1 list-disc pl-5">
              <li><strong>Bubble Sort</strong> - O(n²) - Simple comparison-based sort</li>
              <li><strong>Selection Sort</strong> - O(n²) - In-place comparison sort</li>
              <li><strong>Insertion Sort</strong> - O(n²) - Builds sorted array one item at a time</li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h4 className="text-lg font-semibold mb-2">Efficient Sorts</h4>
            <ul className="space-y-1 list-disc pl-5">
              <li><strong>Merge Sort</strong> - O(n log n) - Divide and conquer algorithm</li>
              <li><strong>Quick Sort</strong> - O(n log n) average - Partition-based sort</li>
              <li><strong>Heap Sort</strong> - O(n log n) - Comparison-based sort using binary heap</li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h4 className="text-lg font-semibold mb-2">Linear Time Sorts</h4>
            <ul className="space-y-1 list-disc pl-5">
              <li><strong>Counting Sort</strong> - O(n+k) - Non-comparative integer sorting algorithm</li>
              <li><strong>Radix Sort</strong> - O(nk) - Non-comparative integer sort</li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h4 className="text-lg font-semibold mb-2">Special Sorts</h4>
            <ul className="space-y-1 list-disc pl-5">
              <li><strong>Shell Sort</strong> - O(n log² n) - Generalization of insertion sort</li>
              <li><strong>Cocktail Sort</strong> - O(n²) - Bidirectional bubble sort</li>
              <li><strong>Bucket Sort</strong> - O(n+k) - Distribution sort</li>
              <li><strong>Bogo Sort</strong> - O(n×n!) - Highly inefficient randomized sort</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="space-y-4 bg-card p-6 rounded-lg shadow-sm border">
        <h3 className="text-2xl font-bold mb-4">How to Use</h3>
        <ol className="space-y-2 list-decimal pl-5">
          <li>Select a sorting algorithm from the options above</li>
          <li>Adjust the speed and array size using the sliders</li>
          <li>Click "Generate New Array" to create a new random data set</li>
          <li>Click "Start Sorting" to begin the visualization</li>
        </ol>
        <p className="my-4">The colored bars represent the current state of elements:</p>
        <ul className="flex flex-wrap gap-4">
          <li className="flex items-center"><span className="color-sample default"></span> Default - Unsorted element</li>
          <li className="flex items-center"><span className="color-sample comparing"></span> Comparing - Elements being compared</li>
          <li className="flex items-center"><span className="color-sample sorted"></span> Sorted - Elements in their final position</li>
          <li className="flex items-center"><span className="color-sample pivot"></span> Pivot - Pivot element (in Quick Sort)</li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;

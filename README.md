# Algorithm Visualizer

A vibe-coded, comprehensive, interactive algorithm visualization tool built with React and TypeScript that helps users understand and learn various algorithms through visual animations.

## Overview

Algorithm Visualizer is an educational web application designed to make learning algorithms intuitive and engaging. It provides real-time visualizations of sorting algorithms, searching algorithms, and string-matching algorithms with step-by-step animations, detailed information about time and space complexity, and explanations of how each algorithm works.

## Features

- **Interactive Visualizations**: Watch algorithms in action with adjustable speed and array size
- **Comprehensive Algorithm Coverage**:
  - **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Radix Sort, Shell Sort, Cocktail Sort, Counting Sort, Bucket Sort, Bogo Sort
  - **Search Algorithms**: Linear Search, Binary Search, Ternary Search
  - **String Matching Algorithms**: Naive Search, Horspool Algorithm, Boyer-Moore Algorithm
- **Algorithm Information**: View detailed information about each algorithm, including:
  - Time and space complexity
  - Advantages and disadvantages
  - Step-by-step explanations
  - Pseudocode implementation
- **Algorithm Comparison**: Compare the performance of different algorithms side by side
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes

## Technology Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/algorithm-visualizer.git
   cd algorithm-visualizer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Home Page**: Overview of the application with links to different algorithm categories
2. **Visualizer Page**: Select and visualize sorting algorithms
   - Choose an algorithm from the dropdown menu
   - Adjust the speed and array size
   - Click "Generate New Array" to create a random array
   - Click "Start Sorting" to begin the visualization
3. **Search Page**: Visualize search algorithms
   - Select a search algorithm
   - Set a target value
   - Adjust visualization speed
   - Click "Start Search" to begin the search visualization
4. **String Matching Page**: Visualize string matching algorithms
   - Enter text and pattern strings
   - Select a string matching algorithm
   - Adjust visualization speed
   - Click "Start Search" to begin the pattern matching visualization
5. **Learning Page**: Access detailed information about algorithms
   - Select an algorithm to view its detailed description, time/space complexity, advantages/disadvantages, and pseudocode


## Implemented Algorithms

### Sorting Algorithms

1. **Bubble Sort** - Simple comparison-based algorithm that repeatedly steps through the list
2. **Selection Sort** - Divides the input into sorted and unsorted regions
3. **Insertion Sort** - Builds the final sorted array one item at a time
4. **Merge Sort** - Efficient divide-and-conquer algorithm with stable sorting
5. **Quick Sort** - Fast divide-and-conquer algorithm using pivot partitioning
6. **Heap Sort** - Comparison-based sort using a binary heap data structure
7. **Radix Sort** - Non-comparative integer sorting algorithm
8. **Shell Sort** - Generalization of insertion sort with diminishing increments
9. **Cocktail Sort** - Bidirectional bubble sort variant
10. **Counting Sort** - Integer sorting algorithm using key-indexed counting
11. **Bucket Sort** - Distribution sort using buckets
12. **Bogo Sort** - Highly inefficient random sort (for educational purposes)

### Search Algorithms

1. **Linear Search** - Simple sequential search through all elements
2. **Binary Search** - Efficient search in sorted arrays using divide-and-conquer
3. **Ternary Search** - Divide-and-conquer search splitting the array into three parts

### String Matching Algorithms

1. **Naive String Matching** - Brute force character-by-character comparison
2. **Horspool Algorithm** - Simplified Boyer-Moore using only the bad character rule
3. **Boyer-Moore** - Efficient pattern matching using bad character and good suffix rules


## Future Enhancements

- Additional algorithms (e.g., Tim Sort, Intro Sort, Jump Search)
- Graph algorithms visualization (e.g., DFS, BFS, Dijkstra)
- Algorithm complexity analyzer
- Code generation for multiple programming languages
- Step-by-step tutorial mode with detailed explanations

## License

This project is licensed under the MIT License - see the LICENSE file for details.





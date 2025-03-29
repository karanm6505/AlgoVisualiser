import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import VisualizerPage from './pages/VisualizerPage';
import ComparisonPage from './pages/ComparisonPage';
import LearningPage from './pages/LearningPage';
import SearchPage from './pages/SearchPage';
import StringMatchingPage from './pages/StringMatchingPage';
import { AlgorithmType } from './types';
import { ThemeProvider } from './components/theme-provider';
import { ThemeToggle } from './components/theme-toggle';
import Footer from './components/Footer';

function App() {
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
  const [speed, setSpeed] = useState<number>(50);
  const [arraySize, setArraySize] = useState<number>(50);

  return (
    <ThemeProvider defaultTheme="system" storageKey="algorithm-visualizer-theme">
      <Router>
        <div className="min-h-screen flex flex-col">
          <div className="container mx-auto py-8 px-4 flex-grow">
            <header className="mb-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Algorithm Visualizer</h1>
                <ThemeToggle />
              </div>
              
              <nav className="mt-4">
                <ul className="flex space-x-4 bg-muted p-1 rounded-md">
                  <li className="flex-1">
                    <Link to="/" className="block text-center py-2 px-4 hover:bg-muted/80 rounded-md">Home</Link>
                  </li>
                  <li className="flex-1">
                    <Link to="/visualizer" className="block text-center py-2 px-4 hover:bg-muted/80 rounded-md">Sort</Link>
                  </li>
                  <li className="flex-1">
                    <Link to="/search" className="block text-center py-2 px-4 hover:bg-muted/80 rounded-md">Search</Link>
                  </li>
                  <li className="flex-1">
                    <Link to="/string" className="block text-center py-2 px-4 hover:bg-muted/80 rounded-md">Strings</Link>
                  </li>
                  <li className="flex-1">
                    <Link to="/compare" className="block text-center py-2 px-4 hover:bg-muted/80 rounded-md">Compare</Link>
                  </li>
                  <li className="flex-1">
                    <Link to="/learn" className="block text-center py-2 px-4 hover:bg-muted/80 rounded-md">Learn</Link>
                  </li>
                </ul>
              </nav>
            </header>
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/visualizer" 
                element={
                  <VisualizerPage 
                    algorithm={algorithm} 
                    setAlgorithm={setAlgorithm}
                    speed={speed} 
                    setSpeed={setSpeed}
                    arraySize={arraySize}
                    setArraySize={setArraySize}
                  />
                } 
              />
              <Route 
                path="/search" 
                element={
                  <SearchPage
                    speed={speed}
                    arraySize={arraySize}
                  />
                } 
              />
              <Route 
                path="/string" 
                element={
                  <StringMatchingPage
                    speed={speed}
                  />
                } 
              />
              <Route 
                path="/compare" 
                element={<ComparisonPage arraySize={arraySize} speed={speed} />} 
              />
              <Route 
                path="/learn" 
                element={<LearningPage algorithm={algorithm} />} 
              />
            </Routes>
          </div>
          
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

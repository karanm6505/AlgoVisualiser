import React from 'react';
import { ArrowRightIcon, BarChart2Icon, SearchIcon, CodeIcon, GitBranchIcon, BookOpenIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-card rounded-lg shadow-md p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Algorithm Visualizer
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Learn, visualize, and understand algorithms through interactive animations
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/visualizer">
              Start Visualizing <ArrowRightIcon size={18} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/learning">
              Learn Algorithms  <BookOpenIcon size={18} />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center mb-8">Interactive Learning Experience</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sorting Algorithms */}
          <div className="bg-card border shadow-sm rounded-lg p-6 hover:shadow-md transition-all hover:border-primary/50">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <BarChart2Icon size={32} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Sorting Algorithms</h3>
            <p className="text-muted-foreground text-center mb-4">
              Visualize how different sorting methods organize data in real-time
            </p>
            <div className="flex flex-wrap gap-1 justify-center">
              <span className="text-xs bg-muted px-2 py-1 rounded">Bubble Sort</span>
              <span className="text-xs bg-muted px-2 py-1 rounded">Quick Sort</span>
              <span className="text-xs bg-muted px-2 py-1 rounded">Merge Sort</span>
              <span className="text-xs bg-muted px-2 py-1 rounded">Heap Sort</span>
              <span className="text-xs bg-muted px-2 py-1 rounded">+8 more</span>
            </div>
          </div>

          {/* Search Algorithms */}
          <div className="bg-card border shadow-sm rounded-lg p-6 hover:shadow-md transition-all hover:border-primary/50">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <SearchIcon size={32} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Search Algorithms</h3>
            <p className="text-muted-foreground text-center mb-4">
              Explore efficient ways to find elements in collections
            </p>
            <div className="flex flex-wrap gap-1 justify-center">
              <span className="text-xs bg-muted px-2 py-1 rounded">Linear Search</span>
              <span className="text-xs bg-muted px-2 py-1 rounded">Binary Search</span>
              <span className="text-xs bg-muted px-2 py-1 rounded">Ternary Search</span>
            </div>
          </div>

          {/* String Matching */}
          <div className="bg-card border shadow-sm rounded-lg p-6 hover:shadow-md transition-all hover:border-primary/50">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <CodeIcon size={32} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">String Matching</h3>
            <p className="text-muted-foreground text-center mb-4">
              Visualize pattern matching in text with different algorithms
            </p>
            <div className="flex flex-wrap gap-1 justify-center">
              <span className="text-xs bg-muted px-2 py-1 rounded">Boyer-Moore</span>
              <span className="text-xs bg-muted px-2 py-1 rounded">Horspool</span>
              <span className="text-xs bg-muted px-2 py-1 rounded">Naive Search</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-card border rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">How to Use the Visualizer</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">1</div>
            <h3 className="text-lg font-semibold">Select an Algorithm</h3>
            <p className="text-muted-foreground">
              Choose from our extensive collection of sorting, searching, and string matching algorithms.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">2</div>
            <h3 className="text-lg font-semibold">Customize Parameters</h3>
            <p className="text-muted-foreground">
              Adjust speed, array size, and other parameters to see how they affect algorithm performance.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">3</div>
            <h3 className="text-lg font-semibold">Watch & Learn</h3>
            <p className="text-muted-foreground">
              Observe the animation and understand the logic behind each algorithm step by step.
            </p>
          </div>
        </div>
      </section>

      {/* Algorithm Categories */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center mb-6">Algorithm Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center mb-4 gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <GitBranchIcon size={20} />
              </div>
              <h3 className="text-xl font-semibold">Sorting Algorithms</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium mb-2">Basic Sorts</h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Bubble Sort</li>
                  <li>Selection Sort</li>
                  <li>Insertion Sort</li>
                  <li>Cocktail Sort</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Efficient Sorts</h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Quick Sort</li>
                  <li>Merge Sort</li>
                  <li>Heap Sort</li>
                  <li>Shell Sort</li>
                </ul>
              </div>
            </div>
            
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/visualizer">View Sorting Algorithms</Link>
            </Button>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center mb-4 gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <SearchIcon size={20} />
              </div>
              <h3 className="text-xl font-semibold">Search & Pattern Matching</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium mb-2">Search</h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Linear Search</li>
                  <li>Binary Search</li>
                  <li>Ternary Search</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">String Matching</h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                  <li>Naive Search</li>
                  <li>Horspool Algorithm</li>
                  <li>Boyer-Moore</li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/search">Search Algorithms</Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/string-matching">String Matching</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Explore Algorithms?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Dive into our interactive visualizations to deepen your understanding of fundamental algorithms used in computer science and software development.
        </p>
        <Button asChild size="lg">
          <Link to="/learning">Start Learning Now</Link>
        </Button>
      </section>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { Github, Code, BookOpen, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t py-8 px-4 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Algorithm Visualizer</h3>
            <p className="text-sm text-muted-foreground">
              An interactive tool for visualizing and learning about sorting algorithms through animations.
            </p>
          </div>
          
          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.geeksforgeeks.org/sorting-algorithms/" 
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Sorting Algorithms Guide</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://visualgo.net/en/sorting" 
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>VisuAlgo Sorting</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.bigocheatsheet.com/" 
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Code className="w-4 h-4" />
                  <span>Big-O Complexity Chart</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Connect */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                asChild
              >
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                asChild
              >
                <a 
                  href="https://stackoverflow.com/questions/tagged/algorithms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Code className="w-4 h-4" />
                  <span>Stack Overflow</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Copyright Line */}
        <div className="border-t mt-6 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Algorithm Visualizer. Educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

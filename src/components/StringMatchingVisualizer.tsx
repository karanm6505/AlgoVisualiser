import React, { useState, useEffect } from 'react';
import { StringMatchingAlgorithmType, CharacterBox } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { naiveStringMatching, horspool, boyerMoore } from '../algorithms/string-matching';
import AlgorithmInfo from './AlgorithmInfo';

interface StringMatchingVisualizerProps {
  algorithm: StringMatchingAlgorithmType;
  speed: number;
}

const StringMatchingVisualizer: React.FC<StringMatchingVisualizerProps> = ({ 
  algorithm, 
  speed 
}) => {
  const [text, setText] = useState<string>("ABABDABACDABABCABAB");
  const [pattern, setPattern] = useState<string>("ABABCABAB");
  const [textChars, setTextChars] = useState<CharacterBox[]>([]);
  const [patternChars, setPatternChars] = useState<CharacterBox[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [matches, setMatches] = useState<number[]>([]);
  const [shiftTable, setShiftTable] = useState<Map<string, number>>(new Map());
  const [badCharTable, setBadCharTable] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    // Initialize character arrays when text or pattern changes
    setTextChars(text.split('').map(char => ({ char, state: 'default' })));
    setPatternChars(pattern.split('').map(char => ({ char, state: 'default' })));
    setMatches([]);
    setShiftTable(new Map());
    setBadCharTable(new Map());
  }, [text, pattern]);

  const startSearch = async () => {
    if (searching) return;
    if (!text || !pattern) return;

    setSearching(true);
    setMatches([]);
    
    try {
      const animationSpeed = Math.pow(101 - speed, 1.5);
      let foundMatches: number[] = [];
      
      switch (algorithm) {
        case 'naive':
          foundMatches = await naiveStringMatching(text, pattern, setTextChars, setPatternChars, animationSpeed);
          break;
        case 'horspool':
          foundMatches = await horspool(text, pattern, setTextChars, setPatternChars, setShiftTable, animationSpeed);
          break;
        case 'boyer-moore':
          foundMatches = await boyerMoore(text, pattern, setTextChars, setPatternChars, setBadCharTable, animationSpeed);
          break;
      }
      
      setMatches(foundMatches);
      
    } catch (error) {
      console.error("String matching error:", error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Text</label>
          <Input 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            disabled={searching}
            placeholder="Enter text to search in"
            className="font-mono"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Pattern</label>
          <Input 
            value={pattern} 
            onChange={(e) => setPattern(e.target.value)}
            disabled={searching}
            placeholder="Enter pattern to search for"
            className="font-mono"
          />
        </div>
      </div>
      
      <Button 
        onClick={startSearch} 
        disabled={searching || !text || !pattern}
        className="max-w-xs mx-auto"
      >
        {searching ? 'Searching...' : 'Start Search'}
      </Button>
      
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Visualization</h3>
        
        <div className="space-y-6">
          {/* Text visualization */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Text:</label>
            <div className="flex flex-wrap border p-2 rounded-md min-h-14 font-mono text-lg">
              {textChars.map((char, idx) => (
                <div 
                  key={idx} 
                  className={`
                    w-8 h-8 flex items-center justify-center m-0.5 rounded-md
                    ${char.state === 'comparing' ? 'bg-yellow-200 dark:bg-yellow-900 border-yellow-400' : 
                      char.state === 'matched' ? 'bg-green-200 dark:bg-green-900 border-green-400' :
                      char.state === 'mismatched' ? 'bg-red-200 dark:bg-red-900 border-red-400' :
                      'bg-muted border-muted-foreground/20'}
                    border
                  `}
                >
                  {char.char}
                </div>
              ))}
            </div>
          </div>
          
          {/* Pattern visualization */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Pattern:</label>
            <div className="flex flex-wrap border p-2 rounded-md min-h-14 font-mono text-lg">
              {patternChars.map((char, idx) => (
                <div 
                  key={idx} 
                  className={`
                    w-8 h-8 flex items-center justify-center m-0.5 rounded-md
                    ${char.state === 'comparing' ? 'bg-yellow-200 dark:bg-yellow-900 border-yellow-400' : 
                      char.state === 'matched' ? 'bg-green-200 dark:bg-green-900 border-green-400' :
                      char.state === 'mismatched' ? 'bg-red-200 dark:bg-red-900 border-red-400' :
                      'bg-muted border-muted-foreground/20'}
                    border
                  `}
                >
                  {char.char}
                </div>
              ))}
            </div>
          </div>
          
          {/* Algorithm-specific visualizations */}
          {algorithm === 'horspool' && shiftTable.size > 0 && (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Shift Table:</label>
              <div className="flex flex-wrap border p-2 rounded-md">
                {[...shiftTable.entries()].map(([char, shift], idx) => (
                  <div key={idx} className="m-1 p-1 bg-blue-100 dark:bg-blue-900 rounded flex items-center border border-blue-400">
                    <span className="font-mono">'{char}'</span>
                    <span className="px-1">→</span>
                    <span className="font-mono">{shift}</span>
                  </div>
                ))}
                <div className="m-1 p-1 bg-blue-100 dark:bg-blue-900 rounded flex items-center border border-blue-400">
                  <span className="font-mono">'others'</span>
                  <span className="px-1">→</span>
                  <span className="font-mono">{pattern.length}</span>
                </div>
              </div>
            </div>
          )}
          
          {algorithm === 'boyer-moore' && badCharTable.size > 0 && (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Bad Character Table:</label>
              <div className="flex flex-wrap border p-2 rounded-md">
                {[...badCharTable.entries()].map(([char, shift], idx) => (
                  <div key={idx} className="m-1 p-1 bg-blue-100 dark:bg-blue-900 rounded flex items-center border border-blue-400">
                    <span className="font-mono">'{char}'</span>
                    <span className="px-1">→</span>
                    <span className="font-mono">{shift}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Match results */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Results:</label>
            <div className="border p-4 rounded-md">
              {matches.length > 0 ? (
                <div>
                  <p className="font-medium">
                    Found {matches.length} match{matches.length !== 1 ? 'es' : ''} at position{matches.length !== 1 ? 's' : ''}:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {matches.map((pos, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md font-mono">
                        {pos}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                searching ? (
                  <p>Searching...</p>
                ) : (
                  <p>No matches found</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-muted p-4 rounded-md w-full">
        <h3 className="font-medium mb-2">Color Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-muted-foreground/30 mr-2 border border-muted-foreground/20 rounded-sm"></div>
            <span className="text-sm">Default</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-200 dark:bg-yellow-900 mr-2 border border-yellow-400 rounded-sm"></div>
            <span className="text-sm">Comparing</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-200 dark:bg-green-900 mr-2 border border-green-400 rounded-sm"></div>
            <span className="text-sm">Matched</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-200 dark:bg-red-900 mr-2 border border-red-400 rounded-sm"></div>
            <span className="text-sm">Mismatched</span>
          </div>
        </div>
      </div>
      
      <AlgorithmInfo algorithm={algorithm} />
    </div>
  );
};

export default StringMatchingVisualizer;

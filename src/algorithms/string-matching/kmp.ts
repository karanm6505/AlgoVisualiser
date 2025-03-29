import { CharacterBox } from '../../types';

export const kmp = async (
  text: string,
  pattern: string,
  setTextChars: React.Dispatch<React.SetStateAction<CharacterBox[]>>,
  setPatternChars: React.Dispatch<React.SetStateAction<CharacterBox[]>>,
  setPiTable: React.Dispatch<React.SetStateAction<number[]>>,
  animationSpeed: number,
  sleep = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms))
): Promise<number[]> => {
  const textChars: CharacterBox[] = text.split('').map(char => ({ char, state: 'default' }));
  const patternChars: CharacterBox[] = pattern.split('').map(char => ({ char, state: 'default' }));
  
  setTextChars([...textChars]);
  setPatternChars([...patternChars]);
  
  const matches: number[] = [];
  
  // Edge cases
  if (pattern.length === 0) return [0];
  if (pattern.length > text.length) return [];
  
  // Compute the prefix function (pi table)
  const pi = await computePrefixFunction(pattern, patternChars, setPiTable, animationSpeed, sleep);
  
  // Main KMP algorithm
  let j = 0; // Index for pattern
  
  for (let i = 0; i < text.length; i++) {
    // Reset states for this iteration
    for (let k = 0; k < textChars.length; k++) {
      textChars[k].state = 'default';
    }
    for (let k = 0; k < patternChars.length; k++) {
      patternChars[k].state = 'default';
    }
    
    // Highlight current text position
    textChars[i].state = 'comparing';
    setTextChars([...textChars]);
    setPatternChars([...patternChars]);
    await sleep(animationSpeed);
    
    // Find matches for pattern
    while (j > 0 && text[i] !== pattern[j]) {
      // Using prefix function to skip comparisons
      j = pi[j - 1];
      
      // Visualize the shift in pattern
      for (let k = 0; k < j; k++) {
        patternChars[k].state = 'comparing';
      }
      setPatternChars([...patternChars]);
      await sleep(animationSpeed);
    }
    
    // If characters match, advance in pattern
    if (text[i] === pattern[j]) {
      textChars[i].state = 'matched';
      patternChars[j].state = 'matched';
      j++;
    } else {
      textChars[i].state = 'mismatched';
      if (j < patternChars.length) {
        patternChars[j].state = 'mismatched';
      }
    }
    
    setTextChars([...textChars]);
    setPatternChars([...patternChars]);
    await sleep(animationSpeed);
    
    // If we've matched the whole pattern
    if (j === pattern.length) {
      matches.push(i - j + 1);
      
      // Highlight full match
      for (let k = 0; k < pattern.length; k++) {
        textChars[i - pattern.length + 1 + k].state = 'matched';
      }
      setTextChars([...textChars]);
      await sleep(animationSpeed * 2);
      
      // Reset j using prefix function to find the next match
      j = pi[j - 1];
    }
  }
  
  return matches;
};

// Compute prefix function (pi table) for KMP algorithm
const computePrefixFunction = async (
  pattern: string,
  patternChars: CharacterBox[],
  setPiTable: React.Dispatch<React.SetStateAction<number[]>>,
  animationSpeed: number,
  sleep: (ms: number) => Promise<void>
): Promise<number[]> => {
  const pi = new Array(pattern.length).fill(0);
  setPiTable([...pi]);
  
  let j = 0;
  
  for (let i = 1; i < pattern.length; i++) {
    // Reset visual states
    for (let k = 0; k < patternChars.length; k++) {
      patternChars[k].state = 'default';
    }
    
    // Highlight current position being computed
    patternChars[i].state = 'comparing';
    
    while (j > 0 && pattern[i] !== pattern[j]) {
      j = pi[j - 1];
      
      // Visualize looking back at previous prefix
      patternChars[j].state = 'comparing';
    }
    
    if (pattern[i] === pattern[j]) {
      j++;
      patternChars[j-1].state = 'matched';
    }
    
    pi[i] = j;
    setPiTable([...pi]);
    await sleep(animationSpeed);
  }
  
  return pi;
};

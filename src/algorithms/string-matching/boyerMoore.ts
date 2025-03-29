import { CharacterBox } from '../../types';

export const boyerMoore = async (
  text: string,
  pattern: string,
  setTextChars: React.Dispatch<React.SetStateAction<CharacterBox[]>>,
  setPatternChars: React.Dispatch<React.SetStateAction<CharacterBox[]>>,
  setBadCharTable: React.Dispatch<React.SetStateAction<Map<string, number>>>,
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
  
  // Preprocess - create bad character table
  const badCharTable = new Map<string, number>();
  
  // Default is pattern.length for any character not in pattern
  for (let i = 0; i < pattern.length - 1; i++) {
    // Visualize processing each character
    patternChars[i].state = 'comparing';
    setPatternChars([...patternChars]);
    await sleep(animationSpeed / 2);
    
    // Store rightmost occurrence of each character (except the last one)
    badCharTable.set(pattern[i], pattern.length - 1 - i);
    
    // Update visualization
    patternChars[i].state = 'default';
    setPatternChars([...patternChars]);
    setBadCharTable(new Map(badCharTable));
    await sleep(animationSpeed / 2);
  }
  
  // Main Boyer-Moore algorithm
  let shift = 0;
  while (shift <= text.length - pattern.length) {
    // Reset visual states
    for (let i = 0; i < textChars.length; i++) {
      textChars[i].state = 'default';
    }
    for (let i = 0; i < patternChars.length; i++) {
      patternChars[i].state = 'default';
    }
    
    // Visualize current alignment
    for (let i = 0; i < pattern.length; i++) {
      if (shift + i < text.length) {
        textChars[shift + i].state = 'comparing';
      }
    }
    setTextChars([...textChars]);
    await sleep(animationSpeed);
    
    let j = pattern.length - 1;
    
    // Compare starting from the right side of pattern
    while (j >= 0 && pattern[j] === text[shift + j]) {
      textChars[shift + j].state = 'matched';
      patternChars[j].state = 'matched';
      setTextChars([...textChars]);
      setPatternChars([...patternChars]);
      await sleep(animationSpeed);
      j--;
    }
    
    if (j < 0) {
      // Match found
      matches.push(shift);
      
      // Visualize full match
      for (let i = 0; i < pattern.length; i++) {
        textChars[shift + i].state = 'matched';
      }
      setTextChars([...textChars]);
      await sleep(animationSpeed * 2);
      
      // Move past this match
      shift += 1;
    } else {
      // Mismatch occurred
      textChars[shift + j].state = 'mismatched';
      patternChars[j].state = 'mismatched';
      setTextChars([...textChars]);
      setPatternChars([...patternChars]);
      await sleep(animationSpeed);
      
      // Calculate shift using bad character rule
      const badChar = text[shift + j];
      const badCharValue = badCharTable.get(badChar) || pattern.length;
      
      // The shift is maximum of 1 and value from bad character table
      const badCharShift = Math.max(1, j - badCharValue);
      
      // Apply shift
      shift += badCharShift;
      
      // Visualize shift
      await sleep(animationSpeed);
    }
  }
  
  return matches;
};

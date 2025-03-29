import { CharacterBox } from '../../types';

export const horspool = async (
  text: string,
  pattern: string,
  setTextChars: React.Dispatch<React.SetStateAction<CharacterBox[]>>,
  setPatternChars: React.Dispatch<React.SetStateAction<CharacterBox[]>>,
  setShiftTable: React.Dispatch<React.SetStateAction<Map<string, number>>>,
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
  
  // Preprocess - create shift table (bad character shift)
  const shiftTable = new Map<string, number>();
  
  // Default shift is the pattern length
  const m = pattern.length;
  
  // Fill the shift table with default value (pattern length)
  for (let i = 0; i < m - 1; i++) {
    // Visualize processing each character
    patternChars[i].state = 'comparing';
    setPatternChars([...patternChars]);
    await sleep(animationSpeed / 2);
    
    // The shift value is (pattern length - 1 - i)
    shiftTable.set(pattern[i], m - 1 - i);
    
    // Update visualization
    patternChars[i].state = 'default';
    setPatternChars([...patternChars]);
    setShiftTable(new Map(shiftTable));
    await sleep(animationSpeed / 2);
  }
  
  // Any character not in the pattern gets a shift of pattern length
  // (We'll handle this in the algorithm when a character isn't found in the shift table)
  
  // Main Horspool algorithm
  let i = 0;
  while (i <= text.length - m) {
    // Reset visual states
    for (let j = 0; j < textChars.length; j++) {
      textChars[j].state = 'default';
    }
    for (let j = 0; j < patternChars.length; j++) {
      patternChars[j].state = 'default';
    }
    
    // Visualize the current alignment
    for (let j = 0; j < m; j++) {
      if (i + j < text.length) {
        textChars[i + j].state = 'comparing';
      }
    }
    setTextChars([...textChars]);
    await sleep(animationSpeed);
    
    // Compare from right to left
    let j = m - 1;
    while (j >= 0 && pattern[j] === text[i + j]) {
      textChars[i + j].state = 'matched';
      patternChars[j].state = 'matched';
      setTextChars([...textChars]);
      setPatternChars([...patternChars]);
      await sleep(animationSpeed);
      j--;
    }
    
    // If we matched the whole pattern
    if (j < 0) {
      matches.push(i);
      
      // Keep the match highlighted
      await sleep(animationSpeed * 2);
      
      // Shift by 1 to continue search
      i += 1;
    } else {
      // Mismatch occurred
      textChars[i + j].state = 'mismatched';
      patternChars[j].state = 'mismatched';
      setTextChars([...textChars]);
      setPatternChars([...patternChars]);
      await sleep(animationSpeed);
      
      // Determine shift using bad character rule
      // Look at the mismatched text character
      const badChar = text[i + m - 1];
      
      // Shift according to the bad character rule
      const shift = shiftTable.get(badChar) || m;
      
      // Apply shift
      i += shift;
      
      // Visualize shift
      await sleep(animationSpeed);
    }
  }
  
  return matches;
};

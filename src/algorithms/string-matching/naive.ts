import { CharacterBox } from '../../types';

export const naiveStringMatching = async (
  text: string,
  pattern: string,
  setTextChars: React.Dispatch<React.SetStateAction<CharacterBox[]>>,
  setPatternChars: React.Dispatch<React.SetStateAction<CharacterBox[]>>,
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
  
  // Naive string matching algorithm
  for (let i = 0; i <= text.length - pattern.length; i++) {
    let j;
    
    // Reset states
    for (let k = 0; k < textChars.length; k++) {
      textChars[k].state = 'default';
    }
    for (let k = 0; k < patternChars.length; k++) {
      patternChars[k].state = 'default';
    }
    
    // Highlight current window
    for (let k = 0; k < pattern.length; k++) {
      if (i + k < text.length) {
        textChars[i + k].state = 'comparing';
      }
    }
    setTextChars([...textChars]);
    setPatternChars([...patternChars]);
    await sleep(animationSpeed);
    
    // Check for match at current position
    for (j = 0; j < pattern.length; j++) {
      // Highlight current character comparison
      if (i + j < text.length) {
        textChars[i + j].state = 'comparing';
        patternChars[j].state = 'comparing';
        setTextChars([...textChars]);
        setPatternChars([...patternChars]);
        await sleep(animationSpeed);
      }
      
      // If characters don't match, break
      if (text[i + j] !== pattern[j]) {
        textChars[i + j].state = 'mismatched';
        patternChars[j].state = 'mismatched';
        setTextChars([...textChars]);
        setPatternChars([...patternChars]);
        await sleep(animationSpeed);
        break;
      }
      
      // Characters match
      textChars[i + j].state = 'matched';
      patternChars[j].state = 'matched';
      setTextChars([...textChars]);
      setPatternChars([...patternChars]);
      await sleep(animationSpeed / 2);
    }
    
    // If we've matched all characters, we found a match
    if (j === pattern.length) {
      matches.push(i);
      
      // Keep the match highlighted for a moment
      await sleep(animationSpeed * 2);
    }
  }
  
  return matches;
};

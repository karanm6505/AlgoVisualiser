import { CharacterBox } from '../../types';

export const rabinKarp = async (
  text: string,
  pattern: string,
  setTextChars: React.Dispatch<React.SetStateAction<CharacterBox[]>>,
  setPatternChars: React.Dispatch<React.SetStateAction<CharacterBox[]>>,
  setHashValue: React.Dispatch<React.SetStateAction<{pattern: number, current: number}>>,
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
  
  // Choose a prime number for hash calculation
  const prime = 101;
  // Choose a number of characters in the alphabet
  const d = 256;
  
  // Calculate pattern hash
  let patternHash = 0;
  let currentWindowHash = 0;
  let h = 1;
  
  // The value of h would be pow(d, pattern.length-1) % prime
  for (let i = 0; i < pattern.length - 1; i++) {
    h = (h * d) % prime;
  }
  
  // Calculate hash value for pattern and first window of text
  for (let i = 0; i < pattern.length; i++) {
    patternHash = (d * patternHash + pattern.charCodeAt(i)) % prime;
    currentWindowHash = (d * currentWindowHash + text.charCodeAt(i)) % prime;
    
    // Highlight characters used for initial hash
    if (i < text.length) {
      textChars[i].state = 'comparing';
    }
    patternChars[i].state = 'comparing';
    
    setTextChars([...textChars]);
    setPatternChars([...patternChars]);
    setHashValue({ pattern: patternHash, current: currentWindowHash });
    await sleep(animationSpeed / 2);
  }
  
  // Reset visual states
  for (let i = 0; i < textChars.length; i++) {
    textChars[i].state = 'default';
  }
  for (let i = 0; i < patternChars.length; i++) {
    patternChars[i].state = 'default';
  }
  
  // Slide pattern over text one by one
  for (let i = 0; i <= text.length - pattern.length; i++) {
    // Highlight current window
    for (let k = 0; k < pattern.length; k++) {
      if (i + k < text.length) {
        textChars[i + k].state = 'comparing';
      }
    }
    
    setTextChars([...textChars]);
    setHashValue({ pattern: patternHash, current: currentWindowHash });
    await sleep(animationSpeed);
    
    // Check if hashes match
    if (patternHash === currentWindowHash) {
      let j;
      
      // If hashes match, check character by character
      for (j = 0; j < pattern.length; j++) {
        textChars[i + j].state = 'comparing';
        patternChars[j].state = 'comparing';
        setTextChars([...textChars]);
        setPatternChars([...patternChars]);
        await sleep(animationSpeed / 2);
        
        if (text[i + j] !== pattern[j]) {
          textChars[i + j].state = 'mismatched';
          patternChars[j].state = 'mismatched';
          setTextChars([...textChars]);
          setPatternChars([...patternChars]);
          await sleep(animationSpeed);
          break;
        }
        
        textChars[i + j].state = 'matched';
        patternChars[j].state = 'matched';
        setTextChars([...textChars]);
        setPatternChars([...patternChars]);
        await sleep(animationSpeed / 2);
      }
      
      // If all characters matched, found a pattern
      if (j === pattern.length) {
        matches.push(i);
        await sleep(animationSpeed * 2);
      }
    }
    
    // Reset visual states for next iteration
    for (let k = 0; k < textChars.length; k++) {
      textChars[k].state = 'default';
    }
    for (let k = 0; k < patternChars.length; k++) {
      patternChars[k].state = 'default';
    }
    
    // Calculate hash for next window by removing first char and adding next char
    if (i < text.length - pattern.length) {
      currentWindowHash = (d * (currentWindowHash - text.charCodeAt(i) * h) + text.charCodeAt(i + pattern.length)) % prime;
      
      // Make sure hash is positive
      if (currentWindowHash < 0) {
        currentWindowHash += prime;
      }
      
      setHashValue({ pattern: patternHash, current: currentWindowHash });
    }
  }
  
  return matches;
};

export type SortingAlgorithmType = 
  'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap' | 
  'radix' | 'shell' | 'cocktail' | 'counting' | 'bucket' | 'bogo';

export type SearchingAlgorithmType =
  'linear' | 'binary' | 'ternary';

export type StringMatchingAlgorithmType =
  'naive' | 'horspool' | 'boyer-moore';

export type AlgorithmType = SortingAlgorithmType | SearchingAlgorithmType | StringMatchingAlgorithmType;

export interface ArrayBar {
  value: number;
  state: 'default' | 'comparing' | 'sorted' | 'pivot' | 'found' | 'not-found';
}

export interface CharacterBox {
  char: string;
  state: 'default' | 'comparing' | 'matched' | 'mismatched';
}

export type AlgorithmCategory = 'sorting' | 'searching' | 'string-matching';

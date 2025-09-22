import { EliaCharacter, Level } from '@/types';

// The eliaSymbol field contains the regular letter, but when displayed with the 'elia-font' CSS class,
// it will render in the ELIA Frames™ alphabet using the NewA-Regular.ttf font
export const eliaCharacterMapping: EliaCharacter[] = [
  // Level 1: Home Row I (Index & Middle Fingers)
  { letter: 'F', eliaSymbol: 'F', fingerPosition: 'left-index', level: 1 },
  { letter: 'J', eliaSymbol: 'J', fingerPosition: 'right-index', level: 1 },
  { letter: 'D', eliaSymbol: 'D', fingerPosition: 'left-middle', level: 1 },
  { letter: 'K', eliaSymbol: 'K', fingerPosition: 'right-middle', level: 1 },

  // Level 2: Home Row II (Ring, Pinky & Thumbs)
  { letter: 'S', eliaSymbol: 'S', fingerPosition: 'left-ring', level: 2 },
  { letter: 'L', eliaSymbol: 'L', fingerPosition: 'right-ring', level: 2 },
  { letter: 'A', eliaSymbol: 'A', fingerPosition: 'left-pinky', level: 2 },
  { letter: 'G', eliaSymbol: 'G', fingerPosition: 'left-index', level: 2 },
  { letter: 'H', eliaSymbol: 'H', fingerPosition: 'right-index', level: 2 },

  // Level 3: Top Row I (E, I, R, U)
  { letter: 'E', eliaSymbol: 'E', fingerPosition: 'left-middle', level: 3 },
  { letter: 'I', eliaSymbol: 'I', fingerPosition: 'right-middle', level: 3 },
  { letter: 'R', eliaSymbol: 'R', fingerPosition: 'left-index', level: 3 },
  { letter: 'U', eliaSymbol: 'U', fingerPosition: 'right-index', level: 3 },

  // Level 4: Top Row II (The Rest)
  { letter: 'T', eliaSymbol: 'T', fingerPosition: 'left-index', level: 4 },
  { letter: 'Y', eliaSymbol: 'Y', fingerPosition: 'right-index', level: 4 },
  { letter: 'W', eliaSymbol: 'W', fingerPosition: 'left-ring', level: 4 },
  { letter: 'O', eliaSymbol: 'O', fingerPosition: 'right-ring', level: 4 },
  { letter: 'P', eliaSymbol: 'P', fingerPosition: 'right-pinky', level: 4 },
  { letter: 'Q', eliaSymbol: 'Q', fingerPosition: 'left-pinky', level: 4 },

  // Level 5: Bottom Row I (Common Keys)
  { letter: 'N', eliaSymbol: 'N', fingerPosition: 'right-index', level: 5 },
  { letter: 'M', eliaSymbol: 'M', fingerPosition: 'right-index', level: 5 },
  { letter: 'C', eliaSymbol: 'C', fingerPosition: 'left-middle', level: 5 },
  { letter: 'V', eliaSymbol: 'V', fingerPosition: 'left-index', level: 5 },
  { letter: 'B', eliaSymbol: 'B', fingerPosition: 'left-index', level: 5 },

  // Level 6: Bottom Row II (The Edges)
  { letter: 'X', eliaSymbol: 'X', fingerPosition: 'left-ring', level: 6 },
  { letter: 'Z', eliaSymbol: 'Z', fingerPosition: 'left-pinky', level: 6 },
];

export const levels: Level[] = [
  {
    id: 1,
    name: "Home Row I",
    description: "Index & Middle Fingers",
    characters: ['F', 'J', 'D', 'K'],
    practiceWords: ['fjd', 'kdj', 'fkf', 'jkj', 'dkd', 'jfj']
  },
  {
    id: 2,
    name: "Home Row II",
    description: "Ring, Pinky & Thumbs",
    characters: ['S', 'L', 'A', 'G', 'H'],
    practiceWords: ['a sad lad', 'a fall flask', 'ask a glad dad', 'gals', 'half']
  },
  {
    id: 3,
    name: "Top Row I",
    description: "E, I, R, U",
    characters: ['E', 'I', 'R', 'U'],
    practiceWords: ['dear sir', 'like a kite', 'dark fire', 'dire', 'real']
  },
  {
    id: 4,
    name: "Top Row II",
    description: "The Rest",
    characters: ['T', 'Y', 'W', 'O', 'P', 'Q'],
    practiceWords: ['water the pot', 'a quick reply', 'two people', 'quote', 'party']
  },
  {
    id: 5,
    name: "Bottom Row I",
    description: "Common Keys",
    characters: ['N', 'M', 'C', 'V', 'B'],
    practiceWords: ['very nice', 'come back', 'my brave cat', 'voice', 'cabin']
  },
  {
    id: 6,
    name: "Bottom Row II",
    description: "The Edges",
    characters: ['X', 'Z'],
    practiceWords: ['the lazy fox', 'an exact size', 'a bronze prize', 'zero', 'mixed']
  },
  {
    id: 7,
    name: "Full Alphabet Test",
    description: "Complete mastery test",
    characters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    practiceWords: ['the quick brown fox jumps over the lazy dog', 'pack my box with five dozen liquor jugs']
  }
];

export function getEliaSymbol(letter: string): string {
  const char = eliaCharacterMapping.find(c => c.letter.toLowerCase() === letter.toLowerCase());
  return char?.eliaSymbol || letter;
}

export function getCharactersByLevel(level: number): EliaCharacter[] {
  return eliaCharacterMapping.filter(char => char.level <= level);
}

export function getLevelData(level: number): Level | undefined {
  return levels.find(l => l.id === level);
}
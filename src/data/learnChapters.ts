import { Chapter, ChapterExercise } from '@/types/learn';

export const chapters: Chapter[] = [
  {
    id: 1,
    title: 'Introduction',
    description: 'Welcome to ELIA Frames',
    learnContent: {
      introduction: `Welcome to ELIA Learn - your interactive guide to the ELIA Frames™ alphabet!

ELIA Frames is a tactile alphabet system designed to be easily readable by touch. The system organizes characters into four groups based on their shapes:

1. **The Circles** (A-D, O-S, U): Characters based on circular shapes
2. **The First Squares** (E-N): Characters based on square shapes
3. **The Final Squares** (T-Z): Additional square-based characters
4. **Numbers** (0-9): Special half-circle, half-square combinations

This app will guide you through each group step by step, with interactive exercises to help you master character recognition. Take your time - there's no rush!`,
      characters: []
    },
    exercises: [],
    structuredExercises: undefined // No exercises for intro chapter
  },
  {
    id: 2,
    title: 'The Circles',
    description: 'A-D, O-S, and U',
    learnContent: {
      introduction: `The first group of ELIA characters are the Circles. These characters include A, B, C, D, O, P, Q, R, S, and U. They're called "circles" because their shapes are based on circular forms.

Learn to recognize each character and practice converting between ELIA and Roman letters.`,
      characters: [
        { roman: 'A', elia: 'A' },
        { roman: 'B', elia: 'B' },
        { roman: 'C', elia: 'C' },
        { roman: 'D', elia: 'D' },
        { roman: 'O', elia: 'O' },
        { roman: 'P', elia: 'P' },
        { roman: 'Q', elia: 'Q' },
        { roman: 'R', elia: 'R' },
        { roman: 'S', elia: 'S' },
        { roman: 'U', elia: 'U' }
      ]
    },
    exercises: [
      {
        id: '2-1',
        type: 'multiple-choice',
        question: 'What Roman letter does this ELIA character represent?',
        eliaCharacter: 'A',
        options: ['A', 'E', 'O', 'U'],
        correctAnswer: 'A'
      },
      {
        id: '2-2',
        type: 'multiple-choice',
        question: 'What Roman letter does this ELIA character represent?',
        eliaCharacter: 'B',
        options: ['B', 'D', 'P', 'R'],
        correctAnswer: 'B'
      },
      {
        id: '2-3',
        type: 'multiple-choice',
        question: 'What Roman letter does this ELIA character represent?',
        eliaCharacter: 'O',
        options: ['O', 'C', 'Q', 'D'],
        correctAnswer: 'O'
      },
      {
        id: '2-4',
        type: 'multiple-choice',
        question: 'What ELIA character represents the letter P?',
        romanCharacter: 'P',
        options: ['P', 'B', 'R', 'D'],
        correctAnswer: 'P'
      },
      {
        id: '2-5',
        type: 'flashcard',
        question: 'Translate these words to ELIA',
        words: ['broad', 'pour', 'soar', 'road', 'soup', 'crab', 'aboard'],
        correctAnswer: 'flashcard'
      }
    ],
    structuredExercises: {
      chapterId: 2,
      // Part 1: Flashcard Review Stage (NO DESCRIPTIONS - visual recognition only)
      flashcards: [
        { id: '2-fc-1', romanCharacter: 'A', eliaCharacter: 'A' },
        { id: '2-fc-2', romanCharacter: 'B', eliaCharacter: 'B' },
        { id: '2-fc-3', romanCharacter: 'C', eliaCharacter: 'C' },
        { id: '2-fc-4', romanCharacter: 'D', eliaCharacter: 'D' },
        { id: '2-fc-5', romanCharacter: 'O', eliaCharacter: 'O' },
        { id: '2-fc-6', romanCharacter: 'P', eliaCharacter: 'P' },
        { id: '2-fc-7', romanCharacter: 'Q', eliaCharacter: 'Q' },
        { id: '2-fc-8', romanCharacter: 'R', eliaCharacter: 'R' },
        { id: '2-fc-9', romanCharacter: 'S', eliaCharacter: 'S' },
        { id: '2-fc-10', romanCharacter: 'U', eliaCharacter: 'U' }
      ],
      // Part 2A: Letter Recognition Quiz
      letterRecognitionQuiz: [
        {
          id: '2-lr-1',
          type: 'elia-to-roman',
          questionText: 'What Roman letter does this ELIA character represent?',
          displayCharacter: 'A',
          choices: ['A', 'E', 'O', 'U'],
          correctAnswer: 'A'
        },
        {
          id: '2-lr-2',
          type: 'roman-to-elia',
          questionText: 'What ELIA character represents the letter B?',
          displayCharacter: 'B',
          choices: ['B', 'D', 'P', 'R'],
          correctAnswer: 'B'
        },
        {
          id: '2-lr-3',
          type: 'elia-to-roman',
          questionText: 'What Roman letter does this ELIA character represent?',
          displayCharacter: 'C',
          choices: ['C', 'O', 'Q', 'D'],
          correctAnswer: 'C'
        },
        {
          id: '2-lr-4',
          type: 'roman-to-elia',
          questionText: 'What ELIA character represents the letter D?',
          displayCharacter: 'D',
          choices: ['D', 'B', 'C', 'O'],
          correctAnswer: 'D'
        },
        {
          id: '2-lr-5',
          type: 'elia-to-roman',
          questionText: 'What Roman letter does this ELIA character represent?',
          displayCharacter: 'O',
          choices: ['O', 'C', 'Q', 'U'],
          correctAnswer: 'O'
        },
        {
          id: '2-lr-6',
          type: 'roman-to-elia',
          questionText: 'What ELIA character represents the letter P?',
          displayCharacter: 'P',
          choices: ['P', 'B', 'R', 'Q'],
          correctAnswer: 'P'
        },
        {
          id: '2-lr-7',
          type: 'elia-to-roman',
          questionText: 'What Roman letter does this ELIA character represent?',
          displayCharacter: 'Q',
          choices: ['Q', 'O', 'C', 'P'],
          correctAnswer: 'Q'
        },
        {
          id: '2-lr-8',
          type: 'roman-to-elia',
          questionText: 'What ELIA character represents the letter R?',
          displayCharacter: 'R',
          choices: ['R', 'P', 'B', 'D'],
          correctAnswer: 'R'
        },
        {
          id: '2-lr-9',
          type: 'elia-to-roman',
          questionText: 'What Roman letter does this ELIA character represent?',
          displayCharacter: 'S',
          choices: ['S', 'C', 'O', 'U'],
          correctAnswer: 'S'
        },
        {
          id: '2-lr-10',
          type: 'roman-to-elia',
          questionText: 'What ELIA character represents the letter U?',
          displayCharacter: 'U',
          choices: ['U', 'O', 'C', 'Q'],
          correctAnswer: 'U'
        }
      ],
      // Part 2B: Word Recognition Quiz - ONLY uses A, B, C, D, O, P, Q, R, S, U
      wordRecognitionQuiz: [
        {
          id: '2-wr-1',
          type: 'word-recognition',
          questionText: 'Which word is written in ELIA Frames?',
          displayWord: 'CUP',
          choices: ['CUP', 'CAP', 'COP', 'DUP'],
          correctAnswer: 'CUP'
        },
        {
          id: '2-wr-2',
          type: 'word-recognition',
          questionText: 'Which word is written in ELIA Frames?',
          displayWord: 'SOAP',
          choices: ['SOAP', 'SODA', 'SOAR', 'SOUP'],
          correctAnswer: 'SOAP'
        },
        {
          id: '2-wr-3',
          type: 'word-recognition',
          questionText: 'Which word is written in ELIA Frames?',
          displayWord: 'CRAB',
          choices: ['CRAB', 'DRAB', 'GRAB', 'BRAG'],
          correctAnswer: 'CRAB'
        },
        {
          id: '2-wr-4',
          type: 'word-recognition',
          questionText: 'Which word is written in ELIA Frames?',
          displayWord: 'DROP',
          choices: ['DROP', 'PROP', 'CROP', 'DROOP'],
          correctAnswer: 'DROP'
        },
        {
          id: '2-wr-5',
          type: 'word-recognition',
          questionText: 'Which word is written in ELIA Frames?',
          displayWord: 'SODA',
          choices: ['SODA', 'SOAR', 'SOUP', 'SOAP'],
          correctAnswer: 'SODA'
        },
        {
          id: '2-wr-6',
          type: 'word-recognition',
          questionText: 'Which word is written in ELIA Frames?',
          displayWord: 'BASS',
          choices: ['BASS', 'BOSS', 'PASS', 'SASS'],
          correctAnswer: 'BASS'
        },
        {
          id: '2-wr-7',
          type: 'word-recognition',
          questionText: 'Which word is written in ELIA Frames?',
          displayWord: 'SQUAD',
          choices: ['SQUAD', 'SQUAB', 'SQUID', 'SOUR'],
          correctAnswer: 'SQUAD'
        }
      ],
      // Part 2C: Word Translation Quiz - ONLY uses A, B, C, D, O, P, Q, R, S, U
      wordTranslationQuiz: [
        {
          id: '2-wt-1',
          eliaWord: 'CUP',
          correctAnswer: 'cup',
          hints: ['c']
        },
        {
          id: '2-wt-2',
          eliaWord: 'BUS',
          correctAnswer: 'bus',
          hints: ['b']
        },
        {
          id: '2-wt-3',
          eliaWord: 'DROP',
          correctAnswer: 'drop',
          hints: ['d']
        },
        {
          id: '2-wt-4',
          eliaWord: 'CRAB',
          correctAnswer: 'crab',
          hints: ['c']
        },
        {
          id: '2-wt-5',
          eliaWord: 'SOAP',
          correctAnswer: 'soap',
          hints: ['s']
        },
        {
          id: '2-wt-6',
          eliaWord: 'SODA',
          correctAnswer: 'soda',
          hints: ['s']
        },
        {
          id: '2-wt-7',
          eliaWord: 'SQUAD',
          correctAnswer: 'squad',
          hints: ['s']
        }
      ]
    }
  },
  {
    id: 3,
    title: 'The First Squares',
    description: 'E-N',
    learnContent: {
      introduction: `The second group introduces the First Squares: E, F, G, H, I, J, K, L, M, and N. These characters use square-based shapes to distinguish them from the circles.

Pay attention to the corner positions and line orientations that make each character unique.`,
      characters: [
        { roman: 'E', elia: 'E' },
        { roman: 'F', elia: 'F' },
        { roman: 'G', elia: 'G' },
        { roman: 'H', elia: 'H' },
        { roman: 'I', elia: 'I' },
        { roman: 'J', elia: 'J' },
        { roman: 'K', elia: 'K' },
        { roman: 'L', elia: 'L' },
        { roman: 'M', elia: 'M' },
        { roman: 'N', elia: 'N' }
      ]
    },
    exercises: [
      {
        id: '3-1',
        type: 'multiple-choice',
        question: 'What Roman letter does this ELIA character represent?',
        eliaCharacter: 'E',
        options: ['E', 'F', 'L', 'I'],
        correctAnswer: 'E'
      },
      {
        id: '3-2',
        type: 'multiple-choice',
        question: 'What Roman letter does this ELIA character represent?',
        eliaCharacter: 'H',
        options: ['H', 'N', 'M', 'K'],
        correctAnswer: 'H'
      },
      {
        id: '3-3',
        type: 'multiple-choice',
        question: 'What ELIA character represents the letter J?',
        romanCharacter: 'J',
        options: ['J', 'I', 'L', 'F'],
        correctAnswer: 'J'
      },
      {
        id: '3-4',
        type: 'flashcard',
        question: 'Translate these words to ELIA',
        words: ['unpack', 'enough', 'background', 'describe'],
        correctAnswer: 'flashcard'
      }
    ],
    structuredExercises: {
      chapterId: 3,
      flashcards: [
        { id: '3-fc-1', romanCharacter: 'E', eliaCharacter: 'E' },
        { id: '3-fc-2', romanCharacter: 'F', eliaCharacter: 'F' },
        { id: '3-fc-3', romanCharacter: 'G', eliaCharacter: 'G' },
        { id: '3-fc-4', romanCharacter: 'H', eliaCharacter: 'H' },
        { id: '3-fc-5', romanCharacter: 'I', eliaCharacter: 'I' },
        { id: '3-fc-6', romanCharacter: 'J', eliaCharacter: 'J' },
        { id: '3-fc-7', romanCharacter: 'K', eliaCharacter: 'K' },
        { id: '3-fc-8', romanCharacter: 'L', eliaCharacter: 'L' },
        { id: '3-fc-9', romanCharacter: 'M', eliaCharacter: 'M' },
        { id: '3-fc-10', romanCharacter: 'N', eliaCharacter: 'N' }
      ],
      letterRecognitionQuiz: [
        { id: '3-lr-1', type: 'elia-to-roman', questionText: 'What Roman letter does this ELIA character represent?', displayCharacter: 'E', choices: ['E', 'F', 'L', 'I'], correctAnswer: 'E' },
        { id: '3-lr-2', type: 'roman-to-elia', questionText: 'What ELIA character represents the letter F?', displayCharacter: 'F', choices: ['F', 'E', 'L', 'I'], correctAnswer: 'F' },
        { id: '3-lr-3', type: 'elia-to-roman', questionText: 'What Roman letter does this ELIA character represent?', displayCharacter: 'G', choices: ['G', 'H', 'K', 'N'], correctAnswer: 'G' },
        { id: '3-lr-4', type: 'roman-to-elia', questionText: 'What ELIA character represents the letter H?', displayCharacter: 'H', choices: ['H', 'N', 'M', 'K'], correctAnswer: 'H' },
        { id: '3-lr-5', type: 'elia-to-roman', questionText: 'What Roman letter does this ELIA character represent?', displayCharacter: 'I', choices: ['I', 'L', 'J', 'F'], correctAnswer: 'I' },
        { id: '3-lr-6', type: 'roman-to-elia', questionText: 'What ELIA character represents the letter J?', displayCharacter: 'J', choices: ['J', 'I', 'L', 'F'], correctAnswer: 'J' },
        { id: '3-lr-7', type: 'elia-to-roman', questionText: 'What Roman letter does this ELIA character represent?', displayCharacter: 'K', choices: ['K', 'H', 'N', 'M'], correctAnswer: 'K' },
        { id: '3-lr-8', type: 'roman-to-elia', questionText: 'What ELIA character represents the letter L?', displayCharacter: 'L', choices: ['L', 'I', 'E', 'F'], correctAnswer: 'L' },
        { id: '3-lr-9', type: 'elia-to-roman', questionText: 'What Roman letter does this ELIA character represent?', displayCharacter: 'M', choices: ['M', 'N', 'H', 'K'], correctAnswer: 'M' },
        { id: '3-lr-10', type: 'roman-to-elia', questionText: 'What ELIA character represents the letter N?', displayCharacter: 'N', choices: ['N', 'M', 'H', 'K'], correctAnswer: 'N' }
      ],
      // Part 2B: Word Recognition Quiz - Uses Ch2 + Ch3 letters (A-U, no T-Z)
      wordRecognitionQuiz: [
        { id: '3-wr-1', type: 'word-recognition', questionText: 'Which word is written in ELIA Frames?', displayWord: 'HEN', choices: ['HEN', 'PEN', 'MEN', 'DEN'], correctAnswer: 'HEN' },
        { id: '3-wr-2', type: 'word-recognition', questionText: 'Which word is written in ELIA Frames?', displayWord: 'HOME', choices: ['HOME', 'DOME', 'SOME', 'COME'], correctAnswer: 'HOME' },
        { id: '3-wr-3', type: 'word-recognition', questionText: 'Which word is written in ELIA Frames?', displayWord: 'KING', choices: ['KING', 'RING', 'SING', 'DING'], correctAnswer: 'KING' },
        { id: '3-wr-4', type: 'word-recognition', questionText: 'Which word is written in ELIA Frames?', displayWord: 'JUMP', choices: ['JUMP', 'PUMP', 'LUMP', 'DUMP'], correctAnswer: 'JUMP' },
        { id: '3-wr-5', type: 'word-recognition', questionText: 'Which word is written in ELIA Frames?', displayWord: 'MILK', choices: ['MILK', 'SILK', 'BILK', 'BULK'], correctAnswer: 'MILK' },
        { id: '3-wr-6', type: 'word-recognition', questionText: 'Which word is written in ELIA Frames?', displayWord: 'ENOUGH', choices: ['ENOUGH', 'ENJOIN', 'ENDURE', 'ENABLE'], correctAnswer: 'ENOUGH' }
      ],
      // Part 2C: Word Translation Quiz - Uses Ch2 + Ch3 letters (A-U, no T-Z)
      wordTranslationQuiz: [
        { id: '3-wt-1', eliaWord: 'HEN', correctAnswer: 'hen', hints: ['h'] },
        { id: '3-wt-2', eliaWord: 'HOME', correctAnswer: 'home', hints: ['h'] },
        { id: '3-wt-3', eliaWord: 'KING', correctAnswer: 'king', hints: ['k'] },
        { id: '3-wt-4', eliaWord: 'JUMP', correctAnswer: 'jump', hints: ['j'] },
        { id: '3-wt-5', eliaWord: 'MILK', correctAnswer: 'milk', hints: ['m'] },
        { id: '3-wt-6', eliaWord: 'GOOD', correctAnswer: 'good', hints: ['g'] }
      ]
    }
  },
  {
    id: 4,
    title: 'The Final Squares',
    description: 'T-Z',
    learnContent: {
      introduction: `This group continues with T, V, W, X, Y, and Z. Like the first squares, these use square-based shapes with distinctive patterns.

Master these characters before moving on to numbers!`,
      characters: [
        { roman: 'T', elia: 'T' },
        { roman: 'V', elia: 'V' },
        { roman: 'W', elia: 'W' },
        { roman: 'X', elia: 'X' },
        { roman: 'Y', elia: 'Y' },
        { roman: 'Z', elia: 'Z' }
      ]
    },
    exercises: [
      {
        id: '4-1',
        type: 'multiple-choice',
        question: 'What Roman letter does this ELIA character represent?',
        eliaCharacter: 'W',
        options: ['W', 'V', 'M', 'X'],
        correctAnswer: 'W'
      },
      {
        id: '4-2',
        type: 'multiple-choice',
        question: 'What Roman letter does this ELIA character represent?',
        eliaCharacter: 'Y',
        options: ['Y', 'V', 'T', 'X'],
        correctAnswer: 'Y'
      },
      {
        id: '4-3',
        type: 'multiple-choice',
        question: 'What ELIA character represents the letter Z?',
        romanCharacter: 'Z',
        options: ['Z', 'X', 'V', 'Y'],
        correctAnswer: 'Z'
      },
      {
        id: '4-4',
        type: 'flashcard',
        question: 'Translate these words to ELIA',
        words: ['worm', 'dwarf', 'very', 'white', 'yellow', 'two'],
        correctAnswer: 'flashcard'
      }
    ],
    structuredExercises: {
      chapterId: 4,
      flashcards: [
        { id: '4-fc-1', romanCharacter: 'T', eliaCharacter: 'T' },
        { id: '4-fc-2', romanCharacter: 'V', eliaCharacter: 'V' },
        { id: '4-fc-3', romanCharacter: 'W', eliaCharacter: 'W' },
        { id: '4-fc-4', romanCharacter: 'X', eliaCharacter: 'X' },
        { id: '4-fc-5', romanCharacter: 'Y', eliaCharacter: 'Y' },
        { id: '4-fc-6', romanCharacter: 'Z', eliaCharacter: 'Z' }
      ],
      letterRecognitionQuiz: [
        { id: '4-lr-1', type: 'elia-to-roman', questionText: 'What Roman letter does this ELIA character represent?', displayCharacter: 'T', choices: ['T', 'V', 'Y', 'X'], correctAnswer: 'T' },
        { id: '4-lr-2', type: 'roman-to-elia', questionText: 'What ELIA character represents the letter V?', displayCharacter: 'V', choices: ['V', 'W', 'Y', 'X'], correctAnswer: 'V' },
        { id: '4-lr-3', type: 'elia-to-roman', questionText: 'What Roman letter does this ELIA character represent?', displayCharacter: 'W', choices: ['W', 'V', 'M', 'X'], correctAnswer: 'W' },
        { id: '4-lr-4', type: 'roman-to-elia', questionText: 'What ELIA character represents the letter X?', displayCharacter: 'X', choices: ['X', 'Z', 'V', 'Y'], correctAnswer: 'X' },
        { id: '4-lr-5', type: 'elia-to-roman', questionText: 'What Roman letter does this ELIA character represent?', displayCharacter: 'Y', choices: ['Y', 'V', 'T', 'X'], correctAnswer: 'Y' },
        { id: '4-lr-6', type: 'roman-to-elia', questionText: 'What ELIA character represents the letter Z?', displayCharacter: 'Z', choices: ['Z', 'X', 'V', 'Y'], correctAnswer: 'Z' }
      ],
      wordRecognitionQuiz: [
        { id: '4-wr-1', type: 'word-recognition', questionText: 'Which word is written in ELIA Frames?', displayWord: 'TWO', choices: ['TWO', 'TOO', 'TOP', 'TOW'], correctAnswer: 'TWO' },
        { id: '4-wr-2', type: 'word-recognition', questionText: 'Which word is written in ELIA Frames?', displayWord: 'VERY', choices: ['VERY', 'VARY', 'VERB', 'VEST'], correctAnswer: 'VERY' },
        { id: '4-wr-3', type: 'word-recognition', questionText: 'Which word is written in ELIA Frames?', displayWord: 'WORM', choices: ['WORM', 'WARM', 'WORD', 'WORK'], correctAnswer: 'WORM' },
        { id: '4-wr-4', type: 'word-recognition', questionText: 'Which word is written in ELIA Frames?', displayWord: 'TEXT', choices: ['TEXT', 'NEXT', 'TEST', 'TENT'], correctAnswer: 'TEXT' },
        { id: '4-wr-5', type: 'word-recognition', questionText: 'Which word is written in ELIA Frames?', displayWord: 'YELLOW', choices: ['YELLOW', 'MELLOW', 'FELLOW', 'BELLOW'], correctAnswer: 'YELLOW' },
        { id: '4-wr-6', type: 'word-recognition', questionText: 'Which word is written in ELIA Frames?', displayWord: 'ZEBRA', choices: ['ZEBRA', 'ZESTY', 'ZENITH', 'ZERO'], correctAnswer: 'ZEBRA' }
      ],
      wordTranslationQuiz: [
        { id: '4-wt-1', eliaWord: 'TWO', correctAnswer: 'two', hints: ['t'] },
        { id: '4-wt-2', eliaWord: 'VERY', correctAnswer: 'very', hints: ['v'] },
        { id: '4-wt-3', eliaWord: 'WORM', correctAnswer: 'worm', hints: ['w'] },
        { id: '4-wt-4', eliaWord: 'TEXT', correctAnswer: 'text', hints: ['t'] },
        { id: '4-wt-5', eliaWord: 'YELLOW', correctAnswer: 'yellow', hints: ['y'] },
        { id: '4-wt-6', eliaWord: 'ZEBRA', correctAnswer: 'zebra', hints: ['z'] }
      ]
    }
  },
  {
    id: 5,
    title: 'Numbers',
    description: '0-9',
    learnContent: {
      introduction: `Numbers in ELIA use a special design: half-circle, half-square. This unique shape helps distinguish numbers from letters when reading by touch.

Learn each number from 0 to 9 and practice recognizing multi-digit numbers.`,
      characters: [
        { roman: '0', elia: '0' },
        { roman: '1', elia: '1' },
        { roman: '2', elia: '2' },
        { roman: '3', elia: '3' },
        { roman: '4', elia: '4' },
        { roman: '5', elia: '5' },
        { roman: '6', elia: '6' },
        { roman: '7', elia: '7' },
        { roman: '8', elia: '8' },
        { roman: '9', elia: '9' }
      ]
    },
    exercises: [
      {
        id: '5-1',
        type: 'multiple-choice',
        question: 'What number does this ELIA character represent?',
        eliaCharacter: '5',
        options: ['5', '2', '8', '3'],
        correctAnswer: '5'
      },
      {
        id: '5-2',
        type: 'multiple-choice',
        question: 'What number does this ELIA character represent?',
        eliaCharacter: '7',
        options: ['7', '1', '4', '9'],
        correctAnswer: '7'
      },
      {
        id: '5-3',
        type: 'multiple-choice',
        question: 'What ELIA character represents the number 0?',
        romanCharacter: '0',
        options: ['0', '8', '6', '9'],
        correctAnswer: '0'
      }
    ],
    structuredExercises: {
      chapterId: 5,
      flashcards: [
        { id: '5-fc-1', romanCharacter: '0', eliaCharacter: '0' },
        { id: '5-fc-2', romanCharacter: '1', eliaCharacter: '1' },
        { id: '5-fc-3', romanCharacter: '2', eliaCharacter: '2' },
        { id: '5-fc-4', romanCharacter: '3', eliaCharacter: '3' },
        { id: '5-fc-5', romanCharacter: '4', eliaCharacter: '4' },
        { id: '5-fc-6', romanCharacter: '5', eliaCharacter: '5' },
        { id: '5-fc-7', romanCharacter: '6', eliaCharacter: '6' },
        { id: '5-fc-8', romanCharacter: '7', eliaCharacter: '7' },
        { id: '5-fc-9', romanCharacter: '8', eliaCharacter: '8' },
        { id: '5-fc-10', romanCharacter: '9', eliaCharacter: '9' }
      ],
      letterRecognitionQuiz: [
        { id: '5-lr-1', type: 'elia-to-roman', questionText: 'What number does this ELIA character represent?', displayCharacter: '0', choices: ['0', '8', '6', '9'], correctAnswer: '0' },
        { id: '5-lr-2', type: 'roman-to-elia', questionText: 'What ELIA character represents the number 1?', displayCharacter: '1', choices: ['1', '7', '4', '2'], correctAnswer: '1' },
        { id: '5-lr-3', type: 'elia-to-roman', questionText: 'What number does this ELIA character represent?', displayCharacter: '2', choices: ['2', '5', '8', '3'], correctAnswer: '2' },
        { id: '5-lr-4', type: 'roman-to-elia', questionText: 'What ELIA character represents the number 3?', displayCharacter: '3', choices: ['3', '8', '5', '2'], correctAnswer: '3' },
        { id: '5-lr-5', type: 'elia-to-roman', questionText: 'What number does this ELIA character represent?', displayCharacter: '4', choices: ['4', '1', '7', '9'], correctAnswer: '4' },
        { id: '5-lr-6', type: 'roman-to-elia', questionText: 'What ELIA character represents the number 5?', displayCharacter: '5', choices: ['5', '2', '8', '3'], correctAnswer: '5' },
        { id: '5-lr-7', type: 'elia-to-roman', questionText: 'What number does this ELIA character represent?', displayCharacter: '6', choices: ['6', '0', '9', '8'], correctAnswer: '6' },
        { id: '5-lr-8', type: 'roman-to-elia', questionText: 'What ELIA character represents the number 7?', displayCharacter: '7', choices: ['7', '1', '4', '9'], correctAnswer: '7' },
        { id: '5-lr-9', type: 'elia-to-roman', questionText: 'What number does this ELIA character represent?', displayCharacter: '8', choices: ['8', '0', '3', '6'], correctAnswer: '8' },
        { id: '5-lr-10', type: 'roman-to-elia', questionText: 'What ELIA character represents the number 9?', displayCharacter: '9', choices: ['9', '6', '0', '4'], correctAnswer: '9' }
      ],
      wordRecognitionQuiz: [
        { id: '5-wr-1', type: 'word-recognition', questionText: 'Which number is written in ELIA Frames?', displayWord: '10', choices: ['10', '01', '11', '00'], correctAnswer: '10' },
        { id: '5-wr-2', type: 'word-recognition', questionText: 'Which number is written in ELIA Frames?', displayWord: '25', choices: ['25', '52', '23', '55'], correctAnswer: '25' },
        { id: '5-wr-3', type: 'word-recognition', questionText: 'Which number is written in ELIA Frames?', displayWord: '37', choices: ['37', '73', '38', '77'], correctAnswer: '37' },
        { id: '5-wr-4', type: 'word-recognition', questionText: 'Which number is written in ELIA Frames?', displayWord: '48', choices: ['48', '84', '44', '88'], correctAnswer: '48' },
        { id: '5-wr-5', type: 'word-recognition', questionText: 'Which number is written in ELIA Frames?', displayWord: '69', choices: ['69', '96', '66', '99'], correctAnswer: '69' },
        { id: '5-wr-6', type: 'word-recognition', questionText: 'Which number is written in ELIA Frames?', displayWord: '100', choices: ['100', '010', '001', '111'], correctAnswer: '100' }
      ],
      wordTranslationQuiz: [
        { id: '5-wt-1', eliaWord: '5', correctAnswer: '5', hints: ['5'] },
        { id: '5-wt-2', eliaWord: '12', correctAnswer: '12', hints: ['1'] },
        { id: '5-wt-3', eliaWord: '27', correctAnswer: '27', hints: ['2'] },
        { id: '5-wt-4', eliaWord: '34', correctAnswer: '34', hints: ['3'] },
        { id: '5-wt-5', eliaWord: '56', correctAnswer: '56', hints: ['5'] },
        { id: '5-wt-6', eliaWord: '89', correctAnswer: '89', hints: ['8'] }
      ]
    }
  }
];

export function getChapter(id: number): Chapter | undefined {
  return chapters.find(chapter => chapter.id === id);
}

export function getAllChapters(): Chapter[] {
  return chapters;
}

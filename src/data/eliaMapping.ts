import { Level } from '@/types';

// Lessons based on "ELIA TypeMaster (Revised) 0930" specification
// Each lesson has optional practice modules followed by a mandatory timed quiz
export const lessons: Level[] = [
  {
    id: 1,
    name: "FJ",
    description: "Basic finger positioning - F and J keys",
    characters: ['F', 'J'],
    practiceModules: [
      "fff jjj fff jjj fff jjj fff jjj",
      "fj jf fj jf fj jf fj jf fj jf",
      "fjf jfj fjf jfj ffj jjf ffj jjf"
    ],
    quizText: "Fj JF Fj JF Jf FJ FJ JF FJ JF JF Fj Fj JF Fj Fj Fj"
  },
  {
    id: 2,
    name: "FJ DK",
    description: "Adding D and K keys",
    characters: ['F', 'J', 'D', 'K'],
    practiceModules: [
      "ddd kkk ddd kkk ddd kkk",
      "df jk df jk fd kj fd kj",
      "fkdj fdkj fjkd fkjd dkjf dkfj dfjk"
    ],
    quizText: "FJKDJ JKJFK FKFJD DJDKJ JFDJK DKFJD JDKJF FJDKJ"
  },
  {
    id: 3,
    name: "FJ DK SL",
    description: "Adding S and L keys",
    characters: ['F', 'J', 'D', 'K', 'S', 'L'],
    practiceModules: [
      "sss lll sss lll sss lll",
      "sd fl sd fl sf sl dj kl",
      "jfkd slfj dksl jdsl kfsj"
    ],
    quizText: "FKSLJ LJFKD DSJKL KFLDS SDJLF LFKSJ FSJDK DLFKS"
  },
  {
    id: 4,
    name: "FJ DK SL A;",
    description: "Adding A and semicolon keys",
    characters: ['F', 'J', 'D', 'K', 'S', 'L', 'A', ';'],
    practiceModules: [
      "aaa ;;; aaa ;;; aaa ;;;",
      "as df jkl; as df jkl;",
      "a; sl dk fj a; sl dk fj"
    ],
    quizText: "F;AKDSLJ JDSFLAK; LA;KFJSD ;SKDALFJ DKSLJA;F"
  },
  {
    id: 5,
    name: "GH",
    description: "Middle fingers - G and H keys",
    characters: ['G', 'H'],
    practiceModules: [
      "ggg hhh ggg hhh ggg hhh",
      "fg hj fg hj gf hg gf hg",
      "fad ghj sad lkh gas hjk"
    ],
    quizText: "Sad fhgj Gaj sdhk Jkl ghda Fda shgk Sha gdjk Gda"
  },
  {
    id: 6,
    name: "RT YU",
    description: "Upper row - R, T, Y, U keys",
    characters: ['R', 'T', 'Y', 'U'],
    practiceModules: [
      "rrr ttt yyy uuu rrr ttt yyy uuu",
      "fr gt jy hu fr gt jy hu",
      "art try jug rusty truly draft"
    ],
    quizText: "Rasty art trust jars rusty stray truly youth jugs tough"
  },
  {
    id: 7,
    name: "VB NM",
    description: "Lower row - V, B, N, M keys",
    characters: ['V', 'B', 'N', 'M'],
    practiceModules: [
      "vvv bbb nnn mmm vvv bbb nnn mmm",
      "fv gb hn jm fv gb hn jm",
      "van man tub rub vet buy five"
    ],
    quizText: "have love find five join kind mine van bag hog jam gum"
  },
  {
    id: 8,
    name: "VB NM RT YU",
    description: "Combining lower and upper rows",
    characters: ['V', 'B', 'N', 'M', 'R', 'T', 'Y', 'U'],
    practiceModules: [
      "rtyu vbnm rtyu vbnm",
      "try rub nut buy vent barn"
    ],
    quizText: "tyurbn yrubtn urtybn rtyubm tyurbm yrubtm urtybm"
  },
  {
    id: 9,
    name: "VB NM RT YU FG HJ",
    description: "Adding middle finger keys",
    characters: ['V', 'B', 'N', 'M', 'R', 'T', 'Y', 'U', 'F', 'G', 'H', 'J'],
    practiceModules: [
      "fghj rtyu vbnm",
      "frug just grab hunt very"
    ],
    quizText: "ghjryu hjrytu jryutf rtyufh tyrufj yrtufg utryuh"
  },
  {
    id: 10,
    name: "EI",
    description: "Middle finger upper row - E and I keys",
    characters: ['E', 'I'],
    practiceModules: [
      "eee iii eee iii eee iii",
      "ed ik ed ik ed ik de ki de ki",
      "ride hide find kids ties line like"
    ],
    quizText: "drive knife light train thick trace brick child fence"
  },
  {
    id: 11,
    name: "C,",
    description: "C and comma keys",
    characters: ['C', ','],
    practiceModules: [
      "ccc ,,, ccc ,,, ccc ,,,",
      "dec, fed, cat, car, ice,",
      "arc cab car ice cub cel cut"
    ],
    quizText: "clever credit crucial defect device direct concern"
  },
  {
    id: 12,
    name: "WO",
    description: "W and O keys",
    characters: ['W', 'O'],
    practiceModules: [
      "www ooo www ooo www ooo",
      "ws ol ws ol sw lo sw lo",
      "now low row cow how two work"
    ],
    quizText: "blow brow cowl down flow grow jowl know owls rows"
  },
  {
    id: 13,
    name: "QP",
    description: "Q and P keys",
    characters: ['Q', 'P'],
    practiceModules: [
      "qqq ppp qqq ppp qqq ppp",
      "qa pl qa pl aq lp aq lp",
      "quit quiz plot post pipe plan"
    ],
    quizText: "Equal Equip Quack Quaff Quail Quake Qualm Quant"
  },
  {
    id: 14,
    name: "X.",
    description: "X and period keys",
    characters: ['X', '.'],
    practiceModules: [
      "xxx ... xxx ... xxx ...",
      "sx .l sx .l xs l. xs l.",
      "six fox lax box fix wax."
    ],
    quizText: "The quick brown fox jumps over the lazy dog."
  },
  {
    id: 15,
    name: "Z/",
    description: "Z and forward slash keys",
    characters: ['Z', '/'],
    practiceModules: [
      "zzz /// zzz /// zzz ///",
      "za ;/ za ;/ az /; az /;",
      "zip zap zone zero gaze jazz"
    ],
    quizText: "A quick brown fox jumps over the lazy dog."
  }
];

export function getEliaSymbol(letter: string): string {
  return letter; // With ELIA font, letters display as ELIA characters
}

export function getLessonData(lessonId: number): Level | undefined {
  return lessons.find(l => l.id === lessonId);
}

export function getCharactersByLevel(level: number): string[] {
  const lesson = lessons.find(l => l.id === level);
  return lesson?.characters || [];
}

// Badge definitions
export const badges = [
  {
    id: 'completionist',
    title: 'ELIA Completist',
    description: 'Complete all 15 lessons',
    criteria: 'Pass all 15 lesson quizzes'
  },
  {
    id: 'steady',
    title: 'Steady Typist',
    description: 'Achieve 10 WPM on all lessons',
    criteria: '10 WPM or higher on all 15 lesson quizzes'
  },
  {
    id: 'swift',
    title: 'Swift Typist',
    description: 'Achieve 20 WPM on all lessons',
    criteria: '20 WPM or higher on all 15 lesson quizzes'
  },
  {
    id: 'velocity',
    title: 'Velocity Typist',
    description: 'Achieve 40 WPM on all lessons',
    criteria: '40 WPM or higher on all 15 lesson quizzes'
  },
  {
    id: 'virtuoso',
    title: 'ELIA Virtuoso',
    description: 'Achieve 60 WPM on all lessons',
    criteria: '60 WPM or higher on all 15 lesson quizzes'
  }
];

// Performance criteria
export const PERFORMANCE_CRITERIA = {
  DEFAULT_ACCURACY_THRESHOLD: 96,
  MIN_CPM_THRESHOLD: 20,
  MIN_WPM_THRESHOLD: 4
};
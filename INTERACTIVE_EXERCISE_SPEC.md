# ELIA Learn: Interactive Exercise Section Specification

## Overview

This document defines the complete specification for the interactive exercise section of the ELIA Learn application. The exercise section is structured as a **sequential, multi-stage experience** that guides users through character familiarization, recognition, and translation skills for each chapter.

## Architecture

### Sequential Flow Structure

Each chapter's interactive exercise section follows a mandatory three-part progression:

```
Part 1: Flashcard Review Stage
         ↓
Part 2: Quiz Stage
         ├─ A. Letter Recognition Quiz (Multiple Choice)
         ├─ B. Word Recognition Quiz (Multiple Choice)
         └─ C. Word Translation Quiz (Typing Input)
         ↓
    Chapter Complete
```

Users **must** complete each stage in order before progressing to the next.

---

## Part 1: Flashcard Review Stage

### Goal
Character familiarization through interactive review.

### Functionality

#### Display
- The system displays a series of interactive flashcards
- **One flashcard per new alphabet character** introduced in the lesson
- Cards are presented sequentially, one at a time

#### Interaction
- User clicks or taps the flashcard to trigger a flip animation
- The flip reveals the corresponding character on the reverse side
- Animation must be:
  - **Smooth** (300-500ms duration recommended)
  - **Aesthetic** (3D flip transformation with perspective)
  - **Centered** (characters must remain well-centered throughout)
  - **Non-clipping** (no visual artifacts or character cutoff during animation)

#### Card Design
- **Front side**: Display ELIA Frame character in large, legible format (ONLY the character, no descriptions)
- **Back side**: Display corresponding Roman alphabet character (ONLY the character, no descriptions)
- Both sides should have:
  - High contrast background
  - Large font size (minimum 48px for characters)
  - Clear visual distinction between front and back states
- **IMPORTANT**: NO descriptive text should be included on flashcards to ensure focus on visual recognition

#### Progression Requirements
- User must review **all flashcards** before advancing
- System tracks which cards have been viewed
- "Continue to Quiz" button appears only after all cards reviewed
- Users can revisit previous cards within the stage

#### Technical Constraints
- Use CSS 3D transforms for flip animation (`rotateY`)
- Implement `backface-visibility: hidden` to prevent reverse side visibility
- Ensure perspective property applied to parent container
- Center alignment must use flexbox or grid to prevent shift during animation
- Minimum touch target size: 60px × 60px for mobile devices

---

## Part 2: Quiz Stage

The quiz stage consists of **three mandatory sub-sections** completed sequentially.

### A. Letter Recognition Quiz (Multiple Choice)

#### Goal
Test individual character recognition skills.

#### Question Format
The system alternates between two question types:

**Type 1: ELIA → Standard**
- Display: One ELIA Frame character (large, centered)
- Question: "What Roman letter does this ELIA character represent?"
- Choices: Four Roman alphabet options (A, B, C, D format)
- One correct answer, three distractors

**Type 2: Standard → ELIA**
- Display: One Roman alphabet letter (large, centered)
- Question: "What ELIA character represents this letter?"
- Choices: Four ELIA Frame options rendered in ELIA font
- One correct answer, three distractors

#### Behavior
- Questions presented one at a time
- User selects one answer from four choices
- **CRITICAL**: The correct answer must be **randomly positioned** among the four choices (not always in the first position)
- Immediate visual feedback:
  - **Correct**: Green highlight with checkmark (✓)
  - **Incorrect**: Red highlight with X mark (✗), correct answer highlighted in green
- After selection:
  - Correct: Auto-advance to next question after 1.5s delay
  - Incorrect: Show "Try Again" button, allow re-attempt
- Progress indicator shows current question number and total

#### Requirements
- Minimum 5 questions per character group
- Questions must alternate between Type 1 and Type 2
- Distractor choices should be from the same character group when possible
- All characters in the chapter must be covered at least once
- Questions randomized on each attempt (optional enhancement)

---

### B. Word Recognition Quiz (Multiple Choice)

#### Goal
Test comprehension of complete words written in ELIA Frames.

#### Question Format
- Display: One English word (standard alphabet, large and clear)
- Question: "Which of these represents '[word]' in ELIA Frames?"
- Choices: Four complete words rendered in ELIA Frame font
- One correct translation, three distractors

#### Word Selection - CUMULATIVE LEARNING RULE
- **CRITICAL**: Words must use **ONLY characters taught up to and including the current chapter**
- **Chapter 2 (The Circles)**: Words may only use A, B, C, D, O, P, Q, R, S, U
  - Valid examples: crab, aboard, soap, cup, drop, soda, bus, duo
  - Invalid: any word containing E-N, T-Z
- **Chapter 3 (First Squares)**: Words may use Chapter 2 letters PLUS E, F, G, H, I, J, K, L, M, N
  - Valid examples: unpack, enough, background, ignore, good, home, milk
  - Invalid: any word containing T-Z
- **Chapter 4 (Final Squares)**: Words may use all letters A-Z
  - Valid examples: worm, dwarf, very, white, yellow, exit, zebra
- Word length: 3-7 characters recommended
- Words should be common, recognizable vocabulary
- Distractors should be similar length and complexity

#### Behavior
- Questions presented one at a time
- User selects one answer from four choices
- Immediate visual feedback (same as Letter Recognition Quiz)
- Auto-advance on correct answer (1.5s delay)
- "Try Again" on incorrect answer

#### Requirements
- Minimum 5-7 word recognition questions per chapter
- Words progressively increase in length as user advances
- All chapter characters should appear in at least one word
- Clear, readable ELIA font rendering for all choices

---

### C. Word Translation Quiz (Typing Input)

#### Goal
Test recall and active translation skills from ELIA to Roman alphabet.

#### Question Format
- Display: One word written in ELIA Frames (large, centered)
- Question: "Type the English translation of this word"
- Input: Text input field (single line, focused on load)
- Validation: Case-insensitive comparison

#### Behavior
- Word displayed in ELIA font at readable size (minimum 36px)
- Text input field auto-focused for immediate typing
- Submit button or Enter key triggers validation
- Validation must be **case-insensitive**:
  - "HELLO", "hello", "Hello" all accepted as correct
- Trim whitespace from user input before validation

#### Feedback
- **Correct answer**:
  - Green success message with checkmark
  - Auto-advance to next word after 1.5s delay
  - Clear input field for next question

- **Incorrect answer**:
  - Red error message: "Incorrect. Try again!"
  - Input field remains populated with user's attempt
  - Highlight input field in red
  - Allow multiple attempts
  - Optional: After 2 failed attempts, show hint (first letter)
  - Optional: After 3 failed attempts, show "Show Answer" button

#### Requirements
- Minimum 5 translation questions per chapter
- Words must use only characters from current and previous chapters
- Word difficulty should match or slightly exceed Word Recognition difficulty
- Input validation must handle edge cases:
  - Extra spaces
  - Capitalization variations
  - Common typos (optional: Levenshtein distance tolerance)
- Progress indicator shows current word number and total

#### Accessibility
- Text input must have clear label
- High contrast focus state
- Support for keyboard navigation
- Screen reader announcements for correct/incorrect feedback

---

## Stage Progression & State Management

### Completion Criteria

**Part 1: Flashcard Review**
- ✓ All flashcards viewed at least once
- ✓ User clicks "Continue to Quiz" button

**Part 2A: Letter Recognition Quiz**
- ✓ All questions answered correctly
- ✓ Minimum accuracy threshold met (100% or allow 1-2 mistakes with retry)

**Part 2B: Word Recognition Quiz**
- ✓ All questions answered correctly
- ✓ User proceeds to next sub-section

**Part 2C: Word Translation Quiz**
- ✓ All words translated correctly
- ✓ Chapter marked as complete

### State Persistence

Store in local storage or user database:
```typescript
{
  chapterId: number,
  flashcardsReviewed: boolean,
  currentStage: 'flashcards' | 'letter-quiz' | 'word-quiz' | 'translation-quiz' | 'complete',
  letterQuizProgress: {
    questionsCompleted: number,
    totalQuestions: number
  },
  wordQuizProgress: {
    questionsCompleted: number,
    totalQuestions: number
  },
  translationQuizProgress: {
    wordsCompleted: number,
    totalWords: number
  },
  completedAt: Date | null
}
```

### Navigation Controls

- **Within Stage**: Users can navigate between cards/questions within current stage
- **Between Stages**: Users cannot skip ahead to next stage without completing current one
- **Backwards Navigation**: Users can return to previous stages to review
- **Chapter Navigation**: Users can exit to chapter selection at any time (progress saved)

---

## UI/UX Requirements

### Visual Design

**Color Scheme:**
- Correct feedback: Green (#10B981 or similar)
- Incorrect feedback: Red (#EF4444 or similar)
- Primary action buttons: Blue (#3B82F6 or similar)
- Neutral elements: Gray scale

**Typography:**
- ELIA characters: Custom ELIA Frames font, minimum 36px
- Questions: Clear sans-serif, 18-20px
- Feedback messages: 16px, bold for emphasis

**Layout:**
- Single-column layout for focus
- Maximum content width: 800px
- Generous padding and spacing
- Mobile-first responsive design

### Animation Standards

- Flashcard flip: 400-500ms with `ease-in-out` timing
- Feedback appearance: 200ms fade-in
- Auto-advance transition: 300ms opacity fade
- Button states: 150ms for hover/active transitions

### Accessibility

- WCAG 2.1 AA compliance minimum
- Keyboard navigation support (Tab, Enter, Arrow keys)
- Screen reader announcements for all state changes
- Focus indicators with 3px outline
- Minimum touch target size: 44px × 44px (WCAG 2.5.5)
- High contrast mode support

---

## Technical Implementation Notes

### Type Definitions

```typescript
// Exercise stage types
type ExerciseStage =
  | 'flashcards'
  | 'letter-recognition-quiz'
  | 'word-recognition-quiz'
  | 'word-translation-quiz';

interface FlashcardData {
  id: string;
  eliaCharacter: string;
  romanCharacter: string;
  viewed: boolean;
}

interface MultipleChoiceQuestion {
  id: string;
  type: 'elia-to-roman' | 'roman-to-elia' | 'word-recognition';
  questionText: string;
  displayCharacter?: string; // For letter quizzes
  displayWord?: string; // For word recognition
  choices: string[];
  correctAnswerIndex: number;
}

interface TranslationQuestion {
  id: string;
  eliaWord: string;
  correctAnswer: string; // English word
  caseSensitive: false;
}

interface ChapterExercise {
  chapterId: number;
  flashcards: FlashcardData[];
  letterRecognitionQuiz: MultipleChoiceQuestion[];
  wordRecognitionQuiz: MultipleChoiceQuestion[];
  wordTranslationQuiz: TranslationQuestion[];
}
```

### Component Structure

```
ExerciseSection/
├── FlashcardStage/
│   ├── FlashcardCard (reusable flip card)
│   ├── FlashcardProgress (viewed indicator)
│   └── FlashcardNavigation
├── QuizStage/
│   ├── LetterRecognitionQuiz
│   ├── WordRecognitionQuiz
│   └── WordTranslationQuiz
├── Shared/
│   ├── QuestionProgress (progress bar)
│   ├── FeedbackMessage (correct/incorrect display)
│   └── QuizNavigation (next/submit buttons)
└── ExerciseManager (orchestrates stage flow)
```

### Data Validation

**On Flashcard Stage:**
- Verify all characters in chapter have corresponding flashcard
- Validate ELIA font rendering before displaying

**On Quiz Stages:**
- Validate all quiz words use only taught characters
- Ensure distractor choices are plausible
- Verify correct answers are truly correct
- Check for duplicate questions

**On Translation Input:**
- Trim whitespace: `input.trim()`
- Convert to lowercase: `input.toLowerCase()`
- Compare with correct answer (also lowercased)
- Optional: Implement fuzzy matching for typos

---

## Error Handling

### Font Loading Errors
- Display fallback system font if ELIA font fails to load
- Show warning message to user
- Log error for debugging

### State Persistence Errors
- Gracefully handle localStorage failures
- Provide in-memory fallback for session
- Warn user progress may not save

### Navigation Errors
- Prevent navigation to locked stages
- Show helpful error message explaining requirements
- Provide button to return to current stage

---

## Performance Considerations

- Lazy load quiz questions (don't load all at once)
- Preload next question/card during user interaction time
- Debounce text input validation (300ms)
- Optimize ELIA font loading (font-display: swap)
- Cache completed stages to reduce re-rendering

---

## Future Enhancements

- Spaced repetition algorithm for review
- Adaptive difficulty (more questions on weak characters)
- Timed mode for advanced users
- Audio pronunciation of words
- Haptic feedback on mobile devices
- Achievement badges for perfect scores
- Progress analytics and insights

---

## Acceptance Criteria

### Part 1: Flashcard Review
- [ ] All characters display correctly in ELIA font
- [ ] Flip animation is smooth with no clipping
- [ ] Characters remain centered during animation
- [ ] All cards must be viewed before progression
- [ ] Progress indicator shows cards reviewed

### Part 2A: Letter Recognition Quiz
- [ ] Questions alternate between ELIA→Roman and Roman→ELIA
- [ ] Immediate visual feedback on selection
- [ ] Correct answers auto-advance after 1.5s
- [ ] Incorrect answers show "Try Again" option
- [ ] All chapter characters covered at least once

### Part 2B: Word Recognition Quiz
- [ ] Words use only taught characters
- [ ] Four distinct choices per question
- [ ] ELIA font renders clearly for all choices
- [ ] Feedback matches Letter Recognition behavior
- [ ] Minimum 5 questions per chapter

### Part 2C: Word Translation Quiz
- [ ] Text input is auto-focused on question load
- [ ] Validation is case-insensitive
- [ ] Whitespace is trimmed before validation
- [ ] Clear feedback for correct/incorrect answers
- [ ] Multiple attempts allowed for incorrect answers
- [ ] Input field clears after correct answer

### Overall System
- [ ] Sequential flow enforced (no skipping stages)
- [ ] Progress saved automatically
- [ ] Users can return to previous stages
- [ ] Mobile responsive (works on screens 320px+)
- [ ] Keyboard accessible
- [ ] Screen reader compatible
- [ ] Performance: < 100ms response time for interactions

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-14 | System | Initial specification document created |

---

**End of Specification**

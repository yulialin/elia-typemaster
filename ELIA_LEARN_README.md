# ELIA Learn

Your Interactive Guide to the ELIA Frames™ Alphabet

## Overview

ELIA Learn is a mobile-first, web-based application designed to be the definitive interactive guide for learning the ELIA Frames™ alphabet. It transforms the static ELIA Learning Manual into an engaging, self-paced digital experience.

## Features

### ✅ Implemented (MVP)

1. **Digital Book Interface**
   - Structured into 5 chapters corresponding to the ELIA learning manual
   - Smooth page transitions with CSS animations
   - Table of Contents for easy navigation
   - Progress indicator showing current chapter

2. **Responsive Design**
   - Desktop: Two-page layout (lesson left, practice right)
   - Mobile: Stacked layout with tabs for Learn/Practice
   - Touch-optimized interactions
   - Mobile-first approach with large tap targets

3. **Interactive Exercises**
   - **Multiple Choice**: ELIA to Roman and Roman to ELIA recognition
   - **Flashcard Mode**: Word translation practice with flip animation
   - Instant feedback (green checkmark for correct, red X for incorrect)
   - Progress tracking within each chapter

4. **Progress Tracking**
   - Automatic save using localStorage
   - Completed exercises marked with checkmarks in Table of Contents
   - Last accessed chapter remembered
   - Resume where you left off

5. **Chapter Content**
   - Chapter 1: Introduction to ELIA Frames
   - Chapter 2: The Circles (A-D, O-S, U)
   - Chapter 3: The First Squares (E-N)
   - Chapter 4: Numbers (0-9)
   - Chapter 5: The Final Squares (T-Z)

## Getting Started

### Access the App

1. Start the development server:
   ```bash
   cd elia-typemaster
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3001/learn
   ```

3. Or from the home page, click the "📚 ELIA Learn" card

### Using ELIA Learn

1. **Navigate Chapters**: Use the "📖 Contents" button to jump to any chapter
2. **Learn Mode**: Read about the character group and see all characters
3. **Practice Mode**: Complete interactive exercises to test your knowledge
4. **Track Progress**: Completed chapters are marked with checkmarks
5. **Move Forward**: Use "Next Chapter" when ready to advance

## Technical Architecture

### File Structure

```
elia-typemaster/
├── src/
│   ├── app/
│   │   └── learn/
│   │       └── page.tsx                 # Main learn page
│   ├── components/
│   │   └── learn/
│   │       ├── BookLayout.tsx           # Two-page book layout
│   │       ├── TableOfContents.tsx      # Chapter navigation
│   │       ├── MultipleChoiceExercise.tsx
│   │       └── FlashcardExercise.tsx
│   ├── contexts/
│   │   └── LearnProgressContext.tsx     # Progress tracking
│   ├── data/
│   │   └── learnChapters.ts            # Chapter content
│   └── types/
│       └── learn.ts                     # TypeScript types
```

### Key Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first styling with inline theme
- **ELIA Frames Font**: Custom font for displaying ELIA characters
- **LocalStorage**: Client-side progress persistence

### Components

#### BookLayout
Main layout component that handles:
- Two-page desktop view
- Mobile tabbed interface
- Exercise progression
- Chapter navigation

#### MultipleChoiceExercise
Interactive quiz component with:
- Visual feedback (green/red)
- Disabled state after selection
- Auto-advance on correct answer

#### FlashcardExercise
Flip-card interface for word practice:
- Click to flip between Roman and ELIA
- Progress through word list
- Smooth 3D flip animation

#### TableOfContents
Chapter navigation with:
- Current chapter highlighting
- Completion status indicators
- Modal overlay on mobile

## Design Principles

1. **Self-Paced Learning**: No timers or pressure
2. **Instant Feedback**: Clear visual cues for correct/incorrect
3. **Mobile-First**: Optimized for touch and small screens
4. **Progressive Disclosure**: Learn characters in logical groups
5. **Persistence**: Progress saved automatically

## Future Enhancements (Post-MVP)

- [ ] Audio feedback for correct/incorrect answers
- [ ] Haptic feedback on mobile devices
- [ ] Spaced repetition algorithm for review mode
- [ ] Drawing practice to trace ELIA shapes
- [ ] Lowercase letters and punctuation chapters
- [ ] Achievement system and rewards
- [ ] Share progress with friends
- [ ] Print certificate of completion

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (iOS 12+)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- First load: < 2s on 3G
- Page transitions: 300ms
- Font loading: swap strategy for instant text display
- Optimized for mobile data usage

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- High contrast color schemes
- Large touch targets (min 60px on mobile)
- Screen reader friendly

## Development Notes

### Adding New Chapters

1. Edit `src/data/learnChapters.ts`
2. Add new chapter object with:
   - Unique ID
   - Title and description
   - Learn content (introduction + characters)
   - Exercise array

### Creating New Exercise Types

1. Create new component in `src/components/learn/`
2. Accept `Exercise` type and `onComplete` callback
3. Add to exercise type union in `src/types/learn.ts`
4. Implement in BookLayout switch statement

### Customizing Styles

- Global styles: `src/app/globals.css`
- Font configuration: `src/styles/fonts.css`
- Tailwind theme: Inline in `globals.css` @theme block

## License

Part of the ELIA Life Tech suite of applications.

## Support

For issues or questions, please contact the development team.

---

Built with ❤️ for ELIA learners worldwide

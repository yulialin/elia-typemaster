# ELIA TypeMaster MVP

An interactive web-based gaming interface designed to teach users how to read and type the ELIA Frames™ alphabet using touch typing principles.

## Features

### Module 1: Learning Path
- **Progressive Level Structure**: 7 levels based on keyboard finger placement
- **Pre-lesson Mindfulness Prompt**: Ergonomics guidance and focus preparation
- **Character Exercises**: Single character recognition and typing practice
- **Instant Feedback**: Visual feedback with green/red color coding
- **95% Accuracy Requirement**: Must achieve 95% accuracy to progress
- **Post-exercise Summary**: Performance metrics and reward system

### Module 2: Practice Arena
- **Typing Tutor Interface**: Word and sentence practice
- **Real-time Feedback**: Character highlighting and error indication
- **Performance Metrics**: WPM and accuracy tracking
- **Content Scoping**: Only practice characters from completed levels

## Level Progression

1. **Level 1**: Home Row I (F, J, D, K) - Index & Middle Fingers
2. **Level 2**: Home Row II (S, L, A, G, H) - Ring, Pinky & Thumbs
3. **Level 3**: Top Row I (E, I, R, U) - Common letters
4. **Level 4**: Top Row II (T, Y, W, O, P, Q) - The rest
5. **Level 5**: Bottom Row I (N, M, C, V, B) - Common keys
6. **Level 6**: Bottom Row II (X, Z) - The edges
7. **Level 7**: Full Alphabet Test - Complete mastery

## Tech Stack

- **Frontend**: Next.js 15 with React and TypeScript
- **Styling**: Tailwind CSS for clean, high-contrast design
- **State Management**: React Context API
- **Backend**: Next.js API Routes (ready for Supabase integration)
- **Data Collection**: Keystroke logging for future AI development

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Key Features for Accessibility

- **High Contrast Design**: Clean interface with clear visual feedback
- **Large ELIA Characters**: Easy-to-read character display
- **Encouraging Tone**: Positive messaging throughout the experience
- **Touch Typing Focus**: Builds proper muscle memory and finger placement

## Data Collection

The application logs all user interactions including:
- Keystroke timing and accuracy
- Character confusion patterns
- Learning progression metrics
- Performance analytics

This data is designed to support future AI-driven adaptive learning features.

## Future Enhancements

- AI-Powered Adaptive Practice
- User Accounts & Progress Dashboards
- Numbers & Punctuation levels
- Advanced Gamification features
- Leaderboards and achievements

## Contributing

This is an MVP (Minimum Viable Product) designed to validate the ELIA learning model. All feedback and contributions are welcome!

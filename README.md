# Adaptive Algorithm Explanation

## The Difficulty Balance

The system calculates how challenging the game is using a formula that considers:
- How many steps back you need to remember (N-level)
- How many different types of changes you need to track (dimensions)
- How quickly the game shows you new stimuli (speed)

These combine into a single "difficulty score" that measures precisely how hard your current session is.

## Two-Level Training System

The game uses a two-tier system:
- **Mastery Level**: Your current comfortable level where you practice
- **Challenge Level**: A harder level that pushes your limits

It's like having stable ground to stand on (mastery) while reaching for something slightly out of your grasp (challenge).

## Smart Progression

The system tracks your performance using success and failure streaks:
- After 3 successful sessions at mastery level (≥75% accuracy), you move up to challenge level
- If you succeed at the challenge level 3 times, it becomes your new mastery level
- If you struggle at challenge level, you return to mastery to build more foundation

## Intelligent Adjustments

The algorithm makes real-time adjustments during play:
- When you're doing well, it gradually increases difficulty by speeding up
- When you're struggling, it decreases difficulty by slowing down
- It makes the smallest necessary changes first (speed) before more disruptive ones (N-level)

## Dual Progression Paths

You can progress in two different ways:
- **N-Level Progression**: Remember more steps back (1-back → 2-back → 3-back, etc.)
- **Dimension Progression**: Track more types of changes simultaneously (colors + sounds + positions, etc.)

This system dynamically adjusts to keep you in the "flow zone" - challenged enough to stay engaged but not so much that you get frustrated and give up.

# Bug/to-do list
- 

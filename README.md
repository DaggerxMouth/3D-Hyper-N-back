## Micro-Level Algorithm Summary

The micro-level system provides fine-grained progression tracking (e.g., 2.45 instead of just level 2).

**Core Components:**

1. **Format**: Levels range from 1.00 to 9.99 (two decimal places)
   - Integer part = traditional N-back level
   - Decimal part = progress toward next level (0-99%)

2. **Advancement Criteria**:
   - **Primary factor**: d'prime score (signal detection sensitivity)
   - **Secondary factors**: Response bias and lure resistance
   - **Personal baseline**: Compares against your last 20 sessions

3. **Progression Rules**:
   - **Advance** (+0.01 to +0.05): When d'prime exceeds baseline AND bias is low
   - **Stay same**: When performance meets baseline
   - **Regress** (-0.05): When d'prime < 70% of baseline

4. **Lure Integration**:
   - Lure frequency scales with micro-progress: 10% at .00 → 25% at .99
   - Creates "interference" that must be resisted
   - N-1 lures (80%) and N+1 lures (20%)

5. **Level Transitions**:
   - Only changes integer level when crossing boundaries (e.g., 2.99 → 3.01)
   - Micro-progress provides smoother difficulty scaling
   - More precise skill tracking than integer-only levels

**Key Innovation**: The system adapts difficulty continuously based on signal detection theory rather than simple accuracy, making progression more nuanced and personalized.


d'prime - https://pmc.ncbi.nlm.nih.gov/articles/PMC4597481/

# Game implementation

Standalone Solfege Unlock application. See the repository README for setup and classroom use.

model.ts separates solfege, two-line staff coordinates and reference MIDI pitches. Source image was visually checked; the original classroom photograph is not published.

audio.ts uses recorded piano samples with pitch shifting, cached decoding, audio-clock highlighting and cancellation tokens. No synthetic fallback. Recorded sample attribution is in assets/piano/CREDITS.md.

SolfegePage.tsx owns the six-round teacher-controlled flow, full-width journey, four-frame runner and final challenge. The game was extracted from i-board without its Firebase, routing or controller dependencies.

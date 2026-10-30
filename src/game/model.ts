export type Solfege = 'do' | 're' | 'mi';
export const SOLFEGE_LABELS: Record<Solfege,string> = {do:'Do',re:'Re',mi:'Mi'};
export const REFERENCE_MIDI: Record<Solfege, number> = { do: 60, re: 62, mi: 64 };
export type StaffMapping = { source: string; lines: [number, number]; positions: Record<Solfege, number>; marker: { x: number; y: number } };
// Staff lines and d anchor checked against IMG_5634.jpeg (2026-10-27).
// Preserve the three vertical locations in the supplied two-line example:
// Do=190 (between lines), Re=150 (upper line), Mi=110 (above upper line).
// Empty, unstemmed oval noteheads match the source; no clef or ledger lines.
// Printed coordinates and playback pitch remain independent configurations.
export const STAFF_MAPPING: StaffMapping = {
  source: 'IMG_5634.jpeg, supplied examination scope, sight-singing example',
  lines: [150, 230],
  positions: { do: 190, re: 150, mi: 110 },
  marker: { x: 155, y: 190 },
};
export const BANK: readonly (readonly (readonly Solfege[])[])[] = [
  [['do'], ['re'], ['mi']],
  [['do', 'do', 're'], ['mi', 'mi', 're'], ['re', 'do', 're'], ['re', 'mi', 're']],
  [['do', 're', 'mi'], ['mi', 're', 'do'], ['re', 're', 'mi', 're'], ['mi', 're', 'do', 're']],
];
export const FINAL: readonly Solfege[] = ['do', 're', 'mi', 'do'];
export const STAGES = ['找到唱名', '唱名接龍', '小隊解鎖'];
export function makeQuestions(random = Math.random): Solfege[][] {
  return BANK.flatMap(pool => {
    const first = Math.min(pool.length - 1, Math.floor(random() * pool.length));
    const remaining = pool.filter((_, index) => index !== first);
    const second = Math.min(remaining.length - 1, Math.floor(random() * remaining.length));
    return [[...pool[first]], [...remaining[second]]];
  });
}
export type Game = { screen: 'welcome' | 'question' | 'success' | 'final'; index: number; collected: number; revealed: boolean; awarded: boolean; questions: Solfege[][] };
export function initialGame(): Game {
  return { screen: 'welcome', index: 0, collected: 0, revealed: false, awarded: false, questions: [] };
}
export type Action = { type: 'start'; questions: Solfege[][] } | { type: 'reset' | 'reveal' | 'retry' | 'collect' | 'next' | 'final' };
export function transition(state: Game, action: Action): Game {
  switch (action.type) {
    case 'start': return { ...initialGame(), screen: 'question', questions: action.questions };
    case 'reset': return initialGame();
    case 'reveal': return { ...state, revealed: !state.revealed };
    case 'retry': return state.awarded ? state : { ...state, revealed: false };
    case 'collect': return state.screen !== 'question' || state.awarded ? state : { ...state, awarded: true, collected: state.collected + 1 };
    case 'next': return !state.awarded || state.screen !== 'question' ? state : state.collected === 6 ? { ...state, screen: 'success', revealed: false } : { ...state, index: state.index + 1, awarded: false, revealed: false };
    case 'final': return state.screen === 'success' ? { ...state, screen: 'final', awarded: false, revealed: false } : state;
  }
}

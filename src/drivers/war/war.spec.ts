import { playWar } from './war';
import { WarOptionValidationError } from './lib/options-validation';

describe('The War driver program', () => {
  it('Should play a standard game', () => {
    expect(() => playWar(4, 13, 2)).not.toThrow();
  });

  it('Should handle playing a game with the minimum possible values', () => {
    expect(() => playWar(1, 1, 1)).not.toThrow();
  });

  it('Should be able to play a game with lots of players', () => {
    expect(() => playWar(12, 39, 12)).not.toThrow();
  });

  it('Should play a game which only has wars.', () => {
    expect(() => playWar(52, 1, 2)).not.toThrow();
  });

  it('Should play a game which cannot have wars.', () => {
    expect(() => playWar(1, 52, 2)).not.toThrow();
  });

  it('Should not accept invalid input', () => {
    expect(() => playWar('asdf' as any, 13, 2)).toThrowError(WarOptionValidationError.invalidSuitCount);
    expect(() => playWar(4, -13, 2)).toThrowError(WarOptionValidationError.invalidRankCount);
    expect(() => playWar(4, 13, '2' as any)).toThrowError(WarOptionValidationError.invalidPlayerCount);
    expect(() => playWar(4, 13, 3)).toThrowError(WarOptionValidationError.cannotSplitDeckEvenly);
  });
});

import { Player } from './player';
import { TurnRecord, TurnType } from './record';
import { takeTurns } from './take-turns';

describe('Batch turn taking', () => {
  test('Should throw if given invalid input.', () => {
    const initialTurn: TurnRecord = {
      gameCompleted: false,
      nameOfWinner: null,
      playedCards: [],
      playersAtEndOfTurn: [{ name: 'Player A', hand: [] }],
      type: TurnType.preparation,
      winnings: []
    };

    expect(() => takeTurns(initialTurn, 'asdf' as any)).toThrow();
    expect(() => takeTurns(initialTurn, -10)).toThrow();
    expect(() => takeTurns(initialTurn, Infinity)).toThrow();
  });

  test('Should throw if the game is already completed.', () => {
    const initialTurn: TurnRecord = {
      gameCompleted: true,
      nameOfWinner: null,
      playedCards: [],
      playersAtEndOfTurn: [{ name: 'Player A', hand: [] }],
      type: TurnType.preparation,
      winnings: []
    };
    expect(() => takeTurns(initialTurn, 100, 'Should not work')).toThrow();
  });

  test('Should advance the game by the given number of turns', () => {
    const playerA: Player = {
      name: 'Player A',
      hand: [
        { suit: 1, rank: 1, owner: 'Player A' },
        { suit: 2, rank: 2, owner: 'Player A' },
        { suit: 3, rank: 3, owner: 'Player A' }
      ]
    };

    const playerB: Player = {
      name: 'Player B',
      hand: [
        { suit: 1, rank: 4, owner: 'Player B' },
        { suit: 2, rank: 5, owner: 'Player B' },
        { suit: 3, rank: 6, owner: 'Player B' }
      ]
    };

    const initialTurn: TurnRecord = {
      gameCompleted: false,
      nameOfWinner: null,
      playedCards: [],
      playersAtEndOfTurn: [playerA, playerB],
      type: TurnType.preparation,
      winnings: []
    };

    const result = takeTurns(initialTurn, 2, 'Two More');

    expect(result[0].nameOfWinner).toBe(null);
    expect(result[0].playersAtEndOfTurn[0].hand.length).toBe(3);
    expect(result[0].playersAtEndOfTurn[1].hand.length).toBe(3);

    expect(result[1].nameOfWinner).toBe(playerB.name);
    expect(result[1].playersAtEndOfTurn[0].hand.length).toBe(2);
    expect(result[1].playersAtEndOfTurn[1].hand.length).toBe(4);

    expect(result[2].nameOfWinner).toBe(playerB.name);
    expect(result[2].playersAtEndOfTurn[0].hand.length).toBe(1);
    expect(result[2].playersAtEndOfTurn[1].hand.length).toBe(5);
  });

  test('Should stop early if the game ends.', () => {
    const playerA: Player = {
      name: 'Player A',
      hand: [{ suit: 1, rank: 1, owner: 'Player A' }, { suit: 2, rank: 2, owner: 'Player A' }]
    };

    const playerB: Player = {
      name: 'Player B',
      hand: [
        { suit: 1, rank: 4, owner: 'Player B' },
        { suit: 2, rank: 5, owner: 'Player B' },
        { suit: 3, rank: 6, owner: 'Player B' }
      ]
    };

    const initialTurn: TurnRecord = {
      gameCompleted: false,
      nameOfWinner: null,
      playedCards: [],
      playersAtEndOfTurn: [playerA, playerB],
      type: TurnType.preparation,
      winnings: []
    };

    const result = takeTurns(initialTurn, 10, 'Almost there.');
    expect(result[0].nameOfWinner).toBe(null);
    expect(result[0].playersAtEndOfTurn[0].hand.length).toBe(2);
    expect(result[0].playersAtEndOfTurn[1].hand.length).toBe(3);

    expect(result[1].nameOfWinner).toBe(playerB.name);
    expect(result[1].playersAtEndOfTurn[0].hand.length).toBe(1);
    expect(result[1].playersAtEndOfTurn[1].hand.length).toBe(4);

    expect(result[2].nameOfWinner).toBe(playerB.name);
    expect(result[2].playersAtEndOfTurn[0].hand.length).toBe(0);
    expect(result[2].playersAtEndOfTurn[1].hand.length).toBe(5);
    expect(result[2].gameCompleted).toBe(true);
  });
});

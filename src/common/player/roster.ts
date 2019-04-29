import { Player } from "./player";

export const createRoster = (numberOfPlayers: number): Player[] =>
  Array(numberOfPlayers)
    .fill(null)
    .map((_: null, i: number) => new Player(`Player ${i + 1}`));

export const findPlayerByNameError = 'Could not find player by name';
export const findPlayerByName = (roster: Player[], name: string): Player => {
  const foundPlayer = roster.find((player: Player) => player.name === name);
  if (!foundPlayer) {
    throw findPlayerByNameError;
  }

  return foundPlayer;
}
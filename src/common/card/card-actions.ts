import { acceptCards, playCard, Player } from '../player/player';
import { Card } from './card';

export const notEnoughCardsError = 'Not enough cards in the given deck.';
export const dealCardsToPlayers = (deck: Card[], players: Player[], cardsPerPlayer: number): void => {
  if (players.length * cardsPerPlayer > deck.length) {
    throw notEnoughCardsError;
  }

  players.forEach((player: Player) => acceptCards(deck.slice(0, cardsPerPlayer), player));
};

export const playCardsIntoPool = (pool: Card[], players: Player[]): Card[] =>
  pool.concat(players.filter((player: Player) => player.hand.length > 0).map((player: Player) => playCard(player)));

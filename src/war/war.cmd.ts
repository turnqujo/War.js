import * as readline from 'readline';
import { playWar } from './war';
import { isPositiveWholeNumber } from '../common/validation/validation';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askForValidPositiveInt = (query: string): Promise<number> => {
  return new Promise((resolve, _reject) => {
    rl.question(query, (answer: string) => {
      const converted = +answer;
      if (isPositiveWholeNumber(converted)) {
        resolve(converted);
        return;
      }

      console.log('Please insert a positive integer.');
      resolve(askForValidPositiveInt(query));
    });
  });
};

enum YesOrNo {
  yes = 'yes',
  no = 'no'
}
const askForYesOrNo = (query: string): Promise<YesOrNo> => {
  return new Promise((resolve, _reject) => {
    rl.question(query, (answer: string) => {
      const loweredAnswer = answer.toLocaleLowerCase();
      if (loweredAnswer === YesOrNo.yes || loweredAnswer === YesOrNo.no) {
        resolve(loweredAnswer);
        return;
      }

      console.log("Please insert 'yes' or 'no'");
      resolve(askForYesOrNo(query));
    });
  });
};

(async function main() {
  const numberOfSuits = await askForValidPositiveInt('How many suits do you want? ');
  const numberOfRanks = await askForValidPositiveInt('How many ranks do you want? ');
  const numberOfPlayers = await askForValidPositiveInt('How many players do you want? ');

  const numCards = numberOfSuits * numberOfRanks;
  if (numCards % numberOfPlayers !== 0) {
    console.log(`Deck of size ${numCards} cannot be distributed evenly between ${numberOfPlayers} players.`);
    await main();
    return;
  }

  console.log(`Starting a ${numberOfPlayers}-player game with a ${numCards}-card deck!`);
  const result = playWar(numberOfSuits, numberOfRanks, numberOfPlayers);

  const numberOfTurns = Object.keys(result.turnRecords).pop();
  console.log(`${result.nameOfWinner} has won on turn ${numberOfTurns}!`);

  const playAgain = await askForYesOrNo('Do you want to play again? (yes / no) ');
  if (playAgain === YesOrNo.yes) {
    await main();
  }

  rl.close();
  process.exit();
})();
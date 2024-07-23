import 'dotenv/config';
import {InstallGlobalCommands} from './utils.js';

const TIRAJ = {
  name: 'tiraj',
  description: 'Tire un D100 et en retire le résultat du pool de résultat',
  type: 1
}

const CLEAR = {
  name: 'clear',
  description: 'Supprime les dès déjà tirés, reset Tiraj a zéro',
  type: 1
}

const PRINT = {
  name: 'print',
  description: 'Affiche les jets retirés, et les valeurs encore possible de tirer',
  type: 1
}

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND, TIRAJ, CLEAR, PRINT];

console.log('registering commands ....')

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
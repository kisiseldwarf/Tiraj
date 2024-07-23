export const TIRAJ = {
  name: 'tiraj',
  description: 'Tire un D100 et en retire le résultat du pool de résultat',
  type: 1
}

export const CLEAR = {
  name: 'clear',
  description: 'Supprime les dès déjà tirés, reset Tiraj a zéro',
  type: 1
}

export const PRINT = {
  name: 'print',
  description: 'Affiche les jets retirés',
  type: 1
}

export const ALL_COMMANDS = [TIRAJ, CLEAR, PRINT];
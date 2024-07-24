export const TIRAJ = {
  name: 'tiraj',
  description: 'Tire un D100 et en retire le résultat du pool de résultat',
  type: 1
}

export const CLEARAJ = {
  name: 'clearaj',
  description: 'Supprime les dès déjà tirés, reset Tiraj a zéro',
  type: 1
}

export const PRINTAJ = {
  name: 'printaj',
  description: 'Affiche les jets retirés',
  type: 1
}

export const GARDAJ = {
  name: 'gardaj',
  description: 'Fait un tiraj mais garde le dés de côté pour l\'utilisateur',
  type: 1
}

export const PUGARDAJ = {
  name: 'pugardaj',
  description: 'Supprime tous les dès gardés par l\'utilisateur',
  type: 1
}

export const ALL_COMMANDS = [TIRAJ, CLEARAJ, PRINTAJ, GARDAJ, PUGARDAJ];
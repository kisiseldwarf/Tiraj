let withdrawedNumbers = [];
let allNumbers = Array.from({length: 100}, (v,k) => k+1)
let usersGardaj = {};


export function noGardajs() {
  return Object.keys(usersGardaj).length === 0
}

export function printTiraj() {
  if (withdrawedNumbers.length === 0 && noGardajs()) {
    return 'Aucun chiffre retiré';
  }
  if (noGardajs()) {
    return printWithdrawedNumbers();
  }
  if (withdrawedNumbers.length === 0) {
    return printPlayerResults();
  }

  return printWithdrawedNumbers().concat(` - ${printPlayerResults()}`)
}

export function printWithdrawedNumbers() {
  return `🚫 Chiffre(s) retiré(s) : [${withdrawedNumbers}]`
}

export function tiraj() {
  let indexChosen = Math.floor(Math.random() * allNumbers.length)
  let res = allNumbers[indexChosen]
  allNumbers.splice(indexChosen, 1);
  withdrawedNumbers.push(res);
  return res;
}

export function getWithdrawedNumbers() {
  return withdrawedNumbers.toString();
}

export function printPlayerResults() {
  return Object.keys(usersGardaj).map(userId => `👱 ${usersGardaj[userId].username} : [${usersGardaj[userId].results}]`).join(' - ');
}

export function resetTiraj() {
  withdrawedNumbers = [];
  usersGardaj = {};
  allNumbers = Array.from({length: 100}, (v,k) => k+1)
}

export function gardaj(username, userId) {
  let indexChosen = Math.floor(Math.random() * allNumbers.length)
  let res = allNumbers[indexChosen]
  allNumbers.splice(indexChosen, 1);
  Object.hasOwn(usersGardaj, userId) ? usersGardaj[userId].results.push(res) : usersGardaj[userId] = {username, results: [res]};
  return res;
}

export function resetGardaj(userId) {
  const numbers = usersGardaj[userId].results;
  allNumbers = allNumbers.concat(numbers);
  delete usersGardaj[userId];
}
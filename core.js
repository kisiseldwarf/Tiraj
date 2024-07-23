let withdrawedNumbers = [];
let allNumbers = Array.from({length: 100}, (v,k) => k+1)

export function printWithdrawedNumbers() {
  if (withdrawedNumbers.length === 0) {
    return 'Aucun chiffre retiré'
  }
  return `🚫 Chiffre(s) retiré(s) : ${withdrawedNumbers}`
}

export function getRandom100Number() {
  let indexChosen = Math.floor(Math.random() * allNumbers.length)
  let res = allNumbers[indexChosen]
  allNumbers.splice(indexChosen, 1);
  withdrawedNumbers.push(res);
  return res;
}

export function getWithdrawedNumbers() {
  return withdrawedNumbers;
}

export function cleanWithdrawedNumbers() {
  withdrawedNumbers = [];
  allNumbers = Array.from({length: 100}, (v,k) => k+1)
}
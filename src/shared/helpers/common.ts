export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[], amount = 0):T[] {
  const startPosition = generateRandomValue(0, items.length - amount - 1);
  const endPosition = amount ? (startPosition + amount) : (startPosition + generateRandomValue(startPosition, items.length));
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

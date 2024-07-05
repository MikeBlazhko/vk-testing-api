const trueValues = ['1', 'true', 'yes'];

export function isTrueString(value: string): boolean {
  return trueValues.includes(value);
}

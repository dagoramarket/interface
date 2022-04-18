
export function convertToReadableDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
}
// src/lib/utils.ts
export function formatToBengaliNumber(input: number | string): string {
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  
  return String(input).replace(/[0-9]/g, (match) => {
    return bengaliNumbers[englishNumbers.indexOf(match)];
  });
}

export function getBengaliDate(): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  // Apni chaile bangla date formatting package ba local string use korte paren
  return new Date().toLocaleDateString('bn-BD', options);
}
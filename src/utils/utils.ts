import { createTheme } from '@mui/material';

export function uId() {
  const hashTable: readonly string[] = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  const UniversalUniqueIdentifier = [];

  for (let i = 0; i < 36; ++i) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      UniversalUniqueIdentifier[i] = '-';
    } else {
      UniversalUniqueIdentifier[i] =
        hashTable[Math.ceil(Math.random() * hashTable.length - 1)];
    }
  }

  return UniversalUniqueIdentifier.join('');
}

export function getCurrentWeek(currentDate: Date) {
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((+currentDate - +startDate) / (24 * 60 * 60 * 1000));

  const weekNumber = Math.ceil(days / 7);
  return weekNumber;
}

export function getUpcomingMonday() {
  const date = new Date();
  const today = date.getDate();
  const currentDay = date.getDay();
  const newDate = date.setDate(today - currentDay + 8);
  return new Date(newDate).getDate();
}

export const mainColor = '#24A19C';

export const theme = createTheme({
  palette: {
    primary: {
      main: mainColor,
    },
  },
});

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, options = {}) {
  options = {
    // path: '/',
    // при необходимости добавьте другие значения по умолчанию
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (const optionKey in options) {
    updatedCookie += '; ' + optionKey;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, '', {
    'max-age': -1,
  });
}

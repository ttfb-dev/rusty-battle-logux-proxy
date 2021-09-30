const p1 = [
  'Ржавый',
  'Грязный',
  'Голодный',
  'Злой',
  'Вонючий',
  'Вторичный',
  'Переработанный',
  'Мерзкий',
  'Горючий',
  'Гнилой',
];

const p2 = [
  'Мусорщик',
  'Уборщик',
  'Хлам',
  'Босс',
  'Король',
  'Властелин',
  'Робот',
  'Трансформер',
  'Хранитель',
  'Коллекционер',
];

export const getRandomName = () => {
  return `${p1[getRandomInt(9)]} ${p2[getRandomInt(9)]}`
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
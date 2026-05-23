import { data } from '@/data';
import { formatTime, getTimePanel, getUnicValuesByKey } from './helper';

describe('formatTime', () => {
  it('Добавление нулей к минутам и секундам', () => {
    expect(formatTime(65)).toBe('1:05');
    expect(formatTime(3661)).toBe('1:01:01');
  });
  it('Форматирование времени без часов', () => {
    expect(formatTime(125)).toBe('2:05');
  });
  it('Форматирование времени без минут', () => {
    expect(formatTime(59)).toBe('0:59');
  });
  it('Обработка 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
});

describe('getTimePanel', () => {
  it('Форматирование текущего времени и продолжительности', () => {
    expect(getTimePanel(65, 125)).toBe('1:05 / 2:05');
    expect(getTimePanel(3661, 3661)).toBe('1:01:01 / 1:01:01');
  });
  it('Форматирование текущего времени без продолжительности', () => {
    expect(getTimePanel(65, undefined)).toBe('1:05');
    expect(getTimePanel(3661, undefined)).toBe('1:01:01');
  });
});

describe('getUnicValuesByKey', () => {
  it('Получение уникальных значений по ключу', () => {
    expect(getUnicValuesByKey(data, 'author')).toEqual([
      'Alexander Nakarada',
      '-',
    ]);
  });
  it('Получение уникальных значений по ключу с массивом', () => {
    expect(getUnicValuesByKey(data, 'genre')).toEqual([
      'Классическая музыка',
      'Инструментальная музыка',
      'Эпическая музыка',
    ]);
  });
});

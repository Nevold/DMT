import type { Database } from '../types/types';

export class StorageService {
  public static data: Database = { list: [{ id: '#1', title: '', weight: '' }], lastId: 1 };

  public static isDatabase(data: unknown): data is Database {
    if (!data || typeof data !== 'object') return false;

    if (!('list' in data) || !('lastId' in data)) return false;

    const { list, lastId } = data;

    if (!Array.isArray(list) || typeof lastId !== 'number') return false;

    // Validate each item in the 'list' array
    // for (const item of list) {
    //   if (
    //     typeof item !== 'object' ||
    //     !('id' in item) ||
    //     !('title' in item) ||
    //     !('weight' in item) ||
    //     typeof item.id !== 'string' ||
    //     typeof item.title !== 'string' ||
    //     typeof item.weight !== 'string'
    //   ) {
    //     return false;
    //   }
    // }

    return true;
  }

  public static readonly saveData = (data: Database): void => {
    localStorage.setItem('decisionList', JSON.stringify(data));
  };

  public static readonly getData = (): void => {
    const localData = localStorage.getItem('decisionList');
    if (localData) {
      const parsedData = JSON.parse(localData);
      if (this.isDatabase(parsedData)) {
        this.data = parsedData;
      } else {
        throw new Error('Data in localStorage is not of type Database');
      }
    }
  };
}

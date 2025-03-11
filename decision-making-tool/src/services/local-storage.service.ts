// import type { Database } from '../types/types';

interface Database {
  list: string;
  lastId: number;
}

export class StorageService {
  public static data: Database = { list: '', lastId: 0 };

  public static isDatabase(data: unknown): data is Database {
    if (!data || typeof data !== 'object') return false;
    return 'list' in data && 'lastId' in data;
  }

  public static readonly saveData = (data: Database): void => {
    localStorage.setItem('decisionList', JSON.stringify(data));
  };

  public static readonly getDatabase = (): void => {
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

export default StorageService;

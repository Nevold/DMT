import type { Database } from '../types/types';

export class StorageService {
  public static readonly saveData = (data: Database): void => {
    localStorage.setItem('decisionList', JSON.stringify(data));
  };

  public static readonly getDatabase = (): void => {
    localStorage.getItem('decisionList');
  };
}

export default StorageService;

import type { Database } from '../../types/types';

export class Utils {
  public static sortById(data: Database): Database {
    data.list.sort((a, b) => {
      const firstId = Number([...a.id].pop());
      const secondId = Number([...b.id].pop());
      return firstId - secondId;
    });
    return data;
  }
}

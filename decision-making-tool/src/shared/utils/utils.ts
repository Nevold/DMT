import Tags from '../../components/tags';
import { StorageService } from '../../services/local-storage.service';
import type { Database } from '../../types/types';

export class Utils {
  public static sortById(data: Database): Database {
    data.list.sort((a, b) => {
      const firstId = Number(a.id.split('#').pop());
      const secondId = Number(b.id.split('#').pop());
      return firstId - secondId;
    });
    return data;
  }

  public static readonly replaceChildren = (): void => {
    Tags.listNode.replaceChildren();
    Tags.childrenList = StorageService.data.list.map(node => Tags.li(node.id, node.title, node.weight));
    Tags.listNode.append(...Tags.childrenList);
  };
}

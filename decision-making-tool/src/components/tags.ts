import { StorageService } from '../services/local-storage.service';
import type { NodeType } from '../types/types';
import { BaseComponent } from './base-component';
import { Nodes } from './nodes';

class Tags {
  public static readonly main = new BaseComponent('main', 'div').getNode();

  public static readonly h1 = new BaseComponent('heading', 'h1', 'Decision Making Tool').getNode();

  public static readonly pasteListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Paste list');
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && Nodes.dialogNode instanceof HTMLDialogElement) {
        event.stopPropagation();
        event.preventDefault();
        Nodes.dialogNode.showModal();
      }
    });
    return buttonIntanceValue.getNode();
  };

  public static readonly clearListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Clear list');
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.stopPropagation();
        event.preventDefault();

        const storageData = {
          list: [],
          lastId: 0
        };
        StorageService.data = storageData;
        StorageService.saveData(storageData);
        Nodes.listNode.replaceChildren();
      }
    });

    return buttonIntanceValue.getNode();
  };

  public static readonly startButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Start');
    return buttonIntanceValue.getNode();
  };
}

export default Tags;

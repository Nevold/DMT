import { StorageService } from '../../services/local-storage.service';
import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';
import { Nodes } from '../nodes';

export class Buttons {
  public static readonly pasteListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Paste list');
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && Nodes.dialogListNode instanceof HTMLDialogElement) {
        event.stopPropagation();
        event.preventDefault();
        Nodes.dialogListNode.showModal();
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

  // public static readonly startButton = (): NodeType => {
  //   const buttonIntanceValue = new BaseComponent('button', 'button', 'Start');
  //   return buttonIntanceValue.getNode();
  // };
}

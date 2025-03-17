import { StorageService } from '../../services/local-storage.service';
import { HashRouter } from '../../services/router.service';
import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';
import { Nodes } from '../nodes';
import { Modal } from './list-modal';

export class Buttons {
  public static readonly pasteListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Paste list');
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && Nodes.dialogListNode instanceof HTMLDialogElement) {
        event.stopPropagation();
        event.preventDefault();
        Nodes.main.append(Modal.dialog());
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

  public static readonly startButton = (): NodeType => {
    Nodes.startButtonNode.addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.preventDefault();
        // HashRouter.navigateTo('/decision-picker');
      }
    });

    return Nodes.startButtonNode;
  };
}

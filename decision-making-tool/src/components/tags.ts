import { StorageService } from '../services/local-storage.service';
import type { NodeType } from '../types/types';
import { BaseComponent } from './base-component';
import { Utils } from '../shared/utils/utils';

// const database = {
//   list: [
//     { id: '#1', title: '1', weight: '1' },
//     { id: '#3', title: '3sdad', weight: '10' },
//     { id: '#4', title: 'aasd3', weight: '10' },
//     { id: '#5', title: 'aaa3', weight: '10' }
//   ],
//   lastId: 3
// };

class Tags {
  public static childrenList: NodeType[] = [];

  public static listNode: NodeType;

  public static readonly main = new BaseComponent('main', 'div').getNode();

  public static readonly h1 = new BaseComponent('heading', 'h1', 'Decision Making Tool').getNode();

  public static readonly dialogNode = new BaseComponent('dialog', 'dialog').getNode();

  public static readonly list = (): NodeType => {
    StorageService.getData();

    this.listNode = new BaseComponent('list', 'ul').getNode();
    this.childrenList = StorageService.data.list.map(node => this.li(node.id, node.title, node.weight));
    this.listNode.append(...this.childrenList);
    return this.listNode;
  };

  public static readonly label = (value: string): NodeType => {
    const labelIntanceValue = new BaseComponent('label', 'label', value);
    labelIntanceValue.setAttributes({ for: `option-${value}` });
    return labelIntanceValue.getNode();
  };

  public static readonly inputTitle = (value: string, title: string = ''): NodeType => {
    const inputIntanceValue = new BaseComponent('title', 'input');
    inputIntanceValue.setAttributes({ id: `option-${value}`, placeholder: 'Title', value: title });
    inputIntanceValue.getNode().addEventListener('input', eventInput => {
      if (eventInput.target instanceof HTMLInputElement) {
        const id = inputIntanceValue.getAttribute('id');
        if (id) {
          const idValue = id.split('option-').pop();
          const currentElementArray = StorageService.data.list.find(element => element.id === idValue);
          if (currentElementArray) {
            currentElementArray.title = eventInput.target.value;
            const storageData = {
              list: [...StorageService.data.list.filter(element => element.id !== idValue), currentElementArray],
              lastId: StorageService.data.lastId
            };
            StorageService.saveData(Utils.sortById(storageData));
          }
        }
      }
    });
    return inputIntanceValue.getNode();
  };

  public static readonly inputWeight = (value: string, weight: string = ''): NodeType => {
    const inputIntanceValue = new BaseComponent('weight', 'input');
    inputIntanceValue.setAttributes({ id: `option-${value}`, placeholder: 'Weight', type: 'number', value: weight });
    inputIntanceValue.getNode().addEventListener('input', eventInput => {
      if (eventInput.target instanceof HTMLInputElement) {
        const id = inputIntanceValue.getAttribute('id');
        if (id) {
          const idValue = id.split('option-').pop();
          const currentElementArray = StorageService.data.list.find(element => element.id === idValue);
          if (currentElementArray) {
            currentElementArray.weight = eventInput.target.value;
            const storageData = {
              list: [...StorageService.data.list.filter(element => element.id !== idValue), currentElementArray],
              lastId: StorageService.data.lastId
            };
            StorageService.saveData(Utils.sortById(storageData));
          }
        }
      }
    });
    return inputIntanceValue.getNode();
  };

  public static readonly li = (id: string, title: string = '', weight: string = ''): NodeType => {
    const liIntanceValue = new BaseComponent('option', 'li');
    liIntanceValue
      .getNode()
      .append(this.label(id), this.inputTitle(id, title), this.inputWeight(id, weight), this.buttonDelete(id));
    return liIntanceValue.getNode();
  };

  public static readonly buttonDelete = (value: string): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Delete');
    buttonIntanceValue.setAttributes({ id: `option-${value}`, type: 'button' });
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        const id = event.target.getAttribute('id');
        if (id) {
          const idValue = id.split('option-').pop();
          const storageData = {
            list: StorageService.data.list.filter(element => element.id !== idValue),
            lastId: StorageService.data.lastId
          };
          StorageService.data = Utils.sortById(storageData);
          StorageService.saveData(Utils.sortById(storageData));
          event.target.parentElement?.remove();
        }
      }
    });
    return buttonIntanceValue.getNode();
  };

  public static readonly addOptionButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Add Option');

    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        const nextIdElement = StorageService.data.lastId + 1;
        StorageService.data.list.push({ id: `#${nextIdElement}`, title: '', weight: '' });
        const storageData = {
          list: StorageService.data.list,
          lastId: nextIdElement
        };
        StorageService.data = Utils.sortById(storageData);
        StorageService.saveData(Utils.sortById(storageData));
        this.listNode.append(this.li(`#${nextIdElement}`));
      }
    });
    return buttonIntanceValue.getNode();
  };

  public static readonly pasteListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Paste list');
    buttonIntanceValue.getNode().addEventListener('click', () => {
      if (this.dialogNode instanceof HTMLDialogElement) {
        this.dialogNode.showModal();
      }
    });
    return buttonIntanceValue.getNode();
  };

  public static readonly clearListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Clear list');
    return buttonIntanceValue.getNode();
  };

  public static readonly saveListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['button', 'wrapper-button'], 'button', 'Save list to file');
    return buttonIntanceValue.getNode();
  };

  public static readonly loadListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['button', 'wrapper-button'], 'button', 'Load list from file');
    return buttonIntanceValue.getNode();
  };

  public static readonly wrapper = (): NodeType => {
    const wrapperIntanceValue = new BaseComponent('wrapper', 'div');
    wrapperIntanceValue.getNode().append(this.saveListButton(), this.loadListButton());
    return wrapperIntanceValue.getNode();
  };

  public static readonly startButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Start');
    return buttonIntanceValue.getNode();
  };
}

export default Tags;

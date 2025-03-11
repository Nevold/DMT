import { StorageService } from '../services/local-storage.service';
import type { Database, NodeType } from '../types/types';
import { BaseComponent } from './base-component';

const database = {
  list: [
    { id: '#1', title: '1', weight: '1' },
    { id: '#3', title: '3sdad', weight: '10' },
    { id: '#4', title: 'aasd3', weight: '10' },
    { id: '#5', title: 'aaa3', weight: '10' }
  ],
  lastId: 3
};

class Tags {
  public static readonly main = new BaseComponent('main', 'div').getNode();

  public static readonly h1 = new BaseComponent('heading', 'h1', 'Decision Making Tool').getNode();

  public static readonly list = (): NodeType => {
    StorageService.getData();

    const listInstance = new BaseComponent('list', 'ul').getNode();
    const nodelist = StorageService.data.list.map(node => this.li(node.id, node.title, node.weight));
    listInstance.append(...nodelist);
    return listInstance;
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
            StorageService.saveData(storageData);
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
            StorageService.saveData(storageData);
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
      .append(this.label(id), this.inputTitle(id, title), this.inputWeight(id, weight), this.buttonDelete());
    return liIntanceValue.getNode();
  };

  public static readonly buttonDelete = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Delete');
    buttonIntanceValue.setAttributes({ type: 'button' });
    buttonIntanceValue.getNode().addEventListener('click', () => console.log('Click!'));
    return buttonIntanceValue.getNode();
  };

  public static readonly addOptionButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Add Option');
    return buttonIntanceValue.getNode();
  };

  public static readonly pasteListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Paste list');
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

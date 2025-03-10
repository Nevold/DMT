import type { NodeType } from '../types/types';
import { BaseComponent } from './base-component';

export const main = new BaseComponent('main', 'div').getNode();

export const h1 = new BaseComponent('heading', 'h1', 'Decision Making Tool').getNode();

export const list = new BaseComponent('list', 'ul').getNode();

export const label = (value: string): NodeType => {
  const labelIntanceValue = new BaseComponent('label', 'label', value);
  labelIntanceValue.setAttributes({ for: `option-${value}` });
  return labelIntanceValue.getNode();
};

export const inputTitle = (value: string): NodeType => {
  const inputIntanceValue = new BaseComponent('title', 'input');
  inputIntanceValue.setAttributes({ id: `option-${value}`, placeholder: 'Title' });
  inputIntanceValue.getNode().addEventListener('input', eventInput => {
    if (eventInput.target instanceof HTMLInputElement) {
      console.log(eventInput.target.value);
    }
  });
  return inputIntanceValue.getNode();
};

export const inputWeight = (): NodeType => {
  const inputIntanceValue = new BaseComponent('weight', 'input');
  inputIntanceValue.setAttributes({ placeholder: 'Weight', type: 'number' });
  return inputIntanceValue.getNode();
};

export const buttonDelete = (): NodeType => {
  const buttonIntanceValue = new BaseComponent('button', 'button', 'Delete');
  buttonIntanceValue.setAttributes({ type: 'button' });
  buttonIntanceValue.getNode().addEventListener('click', () => console.log('Click!'));
  return buttonIntanceValue.getNode();
};

export const li = (id: string): NodeType => {
  const liIntanceValue = new BaseComponent('option', 'li');
  liIntanceValue.getNode().append(label(id), inputTitle(id), inputWeight(), buttonDelete());
  return liIntanceValue.getNode();
};

export const addOptionButton = (): NodeType => {
  const buttonIntanceValue = new BaseComponent('button', 'button', 'Add Option');
  return buttonIntanceValue.getNode();
};

export const pasteListButton = (): NodeType => {
  const buttonIntanceValue = new BaseComponent('button', 'button', 'Paste list');
  return buttonIntanceValue.getNode();
};

export const clearListButton = (): NodeType => {
  const buttonIntanceValue = new BaseComponent('button', 'button', 'Clear list');
  return buttonIntanceValue.getNode();
};

export const saveListButton = (): NodeType => {
  const buttonIntanceValue = new BaseComponent(['button', 'wrapper-button'], 'button', 'Save list to file');
  return buttonIntanceValue.getNode();
};

export const loadListButton = (): NodeType => {
  const buttonIntanceValue = new BaseComponent(['button', 'wrapper-button'], 'button', 'Load list from file');
  return buttonIntanceValue.getNode();
};

export const wrapper = (): NodeType => {
  const wrapperIntanceValue = new BaseComponent('wrapper', 'div');
  wrapperIntanceValue.getNode().append(saveListButton(), loadListButton());
  return wrapperIntanceValue.getNode();
};

import { BaseComponent } from './base-component';

export const main = new BaseComponent('main', 'div').getNode();

export const h1 = new BaseComponent('heading', 'h1', 'Decision Making Tool').getNode();

export const list = new BaseComponent('list', 'ul').getNode();

export const label = (atrr: string) => {
  const labelIntanceValue = new BaseComponent('list', 'label');
  labelIntanceValue.setAttribute(atrr);
  return labelIntanceValue.getNode();
};

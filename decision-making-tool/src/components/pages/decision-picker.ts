import { BaseComponent } from '../base-component';
import { Nodes } from '../nodes';

export class DecisionPicker {
  public static readonly start = (): void => {
    const tag = new BaseComponent('tag', 'div', 'DecisionPicker').getNode();
    Nodes.main.append(tag);
  };
}

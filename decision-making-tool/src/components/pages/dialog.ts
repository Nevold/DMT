import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';

export class Dialog {
  public static readonly dialogNode = new BaseComponent('dialog', 'dialog').getNode();

  public static readonly form = (): NodeType => {
    const formIntanceValue = new BaseComponent('container', 'form');
    return formIntanceValue.getNode();
  };

  public static readonly textarea = (): NodeType => {
    const formIntanceValue = new BaseComponent('textarea', 'textarea');
    formIntanceValue.setAttributes({});
    return formIntanceValue.getNode();
  };
}

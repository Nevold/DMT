import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';

export class Dialog {
  public static readonly dialogNode = new BaseComponent('dialog', 'dialog').getNode();

  public static readonly textarea = (): NodeType => {
    const formIntanceValue = new BaseComponent('textarea', 'textarea');
    formIntanceValue.setAttributes({
      rows: '12',
      cols: '64',
      placeholder: 'Paste a list of new options in a CSV-like format:'
    });
    return formIntanceValue.getNode();
  };

  public static readonly form = (): NodeType => {
    const formIntanceValue = new BaseComponent('container', 'form');
    formIntanceValue.getNode().append(this.textarea());
    return formIntanceValue.getNode();
  };

  public static readonly dialog = (): NodeType => {
    this.dialogNode.append(this.form());
    return this.dialogNode;
  };
}

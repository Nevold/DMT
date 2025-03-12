import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';

export class Dialog {
  public static readonly dialogNode = new BaseComponent('dialog', 'dialog').getNode();

  public static readonly textarea = (): NodeType => {
    const textareaIntanceValue = new BaseComponent('textarea', 'textarea');
    const textareaNode = textareaIntanceValue.getNode();
    if (textareaNode instanceof HTMLTextAreaElement) {
      textareaIntanceValue.setAttributes({
        rows: '12',
        cols: '64'
      });
      textareaNode.placeholder = 'Paste a list of new options in a CSV-like format';
    }
    return textareaNode;
  };

  public static readonly cancel = (): NodeType => {
    const inputIntanceValue = new BaseComponent(['button', 'cancel'], 'button', 'Cancel');
    return inputIntanceValue.getNode();
  };

  public static readonly confirm = (): NodeType => {
    const inputIntanceValue = new BaseComponent(['button', 'confirm'], 'button', 'Confirm');
    return inputIntanceValue.getNode();
  };

  public static readonly form = (): NodeType => {
    const formIntanceValue = new BaseComponent('container', 'form');
    formIntanceValue.getNode().append(this.textarea(), this.cancel(), this.confirm());
    return formIntanceValue.getNode();
  };

  public static readonly dialog = (): NodeType => {
    this.dialogNode.append(this.form());
    return this.dialogNode;
  };
}

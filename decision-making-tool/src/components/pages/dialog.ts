import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';

export class Dialog {
  public static readonly dialogNode = new BaseComponent('dialog', 'dialog').getNode();

  public static textareaNode = new BaseComponent('textarea', 'textarea').getNode();

  public static readonly textarea = (): NodeType => {
    if (this.textareaNode instanceof HTMLTextAreaElement) {
      this.textareaNode.rows = 12;
      this.textareaNode.cols = 64;
      this.textareaNode.placeholder = 'Paste a list of new options in a CSV-like format';
    }
    return this.textareaNode;
  };

  public static readonly cancel = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['button', 'cancel'], 'button', 'Cancel');
    this.closeDialog(buttonIntanceValue);
    return buttonIntanceValue.getNode();
  };

  public static readonly confirm = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['button', 'confirm'], 'button', 'Confirm');
    this.closeDialog(buttonIntanceValue);
    return buttonIntanceValue.getNode();
  };

  public static readonly form = (): NodeType => {
    const formIntanceValue = new BaseComponent('container', 'form');
    formIntanceValue.getNode().append(this.textarea(), this.cancel(), this.confirm());
    return formIntanceValue.getNode();
  };

  public static readonly dialog = (): NodeType => {
    this.dialogNode.append(this.form());
    this.dialogNode.addEventListener('click', event => {
      if (event.target === this.dialogNode && this.dialogNode instanceof HTMLDialogElement) {
        this.dialogNode.close();
      }
    });
    return this.dialogNode;
  };

  private static readonly closeDialog = (buttonIntanceValue: BaseComponent): void => {
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement && this.dialogNode instanceof HTMLDialogElement) {
        event.stopPropagation();
        event.preventDefault();
        this.dialogNode.close();
      }
    });
  };
}

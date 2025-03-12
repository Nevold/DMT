import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';

export class Dialog {
  public static readonly dialogNode = new BaseComponent('dialog', 'dialog').getNode();

  public static readonly textareaNode = new BaseComponent('textarea', 'textarea').getNode();

  public static readonly formNode = new BaseComponent('container', 'form').getNode();

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

    buttonIntanceValue.getNode().addEventListener('click', () => {
      if (this.formNode instanceof HTMLFormElement && this.formNode.elements[0] instanceof HTMLTextAreaElement) {
        const arrayValue = this.formNode.elements[0].value
          .split('\n')
          .filter(Boolean)
          .map(element => element.trim());
        const optionsList = arrayValue
          .map(element => element.split(','))
          .map(value => {
            if (value.length > 2) {
              const lastElement = value.at(-1);
              const arrayWithoutLast = value.slice(0, -1);
              return [arrayWithoutLast.join(','), lastElement];
            }
            return value;
          })
          .map(element => element.map(item => item?.trim()))
          .filter(element => Number(element[1]));

        const storageOptionsList = optionsList.map(item => ({ id: '31', title: item[0], weight: item[1] }));
        console.log(storageOptionsList); // доделать
      }
    });

    this.closeDialog(buttonIntanceValue);
    return buttonIntanceValue.getNode();
  };

  public static readonly form = (): NodeType => {
    this.formNode.append(this.textarea(), this.cancel(), this.confirm());
    return this.formNode;
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
        // this.dialogNode.close();
      }
    });
  };
}

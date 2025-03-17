import { HashRouter } from '../../services/router.service';
import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';
import { Nodes } from '../nodes';

export class DecisionPicker {
  public static readonly startButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['button', 'back-button'], 'button', 'Back');
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.preventDefault();
        HashRouter.navigateTo('/');
      }
    });

    return buttonIntanceValue.getNode();
  };

  public static readonly soundButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['sound', 'button'], 'button', 'Sound');
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.preventDefault();
        event.target.classList.toggle('sound-input');
      }
    });

    return buttonIntanceValue.getNode();
  };

  public static readonly start = (): void => {
    Nodes.formPickNode.append(this.startButton(), this.soundButton());
    Nodes.main.append(Nodes.h1, Nodes.formPickNode);
  };
}

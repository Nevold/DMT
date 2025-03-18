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

  public static readonly startPickButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['pick-button', 'button'], 'button', 'Start');
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.preventDefault();
      }
    });

    return buttonIntanceValue.getNode();
  };

  public static readonly inputDuration = (): NodeType => {
    const inputIntanceValue = new BaseComponent('duration-input', 'input');
    inputIntanceValue.setAttributes({ min: '5', placeholder: 'sec', type: 'number', value: '6' });
    return inputIntanceValue.getNode();
  };

  public static readonly Warnning = (): NodeType => {
    const inputIntanceValue = new BaseComponent('heading', 'h1', 'not yet completed!'.toLocaleUpperCase());
    return inputIntanceValue.getNode();
  };

  public static readonly start = (): void => {
    Nodes.labelDurationNode.append(this.inputDuration());
    Nodes.formPickNode.append(this.startButton(), this.soundButton(), Nodes.labelDurationNode, this.startPickButton());
    Nodes.main.append(Nodes.h1, Nodes.formPickNode, this.Warnning());
  };
}

import { HashRouter } from '../../services/router.service';
import { Constants } from '../../shared/constants';
import type { NodeType } from '../../types/types';
import { BaseComponent } from '../base-component';
import { TimedRotatingCircle } from '../controls/canvas';
import { Nodes } from '../nodes';

export class DecisionPicker {
  public static durationTime = 5;

  public static readonly backButton = (): NodeType => {
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
        if (Nodes.canvas instanceof HTMLCanvasElement) {
          const circle = new TimedRotatingCircle(Nodes.canvas, this.durationTime * 1000, Constants.SECTOR_TEMP);
          circle.startAnimation();
        }
      }
    });

    return buttonIntanceValue.getNode();
  };

  public static readonly inputDuration = (): NodeType => {
    const inputIntanceValue = new BaseComponent('duration-input', 'input');
    inputIntanceValue.setAttributes({ min: '5', placeholder: 'sec', type: 'number', value: '6' });
    inputIntanceValue.getNode().addEventListener('input', event => {
      if (event.target && event.target instanceof HTMLInputElement) {
        this.durationTime = Number(event.target.value);
      }
    });

    return inputIntanceValue.getNode();
  };

  public static readonly canvas = (): NodeType => {
    Nodes.canvas.setAttribute('width', Constants.SIZE);
    Nodes.canvas.setAttribute('height', Constants.SIZE);

    if (Nodes.canvas instanceof HTMLCanvasElement) {
      const circle = new TimedRotatingCircle(Nodes.canvas, this.durationTime * 1000, Constants.SECTOR_TEMP);
      circle.draw();
    }
    return Nodes.canvas;
  };

  public static readonly start = (): void => {
    Nodes.labelDurationNode.textContent = 'Time';
    Nodes.labelDurationNode.append(this.inputDuration());
    Nodes.formPickNode.append(this.backButton(), this.soundButton(), Nodes.labelDurationNode, this.startPickButton());
    Nodes.main.append(Nodes.h1, Nodes.formPickNode, this.canvas());
  };
}

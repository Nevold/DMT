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

  public static readonly canvas = (): NodeType => {
    const canvasIntanceValue = new BaseComponent('wheel', 'canvas');
    canvasIntanceValue.setAttributes({ width: '400', height: '400' });

    const canvas = canvasIntanceValue.getNode();

    if (canvas instanceof HTMLCanvasElement) {
      const context = canvas.getContext('2d');

      if (context) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context.fillStyle = '#003434a3';
        context.fill();
        context.strokeStyle = '#fff';
        context.lineWidth = 1;
        context.stroke();

        for (let index = 0; index < 8; index += 1) {
          const angle = (Math.PI * 2 * index) / 8; // Угол для каждой линии
          const edgeX = centerX + radius * Math.cos(angle);
          const edgeY = centerY + radius * Math.sin(angle);

          context.beginPath();
          context.moveTo(centerX, centerY);
          context.lineTo(edgeX, edgeY);
          context.strokeStyle = 'blue';
          context.stroke();
        }

        const radius2 = 10;

        context.beginPath();
        context.arc(centerX, centerY, radius2, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.stroke();
      }
    }
    return canvas;
  };

  public static readonly start = (): void => {
    Nodes.labelDurationNode.textContent = 'Time';
    Nodes.labelDurationNode.append(this.inputDuration());
    Nodes.formPickNode.append(this.startButton(), this.soundButton(), Nodes.labelDurationNode, this.startPickButton());
    Nodes.main.append(Nodes.h1, Nodes.formPickNode, this.canvas(), this.Warnning());
  };
}

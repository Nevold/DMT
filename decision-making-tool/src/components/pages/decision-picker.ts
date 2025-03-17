import { BaseComponent } from '../base-component';
import { Nodes } from '../nodes';

export class DecisionPicker {
  public static readonly start = (): void => {
    Nodes.main.append(Nodes.h1);
  };
}

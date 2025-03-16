import { Nodes } from '../nodes';

export class DecisionPicker {
  public static readonly start = (): void => {
    document.body.append(Nodes.main);
    Nodes.main.append(Nodes.h1);
  };
}

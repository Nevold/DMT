import { BaseComponent } from '../base-component';
import { Nodes } from '../nodes';

export class NotFound {
  public static readonly h1 = new BaseComponent('heading', 'h1', 'Oops! Something went wrong').getNode();

  public static readonly start = (): void => {
    Nodes.main.append(this.h1, Nodes.backButtonNode);
  };
}

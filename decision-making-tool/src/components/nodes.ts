import type { NodeType } from '../types/types';
import { BaseComponent } from './base-component';

export class Nodes {
  public static readonly dialogNode = new BaseComponent('dialog', 'dialog').getNode();

  public static childrenList: NodeType[] = [];

  public static listNode = new BaseComponent('list', 'ul').getNode();

  public static readonly loadInputNode = new BaseComponent('input', 'input').getNode();

  public static readonly main = new BaseComponent('main', 'div').getNode();

  public static readonly h1 = new BaseComponent('heading', 'h1', 'Decision Making Tool').getNode();

  public static readonly startButtonNode = new BaseComponent('button', 'button', 'Start').getNode();

  public static readonly backButtonNode = new BaseComponent('button', 'button', 'Back to main').getNode();
}

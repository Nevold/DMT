import type { NodeType } from '../types/types';
import { BaseComponent } from './base-component';

export class Nodes {
  public static readonly dialogNode = new BaseComponent('dialog', 'dialog').getNode();

  public static childrenList: NodeType[] = [];

  public static listNode = new BaseComponent('list', 'ul').getNode();

  public static readonly loadInputNode = new BaseComponent('input', 'input').getNode();
}

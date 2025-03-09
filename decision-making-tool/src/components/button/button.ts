import { BaseComponent } from '../base-component';

interface Properties {
  tag: keyof HTMLElementTagNameMap;
  classes: string[];
}

export const button = ({ classes, tag }: Properties): BaseComponent => new BaseComponent(classes, tag);

import type { NodeType, Options } from '../types/types';

export class BaseComponent {
  private readonly node: NodeType;

  constructor(classes: string[] | string, tag: keyof HTMLElementTagNameMap = 'div', content: string = '') {
    this.node = document.createElement(tag);
    if (typeof classes === 'string') {
      this.node.classList.add(classes);
    } else {
      this.node.classList.add(...classes);
    }
    this.node.textContent = content;
  }

  public getNode(): NodeType {
    return this.node;
  }

  public addContent(text: string): void {
    this.node.textContent = text;
  }

  public addClass(classNameClassName: string): void {
    this.node.classList.add(classNameClassName);
  }

  public toggleClass(className: string): void {
    this.node.classList.toggle(className);
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public destroyNode(): void {
    this.node.remove();
  }

  public setAttributeOptions(atrr: string, value: string): void {
    this.node.setAttribute(atrr, `option${value}`);
  }

  public setAttributes(attributes: Options): void {
    const atrr = Object.keys(attributes);
    atrr.forEach(key => this.node.setAttribute(key, attributes[key]));
  }

  public getAttribute = (key: string): string | null => this.node.getAttribute(key);
}

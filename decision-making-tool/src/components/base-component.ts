export class BaseComponent {
  private readonly node: HTMLElement;

  constructor(classes: string[] | string, tag: keyof HTMLElementTagNameMap = 'div', content: string = '') {
    this.node = document.createElement(tag);
    if (typeof classes === 'string') {
      this.node.classList.add(classes);
    } else {
      this.node.classList.add(...classes);
    }
    this.node.textContent = content;
  }

  public getNode(): HTMLElement {
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
}

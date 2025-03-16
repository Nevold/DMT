import type { AppState, Route } from '../types/types';
import { ListOfOptions } from '../components/pages/list-of-options';
import { Nodes } from '../components/nodes';

export class Router {
  public routes: Route[];

  public rootElement: HTMLElement;

  constructor(routes: Route[], rootElementId: string) {
    this.routes = routes;
    this.rootElement = document.querySelector(`#${rootElementId}`) as HTMLElement;
    this.setupEventListeners();
    this.loadInitialRoute();
  }

  public loadInitialRoute(): void {
    const path = globalThis.location.pathname;
    this.navigateTo(path, true);
    // change path?
  }

  public setupEventListeners(): void {
    // Handle back/forward navigation
    globalThis.addEventListener('popstate', (event: PopStateEvent) => {
      const state = event.state as AppState;
      if (state) {
        this.renderRoute(state.currentPath);
      }
    });

    // Intercept all link clicks
    Nodes.startButtonNode.addEventListener('click', event => {
      if (event.target instanceof HTMLButtonElement) {
        event.preventDefault();
        this.navigateTo('/');
      }

      // const target = event.target as HTMLElement;
      // if (target.tagName.toLowerCase() === 'a') {
      //   const href = target.getAttribute('href')!;
      // }
    });
  }

  public navigateTo(path: string, replaceState = false): void {
    const currentState: AppState = {
      currentPath: path,
      previousPath: globalThis.location.pathname
    };

    if (replaceState) {
      globalThis.history.replaceState(currentState, '', path);
    } else {
      globalThis.history.pushState(currentState, '', path);
    }

    this.renderRoute(path);
  }

  private findRoute(path: string): Route | undefined {
    return this.routes.find(route => route.path === path);
  }

  private renderRoute(path: string): void {
    const route = this.findRoute(path);

    if (route) {
      ListOfOptions.start();
    } else {
      document.body.append(Nodes.main);
      Nodes.main.append(Nodes.h1);
    }
  }

  // private handleNotFound(): void {
  //   this.rootElement.innerHTML = '<h1>404 - Page Not Found</h1>';
  //   document.title = 'Not Found';
  // }
}

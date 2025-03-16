// import type { AppState, Route } from '../types/types';
// import { ListOfOptions } from '../components/pages/list-of-options';
// import { Nodes } from '../components/nodes';
// import { DecisionPicker } from '../components/pages/decision-picker';
// import { NotFound } from '../components/pages/not-found';
// import { OptionsModal } from '../components/controls/options-modal';

// export class Router {
//   public static readonly routes = [
//     {
//       path: '/'
//     },
//     {
//       path: '/decision-picker'
//     }
//   ];

//   public static readonly loadInitialRoute = (): void => {
//     const path = globalThis.location.pathname;
//     this.navigateTo(path, true);
//   };

//   public static readonly setupEventListeners = (): void => {
//     globalThis.addEventListener('popstate', (event: PopStateEvent) => {
//       const currentState = event.state;
//       if (
//         typeof currentState === 'object' &&
//         'currentPath' in currentState &&
//         'previousPath' in currentState &&
//         currentState &&
//         typeof currentState.previousPath === 'string' &&
//         typeof currentState.currentPath === 'string'
//       ) {
//         this.renderRoute(currentState.currentPath);
//       }
//     });

//     Nodes.startButtonNode.addEventListener('click', event => {
//       if (event.target instanceof HTMLButtonElement) {
//         event.preventDefault();
//         // this.navigateTo('/decision-picker');
//         Nodes.main.append(OptionsModal.dialog());
//         if (Nodes.dialogOptionsNode instanceof HTMLDialogElement) {
//           Nodes.dialogOptionsNode.showModal();
//         }
//       }
//     });

//     Nodes.backButtonNode.addEventListener('click', event => {
//       if (event.target instanceof HTMLButtonElement) {
//         event.preventDefault();
//         this.navigateTo('/', true);
//       }
//     });
//   };

//   public static readonly navigateTo = (path: string, replaceState = false): void => {
//     const currentState: AppState = {
//       currentPath: path,
//       previousPath: globalThis.location.pathname
//     };

//     if (replaceState) {
//       globalThis.history.replaceState(currentState, '', path);
//     } else {
//       globalThis.history.pushState(currentState, '', path);
//     }

//     this.renderRoute(path);
//   };

//   public static readonly findRoute = (path: string): Route | undefined => {
//     const routePath = this.routes.find(route => route.path === path);

//     return routePath || undefined;
//   };

//   public static readonly renderRoute = (path: string): void => {
//     const route = this.findRoute(path);

//     if (route?.path === '/') {
//       Nodes.main.replaceChildren();
//       ListOfOptions.start();
//     } else if (route?.path === '/decision-picker') {
//       Nodes.main.replaceChildren();
//       DecisionPicker.start();
//     } else {
//       Nodes.main.replaceChildren();
//       NotFound.start();
//     }
//   };

//   public static readonly start = (): void => {
//     this.setupEventListeners();
//     this.loadInitialRoute();
//   };
// }

type RouteHandler = () => void;

export class HashRouter {
  public routes: Record<string, RouteHandler> = {};

  constructor() {
    this.checkInitialRoute();
    globalThis.addEventListener('hashchange', this.handleHashChange);
    window.addEventListener('load', this.handleHashChange);
  }

  public checkInitialRoute(): void {
    const currentHash = globalThis.location.hash.slice(1);

    if (currentHash === '' || currentHash === '/') {
      this.navigateTo('/');
    }
  }

  public navigateTo(path: string): void {
    //+
    globalThis.location.hash = path.startsWith('/') ? path : `/${path}`;
  }

  public handleHashChange = (): void => {
    const hash = globalThis.location.hash.slice(1) || '/';
    const handler = this.routes[hash] || this.routes['*'];
    handler?.();
  };

  public addRoute(path: string, handler: RouteHandler): void {
    this.routes[path] = handler;
  }

  public setNotFound(handler: RouteHandler): void {
    this.routes['*'] = handler;
  }

  public navigate(path: string): void {
    globalThis.location.hash = path;
  }
}

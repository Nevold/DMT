export interface IOptions {
  [key: string]: string;
}

export interface IResp {
  endpoint: string;
  options?: Readonly<IOptions>;
}

export interface ISource<T> {
  id: T;
  name: T;
}

export interface IDate<T> {
  source: ISource<T>;
  author: T;
  title: T;
  description: T;
  url: T;
  urlToImage: T;
  publishedAt: T;
  content: T;
}

export interface IRespArticles {
  articles: IDate<string>[];
}

export type ISourcesKeys = IOptions;

export type ISources = Array<ISourcesKeys>;

export interface IRespSources {
  sources?: ISources;
}

export type ICallbackArticles = (data?: IRespArticles) => void;
export type ICallbackSources = (data?: IRespSources) => void;

export interface ILoader {
  readonly baseLink?: string;
  readonly options?: Readonly<IOptions>;
  errorHandler?: (res: Response) => Response | never;
  getResp: ({ endpoint, options }: Readonly<IResp>, callback: () => void) => void;
  makeUrl: (options: Readonly<IOptions>, endpoint: string) => string;
  load: (
    method: string,
    endpoint: string,
    callback: ICallbackSources | ICallbackArticles,
    options: Readonly<IOptions>
  ) => void;
}

export interface IAppController {
  getSources: (callback: ICallbackSources) => void;
  getNews: (e: Event, callback: ICallbackArticles) => void;
}

export interface INews {
  draw: (data: IDate<string>[]) => void;
}

export interface INewsSources {
  draw: (data: ISources) => void;
}
export interface IAppView {
  readonly news: INews;
  readonly sources: INewsSources;
  drawNews: (data?: IRespArticles) => void;
  drawSources: (data?: IRespSources) => void;
}
export interface IApp {
  readonly controller: IAppController;
  readonly view: IAppView;
  start: () => void;
}

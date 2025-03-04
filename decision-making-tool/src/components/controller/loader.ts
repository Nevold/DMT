import { ICallbackArticles, ICallbackSources, ILoader, IOptions, IResp } from '../types/type';

class Loader implements ILoader {
  constructor(
    readonly baseLink?: string,
    readonly options?: Readonly<IOptions>
  ) {}

  static errorHandler(res: Response): Response | never {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  getResp(
    { endpoint, options = {} }: Readonly<IResp>,
    callback = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  makeUrl(options: Readonly<IOptions>, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach(key => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: ICallbackSources | ICallbackArticles, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(Loader.errorHandler)
      .then(res => res.json())
      .then(data => callback(data))
      .catch(err => console.error(err));
  }
}

export default Loader;

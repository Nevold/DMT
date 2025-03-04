import AppController from '../controller/controller';
import { IApp } from '../types/type';
import AppView from '../view/appView';

class App implements IApp {
  readonly controller: AppController;
  readonly view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    const sources = document.querySelector('.sources');
    if (sources)
      sources.addEventListener('click', e =>
        this.controller.getNews(e, data => {
          if (data) {
            this.view.drawNews(data);
          }
        })
      );
    this.controller.getSources(data => this.view.drawSources(data));
  }
}

export default App;

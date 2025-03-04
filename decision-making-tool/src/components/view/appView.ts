import { IDate, IRespArticles, IRespSources, ISources } from '../types/type';
import News from './news/news';
import Sources from './sources/sources';

class AppView {
  readonly news: News;
  readonly sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data?: IRespArticles): void {
    let values: IDate<string>[];
    if (data) {
      values = data.articles ? data.articles : [];
      this.news.draw(values);
    }
  }

  drawSources(data?: IRespSources): void {
    if (data) {
     const values:ISources = data?.sources ? data?.sources : [];
      this.sources.draw(values);
    }
  }
}

export default AppView;

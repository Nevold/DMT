import { IDate, INews } from '../../types/type';
import './news.css';

class News implements INews {
  draw(data: IDate<string>[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx: number) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLMetaElement;

    news.forEach((item, idx: number) => {
      if (!newsItemTemp) return;
      const newsItemTempContent = newsItemTemp.content as unknown as Document;
      const newsClone = newsItemTempContent.cloneNode(true) as Document;
      const newsItem: HTMLElement | null = newsClone.querySelector('.news__item');

      if (idx % 2 && newsItem) newsItem.classList.add('alt');

      (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
        item.urlToImage || 'img/news_placeholder.jpg'
      })`;
      (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent = item.author || item.source.name;
      (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
      (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
      (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
      (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    (document.querySelector('.news') as HTMLElement).innerHTML = '';
    (document.querySelector('.news') as HTMLElement).appendChild(fragment);
  }
}

export default News;

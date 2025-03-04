import { INewsSources, ISources } from '../../types/type';
import Carousel from '../carousel/carousel';
import './sources.css';

class Sources implements INewsSources {
  readonly carousel: Carousel;

  constructor() {
    this.carousel = new Carousel();
  }
  draw(data: ISources): void {
    const arraySeparatElements: ISources[] = [];
    let count = 0;
    while (count < data.length) {
      arraySeparatElements.push([data[count], data[count + 1], data[count + 2]]);
      count += 3;
    }

    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLMetaElement;

    data.forEach((item, index) => {
      const sourceClone = (sourceItemTemp.content as unknown as Document).cloneNode(true) as HTMLElement;
      if (index > 0) {
        (sourceClone.querySelector('.source__wrapper') as HTMLElement).classList.remove('active');
      }
      (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
      (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    (document.querySelector('.sources') as HTMLElement).append(fragment);

    this.carousel.start();
  }
}

export default Sources;

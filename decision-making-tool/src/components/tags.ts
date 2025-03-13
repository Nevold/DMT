import { StorageService } from '../services/local-storage.service';
import type { NodeType } from '../types/types';
import { BaseComponent } from './base-component';
import { Utils } from '../shared/utils/utils';
import { Dialog } from './pages/dialog';

class Tags {
  public static childrenList: NodeType[] = [];

  public static listNode: NodeType;

  public static readonly main = new BaseComponent('main', 'div').getNode();

  public static readonly h1 = new BaseComponent('heading', 'h1', 'Decision Making Tool').getNode();

  public static readonly loadInputNode = new BaseComponent('input', 'input').getNode();

  public static readonly list = (): NodeType => {
    StorageService.getData();

    this.listNode = new BaseComponent('list', 'ul').getNode();
    this.childrenList = StorageService.data.list.map(node => this.li(node.id, node.title, node.weight));
    this.listNode.append(...this.childrenList);
    return this.listNode;
  };

  public static readonly label = (value: string): NodeType => {
    const labelIntanceValue = new BaseComponent('label', 'label', value);
    labelIntanceValue.setAttributes({ for: `option-${value}` });
    return labelIntanceValue.getNode();
  };

  public static readonly inputTitle = (value: string, title: string = ''): NodeType => {
    const inputIntanceValue = new BaseComponent('title', 'input');
    inputIntanceValue.setAttributes({ id: `option-${value}`, placeholder: 'Title', value: title });
    inputIntanceValue.getNode().addEventListener('input', eventInput => {
      if (eventInput.target instanceof HTMLInputElement) {
        const id = inputIntanceValue.getAttribute('id');
        if (id) {
          const idValue = id.split('option-').pop();
          const currentElementArray = StorageService.data.list.find(element => element.id === idValue);
          if (currentElementArray) {
            currentElementArray.title = eventInput.target.value;
            const storageData = {
              list: [...StorageService.data.list.filter(element => element.id !== idValue), currentElementArray],
              lastId: StorageService.data.lastId
            };
            StorageService.saveData(Utils.sortById(storageData));
          }
        }
      }
    });
    return inputIntanceValue.getNode();
  };

  public static readonly inputWeight = (value: string, weight: string = ''): NodeType => {
    const inputIntanceValue = new BaseComponent('weight', 'input');
    inputIntanceValue.setAttributes({ id: `option-${value}`, placeholder: 'Weight', type: 'number', value: weight });
    inputIntanceValue.getNode().addEventListener('input', eventInput => {
      if (eventInput.target instanceof HTMLInputElement) {
        const id = inputIntanceValue.getAttribute('id');
        if (id) {
          const idValue = id.split('option-').pop();
          const currentElementArray = StorageService.data.list.find(element => element.id === idValue);
          if (currentElementArray) {
            currentElementArray.weight = eventInput.target.value;
            const storageData = {
              list: [...StorageService.data.list.filter(element => element.id !== idValue), currentElementArray],
              lastId: StorageService.data.lastId
            };
            StorageService.saveData(Utils.sortById(storageData));
          }
        }
      }
    });
    return inputIntanceValue.getNode();
  };

  public static readonly li = (id: string, title: string = '', weight: string = ''): NodeType => {
    const liIntanceValue = new BaseComponent('option', 'li');
    liIntanceValue
      .getNode()
      .append(this.label(id), this.inputTitle(id, title), this.inputWeight(id, weight), this.buttonDelete(id));
    return liIntanceValue.getNode();
  };

  public static readonly buttonDelete = (value: string): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Delete');
    buttonIntanceValue.setAttributes({ id: `option-${value}`, type: 'button' });
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.stopPropagation();
        event.preventDefault();
        const id = event.target.getAttribute('id');
        if (id) {
          const idValue = id.split('option-').pop();
          const storageData = {
            list: StorageService.data.list.filter(element => element.id !== idValue),
            lastId: StorageService.data.lastId
          };
          StorageService.data = Utils.sortById(storageData);
          StorageService.saveData(Utils.sortById(storageData));
          event.target.parentElement?.remove();
        }
      }
    });
    return buttonIntanceValue.getNode();
  };

  public static readonly addOptionButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Add Option');

    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.stopPropagation();
        event.preventDefault();
        const nextIdElement = StorageService.data.lastId + 1;
        StorageService.data.list.push({ id: `#${nextIdElement}`, title: '', weight: '' });
        const storageData = {
          list: StorageService.data.list,
          lastId: nextIdElement
        };
        StorageService.data = Utils.sortById(storageData);
        StorageService.saveData(Utils.sortById(storageData));
        this.listNode.append(this.li(`#${nextIdElement}`));
      }
    });
    return buttonIntanceValue.getNode();
  };

  public static readonly pasteListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Paste list');
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && Dialog.dialogNode instanceof HTMLDialogElement) {
        event.stopPropagation();
        event.preventDefault();
        Dialog.dialogNode.showModal();
      }
    });
    return buttonIntanceValue.getNode();
  };

  public static readonly clearListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Clear list');
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.stopPropagation();
        event.preventDefault();

        const storageData = {
          list: [],
          lastId: 0
        };
        StorageService.data = storageData;
        StorageService.saveData(storageData);
        this.listNode.replaceChildren();
      }
    });

    return buttonIntanceValue.getNode();
  };

  public static readonly saveListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['button', 'wrapper-button'], 'button', 'Save list to file');
    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.stopPropagation();
        event.preventDefault();

        StorageService.getData();
        const jsonString = JSON.stringify(StorageService.data, undefined, 2);

        const blob = new Blob([jsonString], { type: 'application/json' });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'option-list';

        document.body.append(link);
        link.click();

        link.remove();
        URL.revokeObjectURL(url);
      }
    });

    return buttonIntanceValue.getNode();
  };

  public static readonly loadListButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent(['button', 'wrapper-button'], 'button', 'Load list from file');

    buttonIntanceValue.getNode().addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLButtonElement) {
        event.stopPropagation();
        // event.preventDefault();
        console.log('object');
      }
    });

    return buttonIntanceValue.getNode();
  };

  public static readonly loadInput = (): NodeType => {
    // inputIntanceValue.setAttributes({ type: 'file', accept: '.json' });
    this.loadInputNode.hidden = true;
    this.loadInputNode.setAttribute('type', 'file');
    this.loadInputNode.setAttribute('accept', '.json');
    this.loadInputNode.addEventListener('click', event => {
      if (event.target && event.target instanceof HTMLInputElement) {
        event.stopPropagation();

        // event.preventDefault();
      }
    });

    return this.loadInputNode;
  };

  public static readonly wrapper = (): NodeType => {
    const wrapperIntanceValue = new BaseComponent('wrapper', 'div');
    wrapperIntanceValue.getNode().append(this.saveListButton(), this.loadListButton(), this.loadInput());
    return wrapperIntanceValue.getNode();
  };

  public static readonly startButton = (): NodeType => {
    const buttonIntanceValue = new BaseComponent('button', 'button', 'Start');
    return buttonIntanceValue.getNode();
  };
}

export default Tags;

// Для загрузки и чтения JSON-файла в браузере с помощью TypeScript и кнопки, выполните следующие шаги:

// 1. HTML (добавьте элементы):
// html
// Copy
// <input type="file" id="jsonInput" accept=".json" hidden />
// <button id="loadJsonBtn">Загрузить JSON</button>
// <div id="output"></div>
// Run HTML
// 2. TypeScript:
// typescript
// Copy
// interface JsonData {
//     [key: string]: any;
// }

// function handleFileUpload(event: Event): Promise<JsonData> {
//     return new Promise((resolve, reject) => {
//         const input = event.target as HTMLInputElement;

//         if (!input.files || input.files.length === 0) {
//             reject(new Error("Файл не выбран"));
//             return;
//         }

//         const file = input.files[0];
//         const reader = new FileReader();

//         reader.onload = (e) => {
//             try {
//                 const result = e.target?.result;
//                 if (typeof result !== 'string') {
//                     reject(new Error("Неподдерживаемый формат файла"));
//                     return;
//                 }

//                 const jsonData = JSON.parse(result) as JsonData;
//                 resolve(jsonData);
//             } catch (error) {
//                 reject(new Error("Ошибка парсинга JSON"));
//             }
//         };

//         reader.onerror = () => {
//             reject(new Error("Ошибка чтения файла"));
//         };

//         reader.readAsText(file);
//     });
// }

// // Пример использования
// document.getElementById('loadJsonBtn')?.addEventListener('click', () => {
//     // Имитируем клик по скрытому input
//     document.getElementById('jsonInput')?.click();
// });

// document.getElementById('jsonInput')?.addEventListener('change', async (event) => {
//     try {
//         const jsonData = await handleFileUpload(event);
//         console.log("Загруженные данные:", jsonData);

//         // Пример вывода данных на страницу
//         const output = document.getElementById('output')!;
//         output.innerHTML = `
//             <h3>Успешно загружено!</h3>
//             <pre>${JSON.stringify(jsonData, null, 2)}</pre>
//         `;
//     } catch (error) {
//         console.error("Ошибка загрузки:", error);
//         alert((error as Error).message);
//     }
// });

// 1. HTML (добавьте элементы):
// html
// Copy
// <input type="file" id="jsonInput" accept=".json" hidden />
// <button id="loadJsonBtn">Загрузить JSON</button>
// <div id="output"></div>
// Run HTML
// 2. TypeScript:
// typescript
// Copy
// interface JsonData {
//     [key: string]: any;
// }

// function handleFileUpload(event: Event): Promise<JsonData> {
//     return new Promise((resolve, reject) => {
//         const input = event.target as HTMLInputElement;

//         if (!input.files || input.files.length === 0) {
//             reject(new Error("Файл не выбран"));
//             return;
//         }

//         const file = input.files[0];
//         const reader = new FileReader();

//         reader.onload = (e) => {
//             try {
//                 const result = e.target?.result;
//                 if (typeof result !== 'string') {
//                     reject(new Error("Неподдерживаемый формат файла"));
//                     return;
//                 }

//                 const jsonData = JSON.parse(result) as JsonData;
//                 resolve(jsonData);
//             } catch (error) {
//                 reject(new Error("Ошибка парсинга JSON"));
//             }
//         };

//         reader.onerror = () => {
//             reject(new Error("Ошибка чтения файла"));
//         };

//         reader.readAsText(file);
//     });
// }

// // Пример использования
// document.getElementById('loadJsonBtn')?.addEventListener('click', () => {
//     // Имитируем клик по скрытому input
//     document.getElementById('jsonInput')?.click();
// });

// document.getElementById('jsonInput')?.addEventListener('change', async (event) => {
//     try {
//         const jsonData = await handleFileUpload(event);
//         console.log("Загруженные данные:", jsonData);

//         // Пример вывода данных на страницу
//         const output = document.getElementById('output')!;
//         output.innerHTML = `
//             <h3>Успешно загружено!</h3>
//             <pre>${JSON.stringify(jsonData, null, 2)}</pre>
//         `;
//     } catch (error) {
//         console.error("Ошибка загрузки:", error);
//         alert((error as Error).message);
//     }
// });

// Объяснение:

// HTML:

// Скрытый <input type="file"> для выбора файла

// Кнопка для инициации выбора файла

// Блок для вывода результатов

// Функция handleFileUpload:

// Принимает событие выбора файла

// Использует FileReader для чтения файла

// Парсит содержимое файла как JSON

// Возвращает Promise с данными или ошибкой

// Типы:

// JsonData интерфейс для типобезопасности

// Явное приведение типов (as) для работы с FileReader

// Обработчики событий:

// Клик по кнопке имитирует клик по скрытому input

// Событие change на input запускает процесс загрузки

// Дополнительные возможности:

// Валидация структуры JSON:

// typescript
// Copy
// interface MyDataStructure {
//     name: string;
//     version: string;
//     items: number[];
// }

// function isMyDataStructure(data: any): data is MyDataStructure {
//     return (
//         typeof data?.name === 'string' &&
//         typeof data?.version === 'string' &&
//         Array.isArray(data?.items)
//     );
// }

// // В обработчике:
// if (!isMyDataStructure(jsonData)) {
//     throw new Error("Неверная структура файла");
// }
// Ограничение размера файла:

// typescript
// Copy
// const MAX_FILE_SIZE = 1024 * 1024; // 1MB

// if (file.size > MAX_FILE_SIZE) {
//     reject(new Error("Файл слишком большой"));
//     return;
// }
// Прогресс загрузки:

// typescript
// Copy
// reader.onprogress = (event) => {
//     if (event.lengthComputable) {
//         const percent = (event.loaded / event.total) * 100;
//         console.log(`Загружено: ${percent.toFixed(1)}%`);
//     }
// };
// Особенности реализации:

// Поддержка drag-and-drop

// Валидация MIME-типа

// Обработка больших файлов

// Подсветка синтаксиса в preview

// Сохранение истории загрузок

// Пример можно расширить для:

// Загрузки конфигураций

// Импорта данных приложения

// Восстановления сохраненных сессий

// Обработки данных аналитики

import { Buttons } from '../controls/buttons';
import { Modal } from '../controls/modal';
import { Options } from '../controls/options';
import { Nodes } from '../nodes';

export class ListOfOptions {
  public static readonly start = (): void => {
    Nodes.main.append(
      Nodes.h1,
      Options.list(),
      Options.addOptionButton(),
      Buttons.pasteListButton(),
      Buttons.clearListButton(),
      Options.wrapper(),
      Nodes.startButtonNode,
      Modal.dialog()
    );
  };
}

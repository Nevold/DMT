import './global.css';
import Tags from './components/tags';
import { Modal } from './components/pages/modal';
import { Options } from './components/pages/options';

const mainNode = Tags.main;
const h1Node = Tags.h1;
const listNode = Options.list();

document.body.append(mainNode);
mainNode.append(
  h1Node,
  listNode,
  Options.addOptionButton(),
  Tags.pasteListButton(),
  Tags.clearListButton(),
  Options.wrapper(),
  Tags.startButton(),
  Modal.dialog()
);

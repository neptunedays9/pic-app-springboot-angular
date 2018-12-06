//import { Element } from './element';
import { Observable } from 'rxjs/Observable';
//import * as Konva from 'konva/konva';

export class Element {
//id: any;
//  src: String;
  constructor(private id: any, private src: string) {
    this.id = id;
    this.src = src;
  }

  public getId() {return this.id;}
  public getSrc() {return this.src;}
};

export const ELEMENTS: Element[] = [new Element(1, '../assets/img/pics/lady1.png'),
new Element(2, '../assets/img/pics/girl1.png'),
new Element(3, '../assets/img/pics/book1.png'),
new Element(4, '../assets/img/pics/family.png'),
new Element(4, '../assets/img/pics/man3.png'),
new Element(4, '../assets/img/pics/people2.png'),
new Element(4, '../assets/img/pics/old1.png'),
new Element(4, '../assets/img/pics/lady2.png'),
new Element(4, '../assets/img/pics/man2.png')];

// export interface scene {
//   story: String;
//   scene: Konva.Stage;
// };

export class Scene {
//id: any;
//  src: String;
  constructor(private story: string, private scene: string) {
    this.story = story;
    this.scene = scene;
  }
};

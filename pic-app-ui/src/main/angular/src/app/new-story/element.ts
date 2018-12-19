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

export const ELEMENTS: Element[] =
[new Element(1, '../assets/img/pics/lady1.png'),
new Element(2, '../assets/img/pics/girl1.png'),
new Element(3, '../assets/img/pics/book1.png'),
new Element(4, '../assets/img/pics/family.png'),
new Element(4, '../assets/img/pics/man3.png'),
new Element(4, '../assets/img/pics/people2.png'),
new Element(4, '../assets/img/pics/old1.png'),
new Element(4, '../assets/img/pics/lady2.png'),
new Element(4, '../assets/img/pics/man2.png')];

export const MAN: Element[] =
[new Element(100, '../assets/img/pics/man/man1.png'),
new Element(101, '../assets/img/pics/man/man1.png'),
new Element(102, '../assets/img/pics/man/man1.png'),
new Element(103, '../assets/img/pics/man/man1.png')];

export const WOMAN: Element[] =
[new Element(200, '../assets/img/pics/woman/lady1.png'),
new Element(201, '../assets/img/pics/woman/lady1.png'),
new Element(202, '../assets/img/pics/woman/lady1.png'),
new Element(203, '../assets/img/pics/woman/lady1.png')];

export const CHILD: Element[] =
[new Element(300, '../assets/img/pics/child/girl1.png'),
new Element(301, '../assets/img/pics/child/girl1.png'),
new Element(302, '../assets/img/pics/child/girl1.png'),
new Element(303, '../assets/img/pics/child/girl1.png')];

export const ANIMAL: Element[] =
[new Element(400, '../assets/img/pics/animal/cat.png'),
new Element(401, '../assets/img/pics/animal/cat.png'),
new Element(402, '../assets/img/pics/animal/cat.png')];

export const PLACE: Element[] =
[new Element(500, '../assets/img/pics/place/flowers-pot-of-yard.png'),
new Element(501, '../assets/img/pics/place/flowers-pot-of-yard.png'),
new Element(502, '../assets/img/pics/place/flowers-pot-of-yard.png'),
new Element(503, '../assets/img/pics/place/flowers-pot-of-yard.png')];

export const FOOD: Element[] =
[new Element(600, '../assets/img/pics/food/apple.png'),
new Element(601, '../assets/img/pics/food/apple.png'),
new Element(602, '../assets/img/pics/food/apple.png'),
new Element(603, '../assets/img/pics/food/apple.png')];

export const FAMILY: Element[] =
[new Element(700, '../assets/img/pics/family/family.png'),
new Element(701, '../assets/img/pics/family/family.png'),
new Element(702, '../assets/img/pics/family/family.png'),
new Element(703, '../assets/img/pics/family/family.png')];

export const FURNITURE: Element[] =
[new Element(800, '../assets/img/pics/furniture/table.png'),
new Element(801, '../assets/img/pics/furniture/table.png'),
new Element(802, '../assets/img/pics/furniture/table.png'),
new Element(803, '../assets/img/pics/furniture/table.png')];

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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryInfoService {
  private story_id: any;

  constructor() {
    this.story_id =  0;
  }

  changeId(id: any) {
    this.story_id = id;
  }

  getId(): Observable<any> {
    console.log("getId : ", this.story_id);
    return of(this.story_id);
  }

}

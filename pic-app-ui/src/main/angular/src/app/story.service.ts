import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  storyUrl = 'http://localhost:8080/story';

  constructor(private http: HttpClient) {
    //this.token = this.tokenExtractor.getToken() as string;
  }

  getStory(id: any) {
    return this.http.get(this.storyUrl + "/"+ id);
  }

}

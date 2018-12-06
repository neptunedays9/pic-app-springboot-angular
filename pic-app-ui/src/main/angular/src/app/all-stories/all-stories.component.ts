import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { map } from 'rxjs/operators';
import {Router, ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/map'
import { StoryInfoService } from '../storyinfo.service';

@Component({
  selector: 'app-all-stories',
  templateUrl: './all-stories.component.html',
  styleUrls: ['./all-stories.component.css']
})
export class AllStoriesComponent implements OnInit {
  title = "app works";
  private apiUrl = 'http://localhost:8080/story/all';
  data:any = {};
  columns: string[];

  constructor(private http: Http, private router: Router, private storyinfo: StoryInfoService, private activatedRoute:ActivatedRoute) {
    console.log("Hello hiyo user from table list");
   }

  ngOnInit() {
    this.columns = this.getColumns();
//    this.getData();
    this.getContacts();
    //this.data = ["ID1", "title1", "By1"];
  }

  getColumns(): string[]{
    return ["ID", "title", "By", "Edit"]
  //  return this.data
}

viewClicked(id: any) {
  console.log("viewClicked: ", id);
  this.storyinfo.changeId(id);

  this.router.navigate(['../new-story'], {relativeTo: this.activatedRoute});
}
  getData() {
    return this.http.get(this.apiUrl).map((res: Response) => res.json())
  }

  getContacts() {
    this.getData().subscribe(data=> {
      console.log(data);
      this.data = data;
  })
  }
}

import { Component, OnInit } from '@angular/core';
import {Http, Response} from '@angular/http';
import { map } from 'rxjs/operators';
import {Router, ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/map'
import { StoryInfoService } from '../storyinfo.service';
import {MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  title: string;
  id: number;
  by: string;
}

@Component({
  selector: 'app-all-stories',
  templateUrl: './all-stories.component.html',
  styleUrls: ['./all-stories.component.css']
})
export class AllStoriesComponent implements OnInit {
  title = "app works";
  private apiUrl = 'http://localhost:8080/story/all';
  data:any = {};
  columnheaders: string[];
  ELEMENT_DATA: PeriodicElement[] = [
    {id: 1, title: 'Hydrogen', by: 'H'},
    {id: 2, title: 'Helium', by: 'He'},
    {id: 3, title: 'Lithium', by: 'Li'}
  ];

  displayedColumns: string[] = ['id', 'title', 'by', 'View'];
  allColumns: string[] = ['id', 'title', 'by'];

  // columnsToDisplay: string[] = this.displayedColumns.slice();

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  // displayedColumns: string[] = this.getColumns();
  // dataSource: any;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private http: Http, private router: Router, private storyinfo: StoryInfoService, private activatedRoute:ActivatedRoute) {
    console.log("Hello hiyo constructor");
   }

  ngOnInit() {
    console.log("Hello hiyo ngOnInit");
    this.columnheaders = this.getColumns();
//    this.getData();
    this.getContacts();
    //this.data = ["ID1", "title1", "By1"];
    this.addViewEditColumn();
  }

addViewEditColumn() {
  console.log(this.allColumns);
  // displayedColumns = this.columns.push(['View']);
  //this.displayedColumns = this.allColumns.concat(['view']);
  console.log(this.displayedColumns);
  // const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
  // console.log(this.columnsToDisplay);
  // console.log(this.displayedColumns);
  // this.displayedColumns['view'] = "ID";
  //    this.columnsToDisplay.push('View');
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
      // this.data = ["ID1", "title1", "By1"];
      // this.dataSource = new MatTableDataSource(this.data);

  })
  }
}

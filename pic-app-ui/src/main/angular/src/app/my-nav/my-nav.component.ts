import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  greeting = {};
  baseUrl = 'http://localhost:8080/login';

  constructor(private breakpointObserver: BreakpointObserver, private http: HttpClient) {
    //this.http.get(baseUrl).subscribe(data => this.greeting = data);
    console.log("In my-nav constructor");
    this.http.get(this.baseUrl).map((res: Response) => res.json());
  }
}

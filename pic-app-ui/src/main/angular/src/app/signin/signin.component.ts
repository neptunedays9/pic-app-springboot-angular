import { Component, ViewChild, OnInit, ElementRef} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { UserService } from '../user.service';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  //functions
  username : any;
  constructor(private http: HttpClient, private router: Router, private userservice:UserService, private activatedRoute:ActivatedRoute) {
    this.userservice.getUserName().subscribe(data=> {
      console.log("this.userservice.getUserName().subscribe");
      console.log(data);
      if(data) {
        //register the user
        this.username = data;
        this.userservice.registerUser(this.username).subscribe(data=> {
          console.log("this.userservice.getUserName().subscribe");
          console.log(data);
        });

        //navigate to the home page
        this.router.navigate(['../home'], {relativeTo: this.activatedRoute});
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}

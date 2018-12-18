import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userNameUrl = 'http://localhost:8080/username';
  userEmailUrl = 'http://localhost:8080/useremail';

  constructor(private http: HttpClient) {
  }

  getUserName() {
    return this.http.get(this.userNameUrl);
  }

  getUserEmail() {
    return this.http.get(this.userEmailUrl);
  }
}

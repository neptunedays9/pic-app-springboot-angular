import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userNameUrl = 'http://localhost:8080/username';
  userEmailUrl = 'http://localhost:8080/useremail';
  userRegisterUrl = 'http://localhost:8080/register';

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
      //'X-XSRF-TOKEN': this.token
    })
  };

  constructor(private http: HttpClient) {
  }

  getUserName() {
    return this.http.get(this.userNameUrl);
  }

  getUserEmail() {
    return this.http.get(this.userRegisterUrl);
  }

  registerUser(username: string): Observable<string> {
    console.log("In registerUser");
    //return this.http.post<string>(this.apiUrl, article);
    return this.http.post<string>(this.userRegisterUrl, username, this.httpOptions)
    .pipe(
      catchError(this.handleError('registerUser', username))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log("handleError error");

      // TODO: send the error to remote logging infrastructure
      console.log("Error" + error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

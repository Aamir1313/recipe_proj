import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class AuthService {
  token: string;

  constructor(private http: Http,
              private router: Router) {}

  signupUser(fname: string, lname: string, email: string, password: string) {
    let signUpUser = {
      fname: fname,
      lname: lname,
      email: email,
      password: password
    };

    return this.http.post('http://www.aamirsheriff.com/recipeapi/public/index.php/api/user/add', signUpUser)
    .subscribe(
      (response: Response) => {
        let body = response.json();
        console.log('add user next');
        console.log(body);
        this.token = body.token;
      },
      (error: any) => {
        console.log('add user errors happened' + error);
      },
      () => {
        console.log('add user completed');
      }
    );
  }

  signinUser(email: string, password: string) {
    let signInUser = {
      email: email,
      password: password
    };

    return this.http.get('', signInUser)
    .subscribe(
      (response: Response) => {
        let body = response.json();
        console.log('');
        console.log(body);
        this.token = body.token;
      },
      (error: any) => {
        console.log('' + error);
      },
      () => {
        console.log('');
      }
    );
  }

  logOut() {

  }

  getToken() {

  }

  isAuthenticated() {
    return this.token != null;
  }
}

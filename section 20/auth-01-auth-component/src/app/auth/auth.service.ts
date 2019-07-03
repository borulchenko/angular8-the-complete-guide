import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDMXvUeUcZUy26hjh4L2-t3M5--c75_7jA',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorResp => {
        let errorMessage = 'An unknown error occured!';
        if (!errorResp.error || !errorResp.error.error) {
          return throwError(errorMessage);

        }
        switch (errorResp.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists';
        }
        return throwError(errorMessage);
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDMXvUeUcZUy26hjh4L2-t3M5--c75_7jA',
      {
        email,
        password,
        returnSecureToken: true
      }
    );
  }
}

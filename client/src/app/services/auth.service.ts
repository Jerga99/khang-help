import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly rootURL = "http://localhost:3001/api/users";
  constructor(private httpClient: HttpClient) {}

  public register(userData: any): Observable<any> {
    return this.httpClient.post(this.rootURL + "/register", userData);
  }

  public login(userData: any): Observable<any> {
    return this.httpClient.post(this.rootURL + "/login", userData).pipe(
      map(token => {
        return this.saveToken(token);
      })
    );
  }

  private saveToken(token: any): any {
    localStorage.setItem("rental_auth", token);

    return token;
  }
}

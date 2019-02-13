import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService {
  private readonly rootURL = 'http://localhost:3001/api/payment';

  constructor(private httpClient: HttpClient) { }

  public getPendingPayments(): Observable<any> {
    return this.httpClient.get(this.rootURL)
  }
}

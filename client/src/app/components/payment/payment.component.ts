import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  stripe: any;
  elements: any

  @ViewChild('cardNumber') cardNumRef: ElementRef
  @ViewChild('cardExpiry') cardExpRef: ElementRef
  @ViewChild('cardCvc') cardCvcRef: ElementRef

  cardNumber: any;
  cardExp: any;
  cardCvc: any;

  constructor() {
    this.stripe = Stripe(environment.STRIPE_PK);
    this.elements = this.stripe.elements();
  }

  ngOnInit() {
    // it has to follow the exact string of Stripe
    this.cardNumber = this.elements.create('cardNumber', { style })
    this.cardNumber.mount(this.cardNumRef.nativeElement)

    this.cardExp = this.elements.create('cardExpiry', { style })
    this.cardExp.mount(this.cardExpRef.nativeElement)

    this.cardCvc = this.elements.create('cardCvc', { style })
    this.cardCvc.mount(this.cardCvcRef.nativeElement)
  }

  onSubmit() {

  }

}

const style = {
  base: {
    iconColor: '#666EE8',
    color: '#31325F',
    lineHeight: '40px',
    fontWeight: 300,
    fontFamily: 'Helvetica Neue',
    fontSize: '15px',

    '::placeholder': {
      color: '#CFD7E0',
    },
  }
}

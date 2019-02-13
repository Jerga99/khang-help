import { Component, OnInit } from "@angular/core";
import { BookingService } from "src/app/services/booking.service";
import { Booking } from "src/app/models/booking.model";
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: "app-manage-booking",
  templateUrl: "./manage-booking.component.html",
  styleUrls: ["./manage-booking.component.scss"]
})
export class ManageBookingComponent implements OnInit {
  bookings: Booking[] = [];
  payments: any[]
  constructor(private bookingService: BookingService,
    private paymentService: PaymentService) { }

  ngOnInit() {
    this.bookingService.getUserBookings().subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
        console.log(bookings);
      },
      () => { }
    );

    this.getPendingPayments();
  }

  getPendingPayments() {
    this.paymentService.getPendingPayments().subscribe(
      (payment: any) => {
        this.payments = payment
      },
      () => {

      }

    )
  }
}

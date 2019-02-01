import { Component, OnInit, Input } from "@angular/core";
import { Booking } from "../../../../models/booking.model";
import { HelperService } from "../../../../services/helper.service";
import * as moment from "moment";
@Component({
  selector: "app-rental-detail-booking",
  templateUrl: "./rental-detail-booking.component.html",
  styleUrls: ["./rental-detail-booking.component.scss"]
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() price: number;
  @Input() bookings: Booking[];

  daterange: any = {};
  bookedOutDates: any[] = [];

  options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: "left",
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(private helperService: HelperService) {}

  ngOnInit() {
    this.getBookedOutDates();
  }

  private getBookedOutDates() {
    if (this.bookings && this.bookings.length > 0) {
      this.bookings.forEach((booking: Booking) => {
        const dateRange = this.helperService.getRangeOfDates(
          booking.startAt,
          booking.endAt
        );

        //  spread operators will get arrays of just single day
        this.bookedOutDates.push(...this.daterange);
      });
    }
  }

  private checkForInvalidDates(date) {
    return (
      this.bookedOutDates.includes(date.format(Booking.DATE_FORMAT)) ||
      // we check if any days is before today and disable them
      date.diff(moment(), "days") < 0
    );
  }

  public selectedDate(value: any, datepicker?: any) {
    console.log(value);

    datepicker.start = value.start;
    datepicker.end = value.end;

    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
}

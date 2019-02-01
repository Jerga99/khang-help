import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Booking } from "../models/booking.model";
@Injectable({
  providedIn: "root"
})
export class HelperService {
  constructor() {}

  public getRangeOfDates(startAt, endAt) {
    const tempDates = [];
    const mEndAt = moment(endAt);

    // reason why startAt should be let cuz it will be incremented
    let mStartAt = moment(startAt);

    while (mStartAt < mEndAt) {
      tempDates.push(mEndAt.format(Booking.DATE_FORMAT));
      // we increment start at till equals to endat
      mStartAt = mStartAt.add(1, "day");
    }

    // startAt has to stay like this because we initialze mStartAt
    tempDates.push(moment(startAt).format(Booking.DATE_FORMAT));
    tempDates.push(mEndAt.format(Booking.DATE_FORMAT));

    return tempDates;
  }
}

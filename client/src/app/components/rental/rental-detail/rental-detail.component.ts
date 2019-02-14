import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RentalService } from "src/app/services/rental.service";
import { Rental } from "src/app/models/rental.model";
import { Review } from '../../../models/review.model';
import { ReviewService } from '../../../services/review.service';

@Component({
  selector: "app-rental-detail",
  templateUrl: "./rental-detail.component.html",
  styleUrls: ["./rental-detail.component.scss"]
})
export class RentalDetailComponent implements OnInit {
  currentId: string;
  rental: Rental;

  reviews: Review[] = []
  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService,
    private reviewService: ReviewService
  ) { }

  ngOnInit() {
    // get the id
    this.route.params.subscribe(params => {
      // console.log(params);
      this.getRental(params["rentalId"]);
    });
  }

  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe(rental => {
      this.rental = rental;
      this.getReviews(rental._id)
    });
  }

  getReviews(rentalId: string) {
    this.reviewService.getRentalReviews(rentalId)
      .subscribe(
        (reviews: Review[]) => {
          this.reviews = reviews;
        },
        () => {

        })
  }
}

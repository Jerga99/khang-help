import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RentalService } from "src/app/services/rental.service";
import { Rental } from "src/app/models/rental.model";

@Component({
  selector: "app-rental-detail",
  templateUrl: "./rental-detail.component.html",
  styleUrls: ["./rental-detail.component.scss"]
})
export class RentalDetailComponent implements OnInit {
  currentId: string;
  rental: Rental;
  constructor(
    private route: ActivatedRoute,
    private rentalService: RentalService
  ) {}

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
    });
  }
}

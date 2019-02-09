import { Component, OnInit } from "@angular/core";
import { Rental } from "src/app/models/rental.model";
import { ActivatedRoute } from "@angular/router";
import { RentalService } from "src/app/services/rental.service";

@Component({
  selector: "app-rental-update",
  templateUrl: "./rental-update.component.html",
  styleUrls: ["./rental-update.component.scss"]
})
export class RentalUpdateComponent implements OnInit {
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

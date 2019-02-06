import { Component, OnInit } from "@angular/core";
import { RentalService } from "src/app/services/rental.service";
import { Rental } from "src/app/models/rental.model";

@Component({
  selector: "app-manage-rental",
  templateUrl: "./manage-rental.component.html",
  styleUrls: ["./manage-rental.component.scss"]
})
export class ManageRentalComponent implements OnInit {
  rentals: Rental[];

  constructor(private rentalService: RentalService) {}

  ngOnInit() {
    this.rentalService.getUserRentals().subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      () => {}
    );
  }
}

import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";

import { RentalListComponent } from "./rental-list/rental-list.component";
import { RentalListItemComponent } from "./rental-list-item/rental-list-item.component";
import { RentalComponent } from "./rental.component";
import { RentalService } from "src/app/services/rental.service";

import { Routes, RouterModule } from "@angular/router";
import { RentalDetailComponent } from "../rental/rental-detail/rental-detail.component";
import {
  HttpClient,
  HttpHandler,
  HttpClientModule
} from "@angular/common/http";

import { NgPipesModule } from "ngx-pipes";
import { MapModule } from "../map/map.module";
import { AuthGuard } from "../auth/auth.guard";
const routes: Routes = [
  // we still have route on app-routing-module
  // we do redirecto , pathmatch on the approuting
  {
    path: "rentals",
    component: RentalComponent,
    children: [
      { path: "", component: RentalListComponent },
      {
        path: ":rentalId",
        component: RentalDetailComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule
  ],

  // service inside the providers:
  providers: [RentalService, HttpClient]
})
export class RentalModule {}

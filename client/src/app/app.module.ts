import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { RentalModule } from "./components/rental/rental.module";
import { HttpClient } from "@angular/common/http";
import { MapModule } from "./components/map/map.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, RentalModule, MapModule],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ReservationStoreComponent } from "./store/reservation-store.component";
import { AreaListComponent } from "./components/area-list.component";
import { TimeSlotListComponent } from "./components/timeslot-list.component";
import { ReservationSummaryComponent } from "./components/reservation-summary.component";
import { ReservationDetailComponent } from "./components/reservation-detail.component";
import { DateSelectorComponent } from "./components/date-selector.component";
import { ModelModule } from "./model/model.module";

@NgModule({
    imports: [ModelModule, BrowserModule, FormsModule, RouterModule],
    declarations: [
        ReservationStoreComponent,
        AreaListComponent,
        TimeSlotListComponent,
        ReservationSummaryComponent,
        ReservationDetailComponent,
        DateSelectorComponent
    ],
    exports: [ReservationStoreComponent]
})
export class ConservationModule { }
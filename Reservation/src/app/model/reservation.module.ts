import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReservationStoreComponent } from './store/reservation-store.component';
import { AreaListComponent } from './components/area-list.component';
import { TimeSlotListComponent } from './components/timeslot-list.component';
import { ReservationSummaryComponent } from './components/reservation-summary.component';
import { DateSelectorComponent } from './components/date-selector.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: ReservationStoreComponent }
        ])
    ],
    declarations: [
        ReservationStoreComponent,
        AreaListComponent,
        TimeSlotListComponent,
        ReservationSummaryComponent,
        DateSelectorComponent
    ]
})
export class ReservationModule { }
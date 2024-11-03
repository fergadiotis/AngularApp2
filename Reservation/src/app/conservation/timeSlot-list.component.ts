import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TimeSlot } from "../model/timeSlot.model";
import { ConservationArea } from "../model/conservation-area.model";

@Component({
    selector: "timeslot-list",
    template: `
    <div class="row row-cols-1 row-cols-md-2 g-4">
        <div *ngFor="let slot of slots" class="col">
            <div class="card h-100" [class.border-primary]="slot.isAvailable">
                <div class="card-body">
                    <h5 class="card-title">
                        {{getAreaName(slot.areaId)}}
                        <span class="badge bg-primary float-end">
                            ${{ slot.price }}
                        </span>
                    </h5>
                    <p class="card-text">
                        <i class="fas fa-clock"></i>
                        {{slot.startTime | date:'shortTime'}} - 
                        {{slot.endTime | date:'shortTime'}}
                    </p>
                    <p class="card-text">
                        <i class="fas fa-users"></i>
                        Available Spots: {{slot.maxCapacity - slot.currentBookings}}
                    </p>
                    <div class="d-grid">
                        <button class="btn"
                                [class.btn-success]="slot.isAvailable"
                                [class.btn-secondary]="!slot.isAvailable"
                                [disabled]="!slot.isAvailable"
                                (click)="reserveSlot.emit(slot)">
                            {{slot.isAvailable ? 'Reserve Slot' : 'Fully Booked'}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
export class TimeSlotListComponent {
    @Input() slots: TimeSlot[] = [];
    @Input() areas: ConservationArea[] = [];
    @Output() reserveSlot = new EventEmitter<TimeSlot>();

    getAreaName(areaId: number): string {
        return this.areas.find(a => a.id === areaId)?.name ?? "Unknown Area";
    }
}
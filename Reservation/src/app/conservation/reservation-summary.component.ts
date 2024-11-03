import { Component, Input } from "@angular/core";
import { TimeSlot } from "../model/timeSlot.model";
import { ConservationArea } from "../model/conservation-area.model";

@Component({
    selector: "reservation-summary",
    template: `
    <div *ngIf="currentSlot" class="float-end small bg-info text-white p-2 rounded">
        <span>
            Selected: {{getAreaName(currentSlot.areaId)}} -
            {{currentSlot.startTime | date:'shortTime'}}
        </span>
    </div>
    `
})
export class ReservationSummaryComponent {
    @Input() currentSlot: TimeSlot | undefined;
    @Input() areas: ConservationArea[] = [];

    getAreaName(areaId: number): string {
        return this.areas.find(a => a.id === areaId)?.name ?? "Unknown Area";
    }
}
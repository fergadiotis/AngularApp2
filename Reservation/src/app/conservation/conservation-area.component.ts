import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ConservationArea } from "../model/conservation-area.model";

@Component({
    selector: "area-list",
    template: `
    <div class="d-grid gap-2">
        <h4>Conservation Areas</h4>
        <button class="btn btn-outline-primary"
                [class.active]="!selectedArea"
                (click)="selectArea.emit(undefined)">
            All Areas
        </button>
        <button *ngFor="let area of areas"
                class="btn btn-outline-primary"
                [class.active]="area.id === selectedArea?.id"
                (click)="selectArea.emit(area)">
            {{area.name}}
            <small class="d-block text-muted">{{area.features.join(' • ')}}</small>
        </button>
    </div>
    `
})
export class AreaListComponent {
    @Input() areas: ConservationArea[] = [];
    @Input() selectedArea: ConservationArea | undefined;
    @Output() selectArea = new EventEmitter<ConservationArea | undefined>();
}
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "date-selector",
    template: `
    <div class="mt-4">
        <h4>Select Date</h4>
        <input type="date" class="form-control" 
               [min]="minDate" [max]="maxDate"
               [value]="selectedDate | date:'yyyy-MM-dd'"
               (change)="dateChange.emit($event)">
        <div class="mt-2 text-muted small">
            Available dates: {{minDate}} to {{maxDate}}
        </div>
    </div>
    `
})
export class DateSelectorComponent {
    @Input() selectedDate: Date = new Date();
    @Input() minDate: string = new Date().toISOString().split('T')[0];
    @Input() maxDate: string = new Date().toISOString().split('T')[0];
    @Output() dateChange = new EventEmitter<Event>();
}
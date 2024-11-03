import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { RestDataSource } from './rest.datasource';
import { ConservationArea } from './conservation-area.model';
import { TimeSlot } from './timeSlot.model';

@Injectable({
    providedIn: 'root'
})
export class ReservationRepository {
    private areas: ConservationArea[] = [];
    private currentReservation = new BehaviorSubject<any>(null);

    constructor(private dataSource: RestDataSource) {
        this.loadAreas();
    }

    private async loadAreas() {
        try {
            const areas = await this.dataSource.getAreas().toPromise();
            if (areas) {
                this.areas = areas;
            }
        } catch (error) {
            console.error('Error loading areas:', error);
        }
    }

    getAreas(): ConservationArea[] {
        return [...this.areas];
    }

    getArea(id: number): ConservationArea | undefined {
        return this.areas.find(a => a.id === id);
    }

    getTimeSlots(date: Date, areaId?: number): Observable<TimeSlot[]> {
        return this.dataSource.getTimeSlots(date, areaId);
    }

    setCurrentReservation(reservation: any) {
        this.currentReservation.next(reservation);
    }

    getCurrentReservation() {
        return this.currentReservation.asObservable();
    }
}
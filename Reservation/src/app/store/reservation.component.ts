import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationRepository } from '../model/reservation.repository';
import { ConservationArea } from '../model/conservation-area.model';
import { TimeSlot } from '../model/timeSlot.model';

@Component({
    selector: 'reservation-store',
    templateUrl: './reservation.component.html'
})
export class ReservationStoreComponent implements OnInit {
    selectedArea?: ConservationArea;
    selectedDate: Date = new Date();
    selectedSlot?: TimeSlot;
    availableTimeSlots: TimeSlot[] = [];
    isLoading = false;
    errorMessage = '';

    constructor(
        private repository: ReservationRepository,
        private router: Router
    ) { }

    ngOnInit() {
        // Initialize component with default date range
        this.setDateRange();
        // Load initial data
        this.loadTimeSlots();
    }

    private setDateRange() {
        const today = new Date();
        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 30);

        this.minDate = today.toISOString().split('T')[0];
        this.maxDate = maxDate.toISOString().split('T')[0];
    }

    get areas(): ConservationArea[] {
        return this.repository.getAreas() || [];
    }

    async loadTimeSlots() {
        if (!this.selectedArea) {
            this.availableTimeSlots = [];
            return;
        }

        try {
            this.isLoading = true;
            this.errorMessage = '';

            const slots = await this.repository
                .getTimeSlots(this.selectedDate, this.selectedArea.id)
                .toPromise();

            this.availableTimeSlots = slots?.map(slot => ({
                ...slot,
                isAvailable: slot.currentBookings < slot.maxCapacity
            })) ?? [];
        } catch (error) {
            this.errorMessage = 'Failed to load time slots. Please try again.';
            console.error('Error loading time slots:', error);
        } finally {
            this.isLoading = false;
        }
    }

    async selectArea(area: ConservationArea) {
        this.selectedArea = area;
        await this.loadTimeSlots();
    }

    async onDateChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.value) {
            this.selectedDate = new Date(input.value);
            await this.loadTimeSlots();
        }
    }

    reserveSlot(slot: TimeSlot) {
        if (!this.selectedArea || !slot) return;

        this.repository.setCurrentReservation({
            slot,
            area: this.selectedArea,
            date: this.selectedDate
        });

        this.router.navigate(['/reserve', 'checkout']);
    }
}

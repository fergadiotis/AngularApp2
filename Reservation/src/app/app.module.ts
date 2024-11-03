import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ReservationModule } from './reservation/reservation.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: '', redirectTo: '/areas', pathMatch: 'full' },
            {
                path: 'areas', loadChildren: () =>
                    import('./reservation/reservation.module').then(m => m.ReservationModule)
            }
        ]),
        ReservationModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
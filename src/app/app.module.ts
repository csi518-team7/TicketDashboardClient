import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TicketService } from './shared/ticket/ticket.service';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { GiphyService } from './shared/giphy/giphy.service';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';

// Routes might move out to a single route file latter
const appRoutes: Routes = [
  {path: '', redirectTo: '/ticket-list', pathMatch: 'full'},
  {
    path: 'ticket-list',
    component: TicketListComponent
  },
  {
    path: 'ticket-add',
    component: TicketEditComponent
  },
  {
    path: 'ticket-edit/:id',
    component: TicketEditComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TicketService, GiphyService],
  bootstrap: [AppComponent]
})
export class AppModule { }

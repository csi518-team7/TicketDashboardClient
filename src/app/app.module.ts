import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TicketService } from './shared/ticket/ticket.service';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { GiphyService } from './shared/giphy/giphy.service';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';

// Okta callback component
import { OktaCallbackComponent, OktaAuthModule } from '@okta/okta-angular';
// Bearer token to HTTP requests
import { AuthInterceptor } from './shared/okta/auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';

// Routes might move out to a single route file latter
const appRoutes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'dashboard',
    component: DashboardComponent
  },
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
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
];

// Okta API config
const config = {
  issuer: 'https://dev-891348.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oah218c233ttuzLZ0h7'
};

@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketEditComponent,
    DashboardComponent
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
    RouterModule.forRoot(appRoutes),
    OktaAuthModule.initAuth(config)
  ],
  providers: [TicketService, GiphyService,
              {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

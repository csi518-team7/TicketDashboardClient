import { Component, OnDestroy ,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TicketService } from '../shared/ticket/ticket.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit, OnDestroy {
  ticket: any = {};
  
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ticketService: TicketService,
              private giphySerbice: GiphyService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.ticketService.get(id).subscribe((ticket: any) => {
          if (ticket) {
            this.ticket = ticket;
            this.ticket.href = ticket._links.self.href;
            this.giphySerbice.get(ticket.name).subscribe(url => ticket.giphyUrl = url);
          } else {
            console.log(`Ticket with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/ticket-list']);
  }

  save(form: NgForm) {
    this.ticketService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
  
  remove(href) {
    this.ticketService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}

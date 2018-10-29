import { Component, OnInit } from '@angular/core';
import { TicketService } from '../shared/ticket/ticket.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})

export class TicketListComponent implements OnInit {

  tickets: Array<any>;

  constructor(private ticketService: TicketService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.ticketService.getAll().subscribe(data => {
      this.tickets = data;
      for (const ticket of this.tickets) {
        this.giphyService.get(ticket.name).subscribe(url => ticket.giphyUrl = url);
      }
    });
  }

}

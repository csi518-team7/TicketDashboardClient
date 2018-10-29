import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  public API = '//localhost:8080';
  public TICKET_API = this.API + '/tickets';

  constructor(private http: HttpClient) { }
  
  // Fetch all the tickets
  getAll(): Observable<any> {
    return this.http.get('//localhost:8080/tickets');
  }

  get(id: string) {
    return this.http.get(this.TICKET_API + '/' + id);
  }

  save(ticket: any): Observable<any> {
    let result: Observable<Object>;
    if(ticket['href']) {
      result = this.http.put(ticket.href, ticket);
    } else {
      result = this.http.post(this.TICKET_API, ticket);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

}

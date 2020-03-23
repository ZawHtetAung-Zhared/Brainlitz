import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ToolCommunicationService {
  constructor() {}
  private searchInput = new Subject<any>();

  searchEmitted$ = this.searchInput.asObservable();

  searchDataInput(data: {}) {
    this.searchInput.next(data);
  }
}

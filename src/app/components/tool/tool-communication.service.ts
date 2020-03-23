import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ToolCommunicationService {
  constructor() {}
  private searchInput = new Subject<any>();
  private refreshAPGList = new Subject<any>();

  searchEmitted$ = this.searchInput.asObservable();
  refreshList$ = this.refreshAPGList.asObservable();

  searchDataInput(data: {}) {
    this.searchInput.next(data);
  }

  refreshApgList() {
    this.refreshAPGList.next(true);
  }
}

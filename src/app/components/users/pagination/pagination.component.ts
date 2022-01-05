import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() evaluation;

  constructor() {}

  ngOnInit() {}

  previous(data) {
    console.log('previous', data);
  }

  next(data) {
    console.log('next', data);
  }
}

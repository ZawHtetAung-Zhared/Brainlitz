import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() evaluation;

  constructor() {}

  ngOnInit() {
    this.evaluation['slideIndex'] = 1;
  }

  previous(data) {
    console.log('previous', data);
    if (this.evaluation.slideIndex > 1) this.evaluation.slideIndex -= 1;
  }

  next(data) {
    console.log('next', data);
    if (this.evaluation.slideIndex < this.evaluation.assessments.length)
      this.evaluation.slideIndex += 1;
  }
}

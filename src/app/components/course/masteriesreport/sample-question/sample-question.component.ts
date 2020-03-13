import {
  Component,
  OnInit,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { appService } from '../../../../service/app.service';

@Component({
  selector: 'app-sample-question',
  templateUrl: './sample-question.component.html',
  styleUrls: ['./sample-question.component.css']
})
export class SampleQuestionComponent implements OnInit {
  private loadingQuestion: boolean = false;
  private samplexml: any;
  @Input() masteryId;
  @Output() closed = new EventEmitter<boolean>();
  constructor(private _service: appService) {}

  ngOnInit() {
    this.getQuestion(this.masteryId);
  }

  getQuestion(masteryId) {
    this.loadingQuestion = true;
    this._service.getMasteryQuestion(masteryId).subscribe(
      (res: any) => {
        console.log(res);
        this.samplexml = res;
        setTimeout(() => {
          this.loadingQuestion = false;
        }, 1000);

        setTimeout(() => {
          this.setupQuiz();
          this.setupAnswer();
        }, 100);
      },
      err => {
        console.log(err);
      }
    );
  }

  setupQuiz() {
    $('#Question').html(this.samplexml.data.quiz.question);
    var textElems = $('text');
    for (var j = 0; j < textElems.length; j++) {
      var currElem = textElems[j];
      $(textElems[j]).html(
        '<div class="pt-4">' + $(textElems[j]).attr('value') + '</div>'
      );
    }
    console.log('>>>>>>>>>>>>>>>setup Quiz<<<<<<<<<<<<<<<<');
  }

  setupAnswer() {
    this.samplexml.data.quiz.answers.forEach(function(element) {
      $('#' + element._id).html(element.answer);
      var textElems = $('text');
      for (var j = 0; j < textElems.length; j++) {
        $(textElems[j]).html(
          '<div>' + $(textElems[j]).attr('value') + '</div>'
        );
      }
    });
  }

  cancelModal() {
    this.closed.emit(true);
  }
}

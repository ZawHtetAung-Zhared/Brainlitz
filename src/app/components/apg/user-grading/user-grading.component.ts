import { Component, OnInit } from '@angular/core';
import { appService } from '../../../service/app.service';
@Component({
  selector: 'app-user-grading',
  templateUrl: './user-grading.component.html',
  styleUrls: ['./user-grading.component.css']
})
export class UserGradingComponent implements OnInit {
  public userGradeData;
  public gradeName;
  public selectedIndex;
  public showPopUp = false;
  public selectedColor = {
    name: '1',
    color: {
      text: '#544600',
      background: '#FFE04D'
    }
  };
  public isFocus;
  public regionID = localStorage.getItem('regionId');
  public locationID = localStorage.getItem('locationId');
  public moduleID = localStorage.getItem('moduleID');
  public blockColors = [
    {
      name: '1',
      color: {
        text: '#544600',
        background: '#FFE04D'
      }
    },
    {
      name: '2',
      color: {
        text: '#6E2D00',
        background: '#FFCBA6'
      }
    },
    {
      name: '3',
      color: {
        text: '#005733',
        background: '#80FFCA'
      }
    },
    {
      name: '4',
      color: {
        text: '#003E7D',
        background: '#B3D8FF'
      }
    },
    {
      name: '5',
      color: {
        text: '#5000A1',
        background: '#DFBFFF'
      }
    },
    {
      name: '6',
      color: {
        text: '#7A0052',
        background: '#FFCBA6'
      }
    }
  ];
  public sepalColor = [
    {
      name: '1',
      color: {
        text: '#6E2D00',
        background: '#FFCBA6'
      }
    },
    {
      name: '2',
      color: {
        text: '#544600',
        background: '#FFE04D'
      }
    },
    {
      name: '3',
      color: {
        text: '#005733',
        background: '#80FFCA'
      }
    },
    {
      name: '4',
      color: {
        text: '#003E7D',
        background: '#B3D8FF'
      }
    },
    {
      name: '5',
      color: {
        text: '#5000A1',
        background: '#DFBFFF'
      }
    },
    {
      name: '6',
      color: {
        text: '#7A0052',
        background: '#FFBFE9'
      }
    }
  ];

  constructor(private _service: appService) {}

  ngOnInit() {
    this.userGradeData = {
      name: '',
      description: '',
      moduleId: '',
      data: {
        color: {
          text: '#005934',
          background: '#ccffea'
        },
        sepalColor: {
          text: '#005934',
          background: '#ccffea'
        },
        grades: [
          {
            name: 'level 1',
            point: '1'
          }
        ]
      }
    };
  }

  addLevel() {
    const tempObj = {
      name: 'level 1',
      point: '1'
    };
    this.userGradeData.data.grades.push(tempObj);
  }

  removeLevel(index) {
    this.userGradeData.data.grades.splice(index, 1);
  }

  colorpalettePopUp(index) {
    this.showPopUp = true;
    this.selectedIndex = index;
  }
  applyGradeName() {
    this.userGradeData.data.color.text = this.selectedColor.color.text;
    this.userGradeData.data.color.background = this.selectedColor.color.background;
    this.userGradeData.data.grades[this.selectedIndex].name = this.gradeName;
  }
  onFocus() {
    this.isFocus = true;
  }

  onFocusOut() {
    this.isFocus = false;
  }
  createUserGradeApg(data) {
    this._service
      .createAPG(this.regionID, this.regionID, data, undefined, this.moduleID)
      .subscribe(
        res => {},
        err => {
          console.error(err);
        }
      );
  }
}

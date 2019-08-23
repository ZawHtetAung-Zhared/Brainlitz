import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-grading',
  templateUrl: './user-grading.component.html',
  styleUrls: ['./user-grading.component.css']
})
export class UserGradingComponent implements OnInit {
  public userGradeData;
  public blockColors = [
    {
      name: '1',
      color: {
        text: '#803500',
        background: '#ffe9d9'
      }
    },
    {
      name: '2',
      color: {
        text: '#594a00',
        background: '#fff4bf'
      }
    },
    {
      name: '3',
      color: {
        text: '#005934',
        background: '#ccffea'
      }
    },
    {
      name: '4',
      color: {
        text: '#004080',
        background: '#cce6ff'
      }
    },
    {
      name: '5',
      color: {
        text: '#6600cc',
        background: '#f2e6ff'
      }
    },
    {
      name: '6',
      color: {
        text: '#990066',
        background: '#ffe6f6'
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

  constructor() {}

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
          },
          {
            name: 'level 1',
            point: '1'
          }
        ]
      }
    };
  }
}

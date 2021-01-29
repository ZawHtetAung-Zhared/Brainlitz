import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lesson-picker',
  templateUrl: './lesson-picker.component.html',
  styleUrls: ['./lesson-picker.component.css']
})
export class LessonPickerComponent implements OnInit {
  @Output() flag = new EventEmitter<any>();

  public enrollList: any = [];

  public mock: any = {
    lessons: [
      {
        startDate: '2021-01-29T07:00:00.000Z',
        endDate: '2021-01-29T07:35:00.000Z',
        teacherId: '5eda81c273472b00f948fceb',
        conflictWith: [
          {
            lessons: [
              {
                courseId: '5ff536fe9f5e0e0221c65081',
                name: 'fullJan',
                description: 'fdaf',
                location: "SparkWerkz ( Don't Touch )",
                no_of_student: 0,
                cancel: false,
                _id: '5ff542c39f5e0e0221c652f2',
                startDate: '2021-01-29T07:00:00.000Z',
                endDate: '2021-01-29T07:35:00.000Z',
                teacherId: '5f03251a98173e0088c42158'
              },
              {
                courseId: '5ff536fe9f5e0e0221c65081',
                name: 'fullJan',
                description: 'fdaf',
                location: "SparkWerkz ( Don't Touch )",
                no_of_student: 0,
                cancel: false,
                _id: '5ff542c39f5e0e0221c652f2',
                startDate: '2021-01-29T07:00:00.000Z',
                endDate: '2021-01-29T07:35:00.000Z',
                teacherId: '5f03251a98173e0088c42158'
              },
              {
                courseId: '5ff53e349f5e0e0221c65126',
                name: 'fulljan2',
                description: 'fdaf',
                location: "SparkWerkz ( Don't Touch )",
                no_of_student: 2,
                cancel: false,
                _id: '5ff545d49f5e0e0221c6534f',
                startDate: '2021-01-29T07:00:00.000Z',
                endDate: '2021-01-29T07:35:00.000Z',
                teacherId: '5ff53c8a9f5e0e0221c65122'
              }
            ],
            staffId: '5fd6f7cf6933830278d1511e',
            preferredName: 'zhastaff',
            profilePic:
              'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png',
            position: ''
          },
          {
            lessons: [
              {
                courseId: '5ff536fe9f5e0e0221c65081',
                name: 'fullJan',
                description: 'fdaf',
                location: "SparkWerkz ( Don't Touch )",
                no_of_student: 0,
                cancel: false,
                _id: '5ff542c39f5e0e0221c652f2',
                startDate: '2021-01-29T07:00:00.000Z',
                endDate: '2021-01-29T07:35:00.000Z',
                teacherId: '5f03251a98173e0088c42158'
              }
            ],
            staffId: '5f05413ecee167018f7758cf',
            preferredName: 'amk@relief',
            profilePic:
              'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png',
            position: ''
          }
        ],
        hasConflict: true,
        enrolledStudentCount: 0,
        isEnrolled: false
      },
      {
        startDate: '2021-01-30T07:00:00.000Z',
        endDate: '2021-01-30T07:35:00.000Z',
        teacherId: '5eda81c273472b00f948fceb',
        conflictWith: [
          {
            lessons: [
              {
                courseId: '5ff536fe9f5e0e0221c65081',
                name: 'fullJan',
                description: 'fdaf',
                location: "SparkWerkz ( Don't Touch )",
                no_of_student: 0,
                cancel: false,
                _id: '5ff542c39f5e0e0221c652f3',
                startDate: '2021-01-30T07:00:00.000Z',
                endDate: '2021-01-30T07:35:00.000Z',
                teacherId: '5f03251a98173e0088c42158'
              },
              {
                courseId: '5ff536fe9f5e0e0221c65081',
                name: 'fullJan',
                description: 'fdaf',
                location: "SparkWerkz ( Don't Touch )",
                no_of_student: 0,
                cancel: false,
                _id: '5ff542c39f5e0e0221c652f3',
                startDate: '2021-01-30T07:00:00.000Z',
                endDate: '2021-01-30T07:35:00.000Z',
                teacherId: '5f03251a98173e0088c42158'
              },
              {
                courseId: '5ff53e349f5e0e0221c65126',
                name: 'fulljan2',
                description: 'fdaf',
                location: "SparkWerkz ( Don't Touch )",
                no_of_student: 2,
                cancel: false,
                _id: '5ff545d49f5e0e0221c65350',
                startDate: '2021-01-30T07:00:00.000Z',
                endDate: '2021-01-30T07:35:00.000Z',
                teacherId: '5ff53c8a9f5e0e0221c65122'
              }
            ],
            staffId: '5fd6f7cf6933830278d1511e',
            preferredName: 'zhastaff',
            profilePic:
              'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png',
            position: ''
          },
          {
            lessons: [
              {
                courseId: '5ff536fe9f5e0e0221c65081',
                name: 'fullJan',
                description: 'fdaf',
                location: "SparkWerkz ( Don't Touch )",
                no_of_student: 0,
                cancel: false,
                _id: '5ff542c39f5e0e0221c652f3',
                startDate: '2021-01-30T07:00:00.000Z',
                endDate: '2021-01-30T07:35:00.000Z',
                teacherId: '5f03251a98173e0088c42158'
              }
            ],
            staffId: '5f05413ecee167018f7758cf',
            preferredName: 'amk@relief',
            profilePic:
              'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png',
            position: ''
          }
        ],
        hasConflict: true,
        enrolledStudentCount: 0,
        isEnrolled: false
      },
      {
        startDate: '2021-01-31T07:00:00.000Z',
        endDate: '2021-01-31T07:35:00.000Z',
        teacherId: '5eda81c273472b00f948fceb',
        conflictWith: [
          {
            lessons: [
              {
                courseId: '5ff536fe9f5e0e0221c65081',
                name: 'fullJan',
                description: 'fdaf',
                location: "SparkWerkz ( Don't Touch )",
                no_of_student: 0,
                cancel: false,
                _id: '5ff542c39f5e0e0221c652f4',
                startDate: '2021-01-31T07:00:00.000Z',
                endDate: '2021-01-31T07:35:00.000Z',
                teacherId: '5f03251a98173e0088c42158'
              },
              {
                courseId: '5ff536fe9f5e0e0221c65081',
                name: 'fullJan',
                description: 'fdaf',
                location: "SparkWerkz ( Don't Touch )",
                no_of_student: 0,
                cancel: false,
                _id: '5ff542c39f5e0e0221c652f4',
                startDate: '2021-01-31T07:00:00.000Z',
                endDate: '2021-01-31T07:35:00.000Z',
                teacherId: '5f03251a98173e0088c42158'
              },
              {
                courseId: '5ff53e349f5e0e0221c65126',
                name: 'fulljan2',
                description: 'fdaf',
                location: "SparkWerkz ( Don't Touch )",
                no_of_student: 2,
                cancel: false,
                _id: '5ff545d49f5e0e0221c65351',
                startDate: '2021-01-31T07:00:00.000Z',
                endDate: '2021-01-31T07:35:00.000Z',
                teacherId: '5ff53c8a9f5e0e0221c65122'
              }
            ],
            staffId: '5fd6f7cf6933830278d1511e',
            preferredName: 'zhastaff',
            profilePic:
              'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png',
            position: ''
          },
          {
            lessons: [
              {
                courseId: '5ff536fe9f5e0e0221c65081',
                name: 'fullJan',
                description: 'fdaf',
                location: "SparkWerkz ( Don't Touch )",
                no_of_student: 0,
                cancel: false,
                _id: '5ff542c39f5e0e0221c652f4',
                startDate: '2021-01-31T07:00:00.000Z',
                endDate: '2021-01-31T07:35:00.000Z',
                teacherId: '5f03251a98173e0088c42158'
              }
            ],
            staffId: '5f05413ecee167018f7758cf',
            preferredName: 'amk@relief',
            profilePic:
              'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png',
            position: ''
          }
        ],
        hasConflict: true,
        enrolledStudentCount: 0,
        isEnrolled: false
      },
      {
        startDate: '2021-02-01T07:00:00.000Z',
        endDate: '2021-02-01T07:35:00.000Z',
        teacherId: '5eda81c273472b00f948fceb',
        conflictWith: [],
        hasConflict: false,
        enrolledStudentCount: 0,
        isEnrolled: false
      },
      {
        startDate: '2021-02-02T07:00:00.000Z',
        endDate: '2021-02-02T07:35:00.000Z',
        teacherId: '5eda81c273472b00f948fceb',
        conflictWith: [],
        hasConflict: false,
        enrolledStudentCount: 0,
        isEnrolled: false
      },
      {
        startDate: '2021-02-03T07:00:00.000Z',
        endDate: '2021-02-03T07:35:00.000Z',
        teacherId: '5eda81c273472b00f948fceb',
        conflictWith: [],
        hasConflict: false,
        enrolledStudentCount: 0,
        isEnrolled: false
      },
      {
        startDate: '2021-02-04T07:00:00.000Z',
        endDate: '2021-02-04T07:35:00.000Z',
        teacherId: '5eda81c273472b00f948fceb',
        conflictWith: [],
        hasConflict: false,
        enrolledStudentCount: 0,
        isEnrolled: true
      }
    ],
    teacherDetails: {
      _id: '5eda81c273472b00f948fceb',
      fullName: 'fdkafj',
      preferredName: 'newt',
      position: '',
      profilePic:
        'https://brainlitz.s3.amazonaws.com/default/default_profile_pic.png'
    }
  };

  constructor() {}

  ngOnInit() {
    console.log('mock mock', this.mock);

    this.countEnrolledLessons(this.mock);
  }

  backClicked() {
    this.flag.emit();
  }

  countEnrolledLessons(obj) {
    for (var i = 0; i < obj.lessons.length; i++) {
      if (obj.lessons[i].isEnrolled) {
        this.enrollList.push(obj.lessons[i]);
      }
    }
  }

  selectLesson(obj) {
    if (this.enrollList.includes(obj)) {
      console.log('exists', this.enrollList);
      this.enrollList.splice(this.enrollList.indexOf(obj), 1);
    } else {
      this.enrollList.push(obj);
      console.log('list', this.enrollList);
    }
  }
}

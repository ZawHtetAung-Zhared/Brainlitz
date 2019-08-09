export class cPlanField {
  public name: string;
  public description: string;
  public seats: number;
  public makeupPolicy = {
    allowMakeupPass: false,
    maxDayPerPass: 0,
    maxPassPerUser: 0
  };
  public paymentPolicy = {
    allowProrated: false,
    courseFee: '',
    proratedLessonFee: '',
    taxInclusive: Boolean,
    miscFee: '',
    deposit: '',
    courseFeeOptions: {},
    taxOptions: {}
  };
  public age = {
    min: '',
    max: ''
  };
  public lesson = {
    min: '',
    max: '',
    duration: ''
  };
  public allowPagewerkz: boolean = false;
  public holidayCalendarId: string;
  public quizwerkz: Array<any> = [];
  public accessPointGroup: Array<any> = [];
  public holidayCalendarName: string;
  public depositAmount: any;
  public courseFeeOptions: any = {};
  public searchText: string;
  public assessmentPlans: Array<any> = [];
  public dueDateCount: number;
}

export class apgForm {
  name: string;
  description: string;
}

export class feeOption {
  name: string;
  fees: number;
}

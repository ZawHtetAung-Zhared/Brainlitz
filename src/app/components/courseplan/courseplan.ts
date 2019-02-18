export class cPlanField {
	public name: string;
	public description: string;
	public seats: number;
	public makeupPolicy = {
		allowMakeupPass: false,
		maxDayPerPass: '',
		maxPassPerUser: ''
	};
	public paymentPolicy = {
		allowProrated: false,
		taxInclusive:Boolean,
		courseFee: '',
		proratedLessonFee: '',
		miscFee: '',
		deposit: '',
		courseFeeOptions: {}
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
	public depositAmount:any;
	public courseFeeOptions:any = {};
	public searchText:string;
}

export class apgForm {
	name: string;
	description: string;
}

export class feeOption {
	name: string;
	fees: number;
}
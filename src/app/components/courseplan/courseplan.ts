export class cPlanField {
	public name: string;
	public description: string;
	public seats: number;
	public makeupPolicy: Array<Object> = [
		{ allowMakeupPass: '' }, 
		{ maxDayPerPass: '' }, 
		{ maxPassPerUser: '' },
	];
	public paymentPolicy: Array<Object> = [
		{ allowProrated: ''}, 
		{ courseFee: '' }, 
		{ proratedLessonFee: ''}, 
		{ miscFee: ''}, 
		{ deposit: ''},
	];
	public age: Array<Object> = [
		{ min: ''},
		{ max: ''},
	];
	public lesson: Array<Object> = [
		{ min: ''}, 
		{ max: ''}, 
		{ duration: ''},
	];
	public allowPagewerkzBooks: boolean;
	public holidayCalendarId: string;
	public quizwerkz: Array<any> = [];
	
}
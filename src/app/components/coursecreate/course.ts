export class Course{
	_id: string
	courseCode:	string
	regionId:	string
	room:	string
	reservedNumberofSeat:	number
	teacherId:	string
	paymentPolicy:{
		deposit:	string
		courseFee:	number
		allowProrated:	boolean
		proratedLessonFee:	number
		miscFee:	number
	}
	coursePlanId:	string
	description:	string
	lesson: [{
		subject: string
		startDate: string
		endDate: string
		place: string
		teacherId: string
	}]
}
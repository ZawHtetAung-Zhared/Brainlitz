export class Course {
  _id: string;
  repeatDays: Array<object>;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
  duration: object;
  teacher: object;
  coursePlan: object;
  category: object;
  invoicesOfCourse: Array<any>;
  invoice: null;
  location: object;
}

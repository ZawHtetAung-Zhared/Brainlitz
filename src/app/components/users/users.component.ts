import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import { FormsModule ,FormControl } from '@angular/forms';
import { appService } from '../../service/app.service';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { ImageCropperComponent } from 'ng2-img-cropper/src/imageCropperComponent';
import { CropperSettings } from 'ng2-img-cropper/src/cropperSettings';
import { Bounds } from 'ng2-img-cropper/src/model/bounds';
import { CropPosition } from 'ng2-img-cropper/src/model/cropPosition';
import { Croppie } from 'croppie';
import Cropper from 'cropperjs';
import { environment } from '../../../environments/environment';
import { customer } from './user';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';


declare var $:any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	@ViewChild('stuffPic') stuffPic: ElementRef;		
	public img: any;
	public orgID = environment.orgID;
	public regionID = localStorage.getItem('regionId');		
	formFieldc: customer = new customer();	
	@ViewChild("cropper", undefined)
	cropper: ImageCropperComponent;
	resetCroppers: Function;
	public isupdate: boolean = false;
	public returnProfile: boolean = false;
	input: any;
	uploadCrop: any;
	blankCrop: boolean = false;
	isSticky: boolean = false;
	modalReference: any;
	closeResult: any;
	
	public showLoading: boolean = false;
	@BlockUI() blockUI: NgBlockUI;
	
	customerLists: any;
	userType: any;
	permissionLists: any;
	locationLists: any;
	public locationID = localStorage.getItem('locationId');
	emailAlert: boolean = false;
	guardianAlert : boolean = false;
	notShowEdit: boolean = true;
	permissionId: any[] = [];
	editId: any;
	public updateButton: boolean = false;
  	public createButton: boolean = true;
  	showFormCreate: boolean = false;
  	public navIsFixed: boolean = false;
  	public isCreateFix: boolean = false;
  	atLeastOneMail: boolean = false;
  	imgDemoSlider: boolean = false;
  	public showCustDetail:boolean = false;
  	showCourse:number=2;
  	showProgress:number=2;
  	showBadge:number=2;
  	showRating:number=2;
  	showActivity:number=2;
  	public custDetail:any ={
    "user": {
        "userId": "5b063eaa36f2e0f83cdbac89",
        "email": "me@ios.com",
        "firstName": "IOS",
        "lastName": "Android",
        "fullname": "IOS Android",
        "preferredName": "Kenny",
        "profilePic": "https://brainlitz-dev.s3.amazonaws.com/profile/153544598201551788667_original.jpg",
        "dependant": [],
        "guardians": [
            {
                "userId": "5b063ee136f2e0f83cdbac8c",
                "firstName": "Arron",
                "lastName": "Walmsley",
                "fullname": "Arron Walmsley",
                "profilePic": "https://brainlitz-dev.s3.amazonaws.com/profile/153605968312168603115_original.jpg",
                "email": "staff@ios.com"
            },
            {
                "userId": "5b63d37b7f1167282be032c1",
                "firstName": "iOS",
                "lastName": "Staff",
                "fullname": "iOS Staff",
                "profilePic": "",
                "email": "staff@ios.com"
            }
        ]
    },
    "courses": [
        {
            "_id": "5b35ec844e007039a4160a7c",
            "repeatDays": [
                1
            ],
            "startDate": "2018-06-21T01:59:00.000Z",
            "endDate": "2018-07-07T00:00:00.000Z",
            "name": "Music",
            "description": "hello ",
            "location": {
                "name": "Bagan",
                "phoneNumber": "09423184148",
                "address": "Bagan",
                "locationId": "5b348fa48350ed1082c26f34"
            }
        },
        {
            "_id": "5b3225f289863963078bdbdf",
            "repeatDays": [
                1,
                2,
                3,
                4,
                5
            ],
            "startDate": "2018-06-26T11:00:00.000Z",
            "endDate": null,
            "name": "Jun 26 IOS C-2 Jun 26 IOS C-2 Jun 26 IOS C-2",
            "description": "hiThoughtful content on mobile & web prototyping, wireframing, mockups, usability testing, project management, design process & more.Thoughtful content on mobile & web prototyping, wireframing, mockups, usability testing, project management, design process & more.Thoughtful content on mobile & web prototyping, wireframing, mockups, usability testing, project management, design process & more.",
            "location": {
                "name": "Yangon",
                "address": "Yangon",
                "phoneNumber": "0995858889",
                "locationId": "5b1114f2b16a3647b9b4beda"
            }
        },
        {
            "_id": "5b321cdf89863963078bdbbf",
            "repeatDays": [
                1,
                2,
                3,
                4,
                5
            ],
            "startDate": "2018-06-26T09:00:00.000Z",
            "endDate": null,
            "name": "Jun26 IOS C-3",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "location": {
                "name": "Yangon",
                "address": "Yangon",
                "phoneNumber": "0995858889",
                "locationId": "5b1114f2b16a3647b9b4beda"
            }
        },
        {
            "_id": "5b399f654e007039a4160b66",
            "repeatDays": [
                1,
                2,
                3,
                4,
                5
            ],
            "startDate": "2018-07-02T11:00:00.000Z",
            "endDate": null,
            "name": "july 2 course 1",
            "description": "testing for july 2",
            "location": {
                "name": "Yangon",
                "address": "Yangon",
                "phoneNumber": "0995858889",
                "locationId": "5b1114f2b16a3647b9b4beda"
            }
        },
        {
            "_id": "5b39a0364e007039a4160b6d",
            "repeatDays": [
                1,
                2,
                3,
                4,
                5
            ],
            "startDate": "2018-07-02T11:10:00.000Z",
            "endDate": null,
            "name": "july 2 course 2",
            "description": "testing",
            "location": {
                "name": "Yangon",
                "address": "Yangon",
                "phoneNumber": "0995858889",
                "locationId": "5b1114f2b16a3647b9b4beda"
            }
        },
        {
            "_id": "5b42ead0e76627f6f5670455",
            "repeatDays": [
                0,
                1,
                2,
                3,
                4,
                5,
                6
            ],
            "startDate": "2018-07-08T09:00:00.000Z",
            "endDate": "2018-08-31T00:00:00.000Z",
            "name": "Assessment TEST (Don't touch it)",
            "description": "111",
            "location": {
                "name": "Yangon",
                "address": "Yangon",
                "phoneNumber": "0995858889",
                "locationId": "5b1114f2b16a3647b9b4beda"
            }
        },
        {
            "_id": "5b46d1d69e70cf16e2a89de2",
            "repeatDays": [
                0,
                1,
                2,
                3,
                4,
                5,
                6
            ],
            "startDate": "2018-07-12T09:00:00.000Z",
            "endDate": null,
            "name": "AMK Progress Course",
            "description": "111",
            "location": {
                "name": "Yangon",
                "address": "Yangon",
                "phoneNumber": "0995858889",
                "locationId": "5b1114f2b16a3647b9b4beda"
            }
        },
        {
            "_id": "5b472f03d7f8a6265fc4a095",
            "repeatDays": [
                0,
                1
            ],
            "startDate": "2018-07-13T08:45:00.000Z",
            "endDate": "2018-07-31T00:00:00.000Z",
            "name": "Beginner Piano course",
            "description": "CRISTOFORI Music School has delivered the  most successful and highest number of lessons learnt by millions of piano students over 35 years.",
            "location": {
                "name": "Mandalay",
                "address": "mandalay 1",
                "phoneNumber": "123456",
                "locationId": "5b13c2bd693dfb588d34f9de"
            }
        },
        {
            "_id": "5b4daba9bdbc604a3e5a95e0",
            "repeatDays": [
                1,
                2,
                3,
                4,
                5
            ],
            "startDate": "2018-07-17T08:00:00.000Z",
            "endDate": null,
            "name": "Andriod APG Test Course - 1  Course - 2 Course - 3 Course - 4 Course - 5 Course - 6 Course - 7 Course - 8",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "location": {
                "name": "Yangon",
                "address": "Yangon",
                "phoneNumber": "0995858889",
                "locationId": "5b1114f2b16a3647b9b4beda"
            }
        },
        {
            "_id": "5b4efa4dbdbc604a3e5a96f3",
            "repeatDays": [
                0,
                1,
                2,
                3,
                4,
                5,
                6
            ],
            "startDate": "2018-07-18T09:00:00.000Z",
            "endDate": null,
            "name": "TEST PROG BADGE",
            "description": "11111",
            "location": {
                "name": "Yangon",
                "address": "Yangon",
                "phoneNumber": "0995858889",
                "locationId": "5b1114f2b16a3647b9b4beda"
            }
        },
        {
            "_id": "5b88a7f4978225176f3869a6",
            "repeatDays": [
                0,
                1,
                2,
                3,
                4,
                5,
                6
            ],
            "startDate": "2018-08-31T10:00:00.000Z",
            "endDate": null,
            "name": "Andriod Course",
            "description": "Testing",
            "location": {
                "name": "Yangon",
                "address": "Yangon",
                "phoneNumber": "0995858889",
                "locationId": "5b1114f2b16a3647b9b4beda"
            }
        },
        {
            "_id": "5b8cda9ad75475317f98ffd1",
            "repeatDays": [
                0,
                1,
                2,
                3,
                4,
                5,
                6
            ],
            "startDate": "2018-09-01T09:00:00.000Z",
            "endDate": null,
            "name": "Android AMM Test",
            "description": "Testing",
            "location": {
                "name": "Yangon",
                "address": "Yangon",
                "phoneNumber": "0995858889",
                "locationId": "5b1114f2b16a3647b9b4beda"
            }
        }
    ],
    "ratings": [
        {
            "_id": "5b39a24d8e1ccb75abce2e78",
            "courseId": "5b35ec844e007039a4160a7c",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "teacherId": "5b3494728350ed1082c26f57",
            "__v": 0,
            "anonymous": false,
            "createdDate": "2018-07-02T03:55:57.003Z",
            "message": "5 stars addfgh",
            "rating": 3,
            "updatedDate": "2018-07-04T10:49:18.240Z",
            "teacher_info": {
                "_id": "5b3494728350ed1082c26f57",
                "preferredName": "Wai",
                "profilePic": ""
            },
            "course_info": {
                "_id": "5b35ec844e007039a4160a7c",
                "name": "Music"
            }
        },
        {
            "_id": "5b39a33e8e1ccb75abce301c",
            "courseId": "5b3225f289863963078bdbdf",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "teacherId": "5b321b7e89863963078bdbba",
            "__v": 0,
            "anonymous": false,
            "createdDate": "2018-07-02T03:59:58.207Z",
            "message": "5 stars from me",
            "rating": 5,
            "updatedDate": "2018-07-02T07:53:11.281Z",
            "teacher_info": {
                "_id": "5b321b7e89863963078bdbba",
                "preferredName": "Jun26_Tr.eimon",
                "profilePic": ""
            },
            "course_info": {
                "_id": "5b3225f289863963078bdbdf",
                "name": "Jun 26 IOS C-2 Jun 26 IOS C-2 Jun 26 IOS C-2"
            }
        },
        {
            "_id": "5b39a4e48e1ccb75abce3347",
            "courseId": "5b321cdf89863963078bdbbf",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "teacherId": "5b321b7e89863963078bdbba",
            "__v": 0,
            "anonymous": false,
            "createdDate": "2018-07-02T04:07:00.625Z",
            "message": "Annoy",
            "rating": 3,
            "updatedDate": "2018-07-02T04:07:16.402Z",
            "teacher_info": {
                "_id": "5b321b7e89863963078bdbba",
                "preferredName": "Jun26_Tr.eimon",
                "profilePic": ""
            },
            "course_info": {
                "_id": "5b321cdf89863963078bdbbf",
                "name": "Jun26 IOS C-3"
            }
        },
        {
            "_id": "5b47249a8e1ccb75abddd441",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "teacherId": "5b063ee136f2e0f83cdbac8c",
            "__v": 0,
            "anonymous": false,
            "createdDate": "2018-07-12T09:51:22.858Z",
            "message": "",
            "rating": 4,
            "updatedDate": "2018-07-12T09:51:40.393Z",
            "teacher_info": {
                "_id": "5b063ee136f2e0f83cdbac8c",
                "preferredName": "AMM AndrIos",
                "profilePic": "https://brainlitz-dev.s3.amazonaws.com/profile/153605968312168603115_original.jpg"
            },
            "course_info": {
                "_id": "5b42ead0e76627f6f5670455",
                "name": "Assessment TEST (Don't touch it)"
            }
        },
        {
            "_id": "5b4724d58e1ccb75abddd607",
            "courseId": "5b46d1d69e70cf16e2a89de2",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "teacherId": "5b063ee136f2e0f83cdbac8c",
            "__v": 0,
            "anonymous": false,
            "createdDate": "2018-07-12T09:52:21.006Z",
            "message": "",
            "rating": 3,
            "updatedDate": "2018-07-12T09:52:44.654Z",
            "teacher_info": {
                "_id": "5b063ee136f2e0f83cdbac8c",
                "preferredName": "AMM AndrIos",
                "profilePic": "https://brainlitz-dev.s3.amazonaws.com/profile/153605968312168603115_original.jpg"
            },
            "course_info": {
                "_id": "5b46d1d69e70cf16e2a89de2",
                "name": "AMK Progress Course"
            }
        },
        {
            "_id": "5b8608978e1ccb75ab073d91",
            "courseId": "5b4efa4dbdbc604a3e5a96f3",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "teacherId": "5b063ee136f2e0f83cdbac8c",
            "__v": 0,
            "anonymous": false,
            "createdDate": "2018-08-29T02:44:39.471Z",
            "message": "",
            "rating": 4,
            "updatedDate": "2018-08-29T02:44:39.471Z",
            "teacher_info": {
                "_id": "5b063ee136f2e0f83cdbac8c",
                "preferredName": "AMM AndrIos",
                "profilePic": "https://brainlitz-dev.s3.amazonaws.com/profile/153605968312168603115_original.jpg"
            },
            "course_info": {
                "_id": "5b4efa4dbdbc604a3e5a96f3",
                "name": "TEST PROG BADGE"
            }
        }
    ],
    "widgets": [
        {
            "_id": "5b3f54106cc446460306a7e3",
            "name": "Progress",
            "regionId": "5af915541de9052c869687a3",
            "APG": [
                {
                    "_id": "5b44251784a28a54fcd2fe83",
                    "name": "Progress",
                    "description": "Progress",
                    "accessPoints": [
                        {
                            "_id": "5b44250f4607e00566a6b762",
                            "name": "Progress ",
                            "description": "Progress",
                            "baseScore": 100,
                            "score": 65,
                            "createdDate": "2018-09-03T02:30:28.124Z"
                        }
                    ],
                    "course": {
                        "_id": "5b42ead0e76627f6f5670455",
                        "name": "Assessment TEST (Don't touch it)",
                        "description": "111"
                    }
                },
                {
                    "_id": "5b4daae3bdbc604a3e5a95dd",
                    "name": "Andriod APG",
                    "description": "hello andriod apg",
                    "accessPoints": [
                        {
                            "_id": "5b4daae1514fd45ad8c2c1b1",
                            "name": "Andriod AP 1",
                            "description": "123",
                            "baseScore": 100,
                            "score": 5,
                            "createdDate": "2018-08-23T05:18:39.320Z"
                        }
                    ],
                    "course": {
                        "_id": "5b4daba9bdbc604a3e5a95e0",
                        "name": "Andriod APG Test Course - 1  Course - 2 Course - 3 Course - 4 Course - 5 Course - 6 Course - 7 Course - 8",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    }
                },
                {
                    "_id": "5b4ef9b1bdbc604a3e5a96ef",
                    "name": "TEST PRGO 1",
                    "description": "TEST PRGO 1",
                    "accessPoints": [
                        {
                            "_id": "5b4ef9ae514fd45ad8c2c1e4",
                            "name": "TEST PRGO 1",
                            "description": "TEST PRGO 1",
                            "baseScore": 100,
                            "score": 100,
                            "createdDate": "2018-07-21T10:46:38.719Z"
                        }
                    ],
                    "course": {
                        "_id": "5b4efa4dbdbc604a3e5a96f3",
                        "name": "TEST PROG BADGE",
                        "description": "11111"
                    }
                },
                {
                    "_id": "5b46d15b9e70cf16e2a89dde",
                    "name": "AMK progress",
                    "description": "AMK progress",
                    "accessPoints": [
                        {
                            "_id": "5b46d1574607e00566a6b7e1",
                            "name": "Progress AMK",
                            "description": "Progress AMK",
                            "baseScore": 100,
                            "score": 15,
                            "createdDate": "2018-07-20T11:13:11.161Z"
                        }
                    ],
                    "course": {
                        "_id": "5b46d1d69e70cf16e2a89de2",
                        "name": "AMK Progress Course",
                        "description": "111"
                    }
                }
            ],
            "moduleType": 1
        },
        {
            "_id": "5b3f548a6cc446460306a7e5",
            "name": "Badge",
            "regionId": "5af915541de9052c869687a3",
            "APG": [
                {
                    "_id": "5b4576e885449b0dd071613f",
                    "name": "july11 template1 Badge",
                    "description": "desc july11 template1",
                    "accessPoints": [
                        {
                            "_id": "5b44250f4607e00566a6b762",
                            "name": "Progress ",
                            "description": "Progress",
                            "baseScore": 100,
                            "score": 65,
                            "createdDate": "2018-09-03T02:30:28.124Z"
                        },
                        {
                            "_id": "5b442e3c4607e00566a6b768",
                            "name": "test",
                            "description": "test"
                        }
                    ],
                    "course": {
                        "_id": "5b42ead0e76627f6f5670455",
                        "name": "Assessment TEST (Don't touch it)",
                        "description": "111"
                    }
                },
                {
                    "_id": "5b45777485449b0dd0716141",
                    "name": "july11 APG2 Badge",
                    "description": "desc july11 APG2 ",
                    "accessPoints": [
                        {
                            "_id": "5b44250f4607e00566a6b762",
                            "name": "Progress ",
                            "description": "Progress",
                            "baseScore": 100,
                            "score": 65,
                            "createdDate": "2018-09-03T02:30:28.124Z"
                        },
                        {
                            "_id": "5b442e3c4607e00566a6b768",
                            "name": "test",
                            "description": "test"
                        }
                    ],
                    "course": {
                        "_id": "5b42ead0e76627f6f5670455",
                        "name": "Assessment TEST (Don't touch it)",
                        "description": "111"
                    }
                },
                {
                    "_id": "5b45b8819e70cf16e2a89d5e",
                    "name": "july11 template1",
                    "description": "desc july11 template1",
                    "accessPoints": [
                        {
                            "_id": "5b44250f4607e00566a6b762",
                            "name": "Progress ",
                            "description": "Progress",
                            "baseScore": 100,
                            "score": 65,
                            "createdDate": "2018-09-03T02:30:28.124Z"
                        },
                        {
                            "_id": "5b442e3c4607e00566a6b768",
                            "name": "test",
                            "description": "test"
                        }
                    ],
                    "course": {
                        "_id": "5b42ead0e76627f6f5670455",
                        "name": "Assessment TEST (Don't touch it)",
                        "description": "111"
                    }
                },
                {
                    "_id": "5b4ec67cbdbc604a3e5a96be",
                    "name": "New Badge",
                    "description": "Access Point Group",
                    "accessPoints": [
                        {
                            "_id": "5b4ec679514fd45ad8c2c1c2",
                            "name": "Badge1",
                            "description": "Badge1",
                            "baseScore": 100,
                            "score": 85,
                            "createdDate": "2018-08-02T04:20:48.164Z"
                        }
                    ],
                    "course": {
                        "_id": "5b4daba9bdbc604a3e5a95e0",
                        "name": "Andriod APG Test Course - 1  Course - 2 Course - 3 Course - 4 Course - 5 Course - 6 Course - 7 Course - 8",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    }
                },
                {
                    "_id": "5b4ef7d3bdbc604a3e5a96ed",
                    "name": "Andriod APG Badge",
                    "description": "Andriod APG Badge desc",
                    "accessPoints": [
                        {
                            "_id": "5b4ec679514fd45ad8c2c1c2",
                            "name": "Badge1",
                            "description": "Badge1",
                            "baseScore": 100,
                            "score": 85,
                            "createdDate": "2018-08-02T04:20:48.164Z"
                        }
                    ],
                    "course": {
                        "_id": "5b4daba9bdbc604a3e5a95e0",
                        "name": "Andriod APG Test Course - 1  Course - 2 Course - 3 Course - 4 Course - 5 Course - 6 Course - 7 Course - 8",
                        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\nquis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\nconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\ncillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\nproident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    }
                },
                {
                    "_id": "5b4ef9cabdbc604a3e5a96f1",
                    "name": "TEST BADGE 1",
                    "description": "TEST BADGE 1",
                    "accessPoints": [
                        {
                            "_id": "5b4ef9c6514fd45ad8c2c1e5",
                            "name": "TEST BADGE 1",
                            "description": "TEST BADGE 1",
                            "baseScore": 100,
                            "score": 88,
                            "createdDate": "2018-07-18T08:46:07.563Z"
                        }
                    ],
                    "course": {
                        "_id": "5b4efa4dbdbc604a3e5a96f3",
                        "name": "TEST PROG BADGE",
                        "description": "11111"
                    }
                }
            ],
            "moduleType": 2
        }
    ],
    "journals": [
        {
            "_id": "5b87b9569924b8d38c3656fb",
            "teacherOnly": false,
            "courseId": "5b31fe5080391f5705611e1a",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "message": "Test Journal with noti 1",
            "photo": null,
            "createdDate": "2018-08-30T09:31:02.290Z",
            "updatedDate": "2018-08-30T09:31:02.290Z",
            "__v": 0
        },
        {
            "_id": "5b87b9609924b8d38c3656fe",
            "teacherOnly": false,
            "courseId": "5b31fe5080391f5705611e1a",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "message": "Test Journal with noti 2",
            "photo": null,
            "createdDate": "2018-08-30T09:31:12.042Z",
            "updatedDate": "2018-08-30T09:31:12.042Z",
            "__v": 0
        },
        {
            "_id": "5b87b9919924b8d38c365701",
            "teacherOnly": true,
            "courseId": "5b31fe5080391f5705611e1a",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "message": "Test Journal with noti 2",
            "photo": null,
            "createdDate": "2018-08-30T09:32:01.937Z",
            "updatedDate": "2018-08-30T09:32:01.937Z",
            "__v": 0
        },
        {
            "_id": "5b87ce38978225176f386932",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:00:08.589Z",
            "updatedDate": "2018-08-30T11:00:08.589Z",
            "__v": 0
        },
        {
            "_id": "5b87ce5d978225176f386935",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:00:45.305Z",
            "updatedDate": "2018-08-30T11:00:45.305Z",
            "__v": 0
        },
        {
            "_id": "5b87cf1a978225176f386938",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:03:54.567Z",
            "updatedDate": "2018-08-30T11:03:54.567Z",
            "__v": 0
        },
        {
            "_id": "5b87cf40978225176f38693b",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:04:32.436Z",
            "updatedDate": "2018-08-30T11:04:32.436Z",
            "__v": 0
        },
        {
            "_id": "5b87d11e978225176f38693f",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:30.853Z",
            "updatedDate": "2018-08-30T11:12:30.853Z",
            "__v": 0
        },
        {
            "_id": "5b87d11f978225176f386942",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:31.276Z",
            "updatedDate": "2018-08-30T11:12:31.276Z",
            "__v": 0
        },
        {
            "_id": "5b87d11f978225176f386945",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:31.371Z",
            "updatedDate": "2018-08-30T11:12:31.371Z",
            "__v": 0
        },
        {
            "_id": "5b87d11f978225176f386948",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:31.469Z",
            "updatedDate": "2018-08-30T11:12:31.469Z",
            "__v": 0
        },
        {
            "_id": "5b87d11f978225176f38694b",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:31.603Z",
            "updatedDate": "2018-08-30T11:12:31.603Z",
            "__v": 0
        },
        {
            "_id": "5b87d11f978225176f38694c",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:31.803Z",
            "updatedDate": "2018-08-30T11:12:31.803Z",
            "__v": 0
        },
        {
            "_id": "5b87d11f978225176f38694f",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:31.877Z",
            "updatedDate": "2018-08-30T11:12:31.877Z",
            "__v": 0
        },
        {
            "_id": "5b87d11f978225176f386950",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:31.930Z",
            "updatedDate": "2018-08-30T11:12:31.930Z",
            "__v": 0
        },
        {
            "_id": "5b87d120978225176f386955",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:32.092Z",
            "updatedDate": "2018-08-30T11:12:32.092Z",
            "__v": 0
        },
        {
            "_id": "5b87d120978225176f386958",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:32.217Z",
            "updatedDate": "2018-08-30T11:12:32.217Z",
            "__v": 0
        },
        {
            "_id": "5b87d120978225176f38695d",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:32.338Z",
            "updatedDate": "2018-08-30T11:12:32.338Z",
            "__v": 0
        },
        {
            "_id": "5b87d120978225176f38695e",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:32.592Z",
            "updatedDate": "2018-08-30T11:12:32.592Z",
            "__v": 0
        },
        {
            "_id": "5b87d120978225176f386963",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:32.735Z",
            "updatedDate": "2018-08-30T11:12:32.735Z",
            "__v": 0
        },
        {
            "_id": "5b87d120978225176f386964",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:32.874Z",
            "updatedDate": "2018-08-30T11:12:32.874Z",
            "__v": 0
        },
        {
            "_id": "5b87d121978225176f386969",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:33.057Z",
            "updatedDate": "2018-08-30T11:12:33.057Z",
            "__v": 0
        },
        {
            "_id": "5b87d121978225176f38696a",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:33.268Z",
            "updatedDate": "2018-08-30T11:12:33.268Z",
            "__v": 0
        },
        {
            "_id": "5b87d121978225176f38696b",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:33.341Z",
            "updatedDate": "2018-08-30T11:12:33.341Z",
            "__v": 0
        },
        {
            "_id": "5b87d121978225176f386970",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:33.484Z",
            "updatedDate": "2018-08-30T11:12:33.484Z",
            "__v": 0
        },
        {
            "_id": "5b87d121978225176f386975",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:33.657Z",
            "updatedDate": "2018-08-30T11:12:33.657Z",
            "__v": 0
        },
        {
            "_id": "5b87d121978225176f386976",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:33.917Z",
            "updatedDate": "2018-08-30T11:12:33.917Z",
            "__v": 0
        },
        {
            "_id": "5b87d121978225176f386979",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:33.994Z",
            "updatedDate": "2018-08-30T11:12:33.994Z",
            "__v": 0
        },
        {
            "_id": "5b87d122978225176f38697c",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:34.114Z",
            "updatedDate": "2018-08-30T11:12:34.114Z",
            "__v": 0
        },
        {
            "_id": "5b87d122978225176f386981",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:34.306Z",
            "updatedDate": "2018-08-30T11:12:34.306Z",
            "__v": 0
        },
        {
            "_id": "5b87d122978225176f386982",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:34.464Z",
            "updatedDate": "2018-08-30T11:12:34.464Z",
            "__v": 0
        },
        {
            "_id": "5b87d122978225176f386985",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:34.596Z",
            "updatedDate": "2018-08-30T11:12:34.596Z",
            "__v": 0
        },
        {
            "_id": "5b87d122978225176f38698a",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:34.728Z",
            "updatedDate": "2018-08-30T11:12:34.728Z",
            "__v": 0
        },
        {
            "_id": "5b87d122978225176f38698b",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:34.868Z",
            "updatedDate": "2018-08-30T11:12:34.868Z",
            "__v": 0
        },
        {
            "_id": "5b87d122978225176f38698c",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:12:34.949Z",
            "updatedDate": "2018-08-30T11:12:34.949Z",
            "__v": 0
        },
        {
            "_id": "5b87d14f978225176f386993",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:13:19.126Z",
            "updatedDate": "2018-08-30T11:13:19.126Z",
            "__v": 0
        },
        {
            "_id": "5b87d14f978225176f386996",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-30T11:13:19.290Z",
            "updatedDate": "2018-08-30T11:13:19.290Z",
            "__v": 0
        },
        {
            "_id": "5b88afa8978225176f3869af",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:02:00.937Z",
            "updatedDate": "2018-08-31T03:02:00.937Z",
            "__v": 0
        },
        {
            "_id": "5b88afb9978225176f3869b2",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:02:17.945Z",
            "updatedDate": "2018-08-31T03:02:17.945Z",
            "__v": 0
        },
        {
            "_id": "5b88b0ad978225176f3869b5",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:06:21.511Z",
            "updatedDate": "2018-08-31T03:06:21.511Z",
            "__v": 0
        },
        {
            "_id": "5b88b20129a8271c6d1a902b",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:12:01.342Z",
            "updatedDate": "2018-08-31T03:12:01.342Z",
            "__v": 0
        },
        {
            "_id": "5b88b27529a8271c6d1a902e",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:13:57.162Z",
            "updatedDate": "2018-08-31T03:13:57.162Z",
            "__v": 0
        },
        {
            "_id": "5b88b2aa5cf96844c7324f7c",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:14:50.132Z",
            "updatedDate": "2018-08-31T03:14:50.132Z",
            "__v": 0
        },
        {
            "_id": "5b88b30d29a8271c6d1a9031",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:16:29.931Z",
            "updatedDate": "2018-08-31T03:16:29.931Z",
            "__v": 0
        },
        {
            "_id": "5b88b34929a8271c6d1a9034",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:17:29.342Z",
            "updatedDate": "2018-08-31T03:17:29.342Z",
            "__v": 0
        },
        {
            "_id": "5b88b36602af186fa350a176",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:17:58.300Z",
            "updatedDate": "2018-08-31T03:17:58.300Z",
            "__v": 0
        },
        {
            "_id": "5b88b3d17edeac7858b912a9",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:19:45.489Z",
            "updatedDate": "2018-08-31T03:19:45.489Z",
            "__v": 0
        },
        {
            "_id": "5b88b3df29a8271c6d1a9037",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:19:59.964Z",
            "updatedDate": "2018-08-31T03:19:59.964Z",
            "__v": 0
        },
        {
            "_id": "5b88b3e129a8271c6d1a903a",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:20:01.470Z",
            "updatedDate": "2018-08-31T03:20:01.470Z",
            "__v": 0
        },
        {
            "_id": "5b88b3e229a8271c6d1a903d",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:20:02.371Z",
            "updatedDate": "2018-08-31T03:20:02.371Z",
            "__v": 0
        },
        {
            "_id": "5b88b3e329a8271c6d1a9040",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:20:03.134Z",
            "updatedDate": "2018-08-31T03:20:03.134Z",
            "__v": 0
        },
        {
            "_id": "5b88b42442b79d7d46c08f7f",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:21:08.912Z",
            "updatedDate": "2018-08-31T03:21:08.912Z",
            "__v": 0
        },
        {
            "_id": "5b88b4bff70bd38ba0d55c2a",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:23:43.059Z",
            "updatedDate": "2018-08-31T03:23:43.059Z",
            "__v": 0
        },
        {
            "_id": "5b88b50548f2798f242c5d6d",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:24:53.697Z",
            "updatedDate": "2018-08-31T03:24:53.697Z",
            "__v": 0
        },
        {
            "_id": "5b88b59fc81e249b0c610651",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:27:27.418Z",
            "updatedDate": "2018-08-31T03:27:27.418Z",
            "__v": 0
        },
        {
            "_id": "5b88b5d7c81e249b0c610654",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T03:28:23.951Z",
            "updatedDate": "2018-08-31T03:28:23.951Z",
            "__v": 0
        },
        {
            "_id": "5b88bf5929a8271c6d1a9046",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T04:08:57.619Z",
            "updatedDate": "2018-08-31T04:08:57.619Z",
            "__v": 0
        },
        {
            "_id": "5b88bf6229a8271c6d1a9049",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T04:09:06.619Z",
            "updatedDate": "2018-08-31T04:09:06.619Z",
            "__v": 0
        },
        {
            "_id": "5b88bf6429a8271c6d1a904c",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T04:09:08.121Z",
            "updatedDate": "2018-08-31T04:09:08.121Z",
            "__v": 0
        },
        {
            "_id": "5b88bf8199321d1e8e859330",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T04:09:37.396Z",
            "updatedDate": "2018-08-31T04:09:37.396Z",
            "__v": 0
        },
        {
            "_id": "5b88d233eb3ca52025c9d4d7",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T05:29:23.667Z",
            "updatedDate": "2018-08-31T05:29:23.667Z",
            "__v": 0
        },
        {
            "_id": "5b88d23aeb3ca52025c9d4da",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T05:29:30.226Z",
            "updatedDate": "2018-08-31T05:29:30.226Z",
            "__v": 0
        },
        {
            "_id": "5b88d23feb3ca52025c9d4dd",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T05:29:35.104Z",
            "updatedDate": "2018-08-31T05:29:35.104Z",
            "__v": 0
        },
        {
            "_id": "5b88f0ca46d902206d4538ef",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T07:39:54.023Z",
            "updatedDate": "2018-08-31T07:39:54.023Z",
            "__v": 0
        },
        {
            "_id": "5b88f0ca46d902206d4538f2",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T07:39:54.444Z",
            "updatedDate": "2018-08-31T07:39:54.444Z",
            "__v": 0
        },
        {
            "_id": "5b88f0ca46d902206d4538f5",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T07:39:54.855Z",
            "updatedDate": "2018-08-31T07:39:54.855Z",
            "__v": 0
        },
        {
            "_id": "5b88fa7bd75475317f98fa01",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T08:21:15.982Z",
            "updatedDate": "2018-08-31T08:21:15.982Z",
            "__v": 0
        },
        {
            "_id": "5b88fa96d75475317f98fa04",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T08:21:42.412Z",
            "updatedDate": "2018-08-31T08:21:42.412Z",
            "__v": 0
        },
        {
            "_id": "5b88fa98d75475317f98fa07",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T08:21:44.967Z",
            "updatedDate": "2018-08-31T08:21:44.967Z",
            "__v": 0
        },
        {
            "_id": "5b88fa9fd75475317f98fa0a",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T08:21:51.303Z",
            "updatedDate": "2018-08-31T08:21:51.303Z",
            "__v": 0
        },
        {
            "_id": "5b88faa5d75475317f98fa0d",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T08:21:57.143Z",
            "updatedDate": "2018-08-31T08:21:57.143Z",
            "__v": 0
        },
        {
            "_id": "5b890d73d75475317f98fabf",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T09:42:11.046Z",
            "updatedDate": "2018-08-31T09:42:11.046Z",
            "__v": 0
        },
        {
            "_id": "5b890f50d75475317f98fad2",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T09:50:08.510Z",
            "updatedDate": "2018-08-31T09:50:08.510Z",
            "__v": 0
        },
        {
            "_id": "5b890f64d75475317f98fad5",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T09:50:28.172Z",
            "updatedDate": "2018-08-31T09:50:28.172Z",
            "__v": 0
        },
        {
            "_id": "5b890f65d75475317f98fad8",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T09:50:29.060Z",
            "updatedDate": "2018-08-31T09:50:29.060Z",
            "__v": 0
        },
        {
            "_id": "5b890f65d75475317f98fadb",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T09:50:29.732Z",
            "updatedDate": "2018-08-31T09:50:29.732Z",
            "__v": 0
        },
        {
            "_id": "5b890f7bd75475317f98fae0",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T09:50:51.439Z",
            "updatedDate": "2018-08-31T09:50:51.439Z",
            "__v": 0
        },
        {
            "_id": "5b8911d9d75475317f98fb21",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T10:00:57.397Z",
            "updatedDate": "2018-08-31T10:00:57.397Z",
            "__v": 0
        },
        {
            "_id": "5b891284d75475317f98fb32",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T10:03:48.712Z",
            "updatedDate": "2018-08-31T10:03:48.712Z",
            "__v": 0
        },
        {
            "_id": "5b8912fbd75475317f98fb3b",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T10:05:47.871Z",
            "updatedDate": "2018-08-31T10:05:47.871Z",
            "__v": 0
        },
        {
            "_id": "5b892b89d75475317f98fbd0",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T11:50:33.833Z",
            "updatedDate": "2018-08-31T11:50:33.833Z",
            "__v": 0
        },
        {
            "_id": "5b892ba1d75475317f98fbdb",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T11:50:57.672Z",
            "updatedDate": "2018-08-31T11:50:57.672Z",
            "__v": 0
        },
        {
            "_id": "5b8933dad75475317f98fbf0",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T12:26:02.860Z",
            "updatedDate": "2018-08-31T12:26:02.860Z",
            "__v": 0
        },
        {
            "_id": "5b89348fd75475317f98fbf7",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T12:29:03.426Z",
            "updatedDate": "2018-08-31T12:29:03.426Z",
            "__v": 0
        },
        {
            "_id": "5b89348fd75475317f98fbfa",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b42ead0e76627f6f5670455",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-08-31T12:29:03.770Z",
            "updatedDate": "2018-08-31T12:29:03.770Z",
            "__v": 0
        },
        {
            "_id": "5b8cac5ad75475317f98fc2c",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:36:58.740Z",
            "updatedDate": "2018-09-03T03:36:58.740Z",
            "__v": 0
        },
        {
            "_id": "5b8cac5bd75475317f98fc2f",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:36:59.853Z",
            "updatedDate": "2018-09-03T03:36:59.853Z",
            "__v": 0
        },
        {
            "_id": "5b8cad13d75475317f98fc32",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:40:03.167Z",
            "updatedDate": "2018-09-03T03:40:03.167Z",
            "__v": 0
        },
        {
            "_id": "5b8cad6ed75475317f98fc35",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:41:34.880Z",
            "updatedDate": "2018-09-03T03:41:34.880Z",
            "__v": 0
        },
        {
            "_id": "5b8cada7d75475317f98fc38",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:42:31.084Z",
            "updatedDate": "2018-09-03T03:42:31.084Z",
            "__v": 0
        },
        {
            "_id": "5b8cae0bd75475317f98fc3b",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:44:11.281Z",
            "updatedDate": "2018-09-03T03:44:11.281Z",
            "__v": 0
        },
        {
            "_id": "5b8cae0fd75475317f98fc3e",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:44:15.063Z",
            "updatedDate": "2018-09-03T03:44:15.063Z",
            "__v": 0
        },
        {
            "_id": "5b8cae11d75475317f98fc41",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:44:17.900Z",
            "updatedDate": "2018-09-03T03:44:17.900Z",
            "__v": 0
        },
        {
            "_id": "5b8cae14d75475317f98fc44",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:44:20.835Z",
            "updatedDate": "2018-09-03T03:44:20.835Z",
            "__v": 0
        },
        {
            "_id": "5b8cae3bd75475317f98fc4f",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:44:59.144Z",
            "updatedDate": "2018-09-03T03:44:59.144Z",
            "__v": 0
        },
        {
            "_id": "5b8cae3fd75475317f98fc52",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:45:03.866Z",
            "updatedDate": "2018-09-03T03:45:03.866Z",
            "__v": 0
        },
        {
            "_id": "5b8cae4cd75475317f98fc5b",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:45:16.398Z",
            "updatedDate": "2018-09-03T03:45:16.398Z",
            "__v": 0
        },
        {
            "_id": "5b8caf55d75475317f98fc88",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:49:41.395Z",
            "updatedDate": "2018-09-03T03:49:41.395Z",
            "__v": 0
        },
        {
            "_id": "5b8caf77d75475317f98fc8b",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:50:15.429Z",
            "updatedDate": "2018-09-03T03:50:15.429Z",
            "__v": 0
        },
        {
            "_id": "5b8cafe2d75475317f98fc96",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T03:52:02.509Z",
            "updatedDate": "2018-09-03T03:52:02.509Z",
            "__v": 0
        },
        {
            "_id": "5b8cbbc6d75475317f98fd17",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T04:42:46.613Z",
            "updatedDate": "2018-09-03T04:42:46.613Z",
            "__v": 0
        },
        {
            "_id": "5b8cbbebd75475317f98fd1a",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T04:43:23.003Z",
            "updatedDate": "2018-09-03T04:43:23.003Z",
            "__v": 0
        },
        {
            "_id": "5b8cbcdcd75475317f98fd1f",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T04:47:24.507Z",
            "updatedDate": "2018-09-03T04:47:24.507Z",
            "__v": 0
        },
        {
            "_id": "5b8cbd5dd75475317f98fd22",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T04:49:33.842Z",
            "updatedDate": "2018-09-03T04:49:33.842Z",
            "__v": 0
        },
        {
            "_id": "5b8cbf40d75475317f98fd68",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T04:57:36.385Z",
            "updatedDate": "2018-09-03T04:57:36.385Z",
            "__v": 0
        },
        {
            "_id": "5b8cc270d75475317f98fd8d",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T05:11:12.290Z",
            "updatedDate": "2018-09-03T05:11:12.290Z",
            "__v": 0
        },
        {
            "_id": "5b8cc346d75475317f98fd92",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T05:14:46.739Z",
            "updatedDate": "2018-09-03T05:14:46.739Z",
            "__v": 0
        },
        {
            "_id": "5b8cc4d5d75475317f98fda9",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T05:21:25.654Z",
            "updatedDate": "2018-09-03T05:21:25.654Z",
            "__v": 0
        },
        {
            "_id": "5b8cc79fd75475317f98fdcf",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T05:33:19.020Z",
            "updatedDate": "2018-09-03T05:33:19.020Z",
            "__v": 0
        },
        {
            "_id": "5b8cc832d75475317f98fe44",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T05:35:46.222Z",
            "updatedDate": "2018-09-03T05:35:46.222Z",
            "__v": 0
        },
        {
            "_id": "5b8cd6c1d75475317f98fee5",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T06:37:53.134Z",
            "updatedDate": "2018-09-03T06:37:53.134Z",
            "__v": 0
        },
        {
            "_id": "5b8cd6c7d75475317f98fefa",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T06:37:59.287Z",
            "updatedDate": "2018-09-03T06:37:59.287Z",
            "__v": 0
        },
        {
            "_id": "5b8cd6d6d75475317f98feff",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T06:38:14.341Z",
            "updatedDate": "2018-09-03T06:38:14.341Z",
            "__v": 0
        },
        {
            "_id": "5b8cd6e7d75475317f98ff14",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T06:38:31.782Z",
            "updatedDate": "2018-09-03T06:38:31.782Z",
            "__v": 0
        },
        {
            "_id": "5b8cd6fbd75475317f98ff1f",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T06:38:51.653Z",
            "updatedDate": "2018-09-03T06:38:51.653Z",
            "__v": 0
        },
        {
            "_id": "5b8cd781d75475317f98ff52",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T06:41:05.881Z",
            "updatedDate": "2018-09-03T06:41:05.881Z",
            "__v": 0
        },
        {
            "_id": "5b8cd78ed75475317f98ff55",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T06:41:18.946Z",
            "updatedDate": "2018-09-03T06:41:18.946Z",
            "__v": 0
        },
        {
            "_id": "5b8cd845d75475317f98ff66",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T06:44:21.412Z",
            "updatedDate": "2018-09-03T06:44:21.412Z",
            "__v": 0
        },
        {
            "_id": "5b8cd9e2d75475317f98ffc1",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T06:51:14.087Z",
            "updatedDate": "2018-09-03T06:51:14.087Z",
            "__v": 0
        },
        {
            "_id": "5b8cd9fbd75475317f98ffca",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T06:51:39.351Z",
            "updatedDate": "2018-09-03T06:51:39.351Z",
            "__v": 0
        },
        {
            "_id": "5b8cda19d75475317f98ffcd",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T06:52:09.167Z",
            "updatedDate": "2018-09-03T06:52:09.167Z",
            "__v": 0
        },
        {
            "_id": "5b8cdc1dd75475317f99005e",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T07:00:45.726Z",
            "updatedDate": "2018-09-03T07:00:45.726Z",
            "__v": 0
        },
        {
            "_id": "5b8cdf40d75475317f9900b1",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T07:14:08.149Z",
            "updatedDate": "2018-09-03T07:14:08.149Z",
            "__v": 0
        },
        {
            "_id": "5b8cdf6fd75475317f9900d6",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T07:14:55.000Z",
            "updatedDate": "2018-09-03T07:14:55.000Z",
            "__v": 0
        },
        {
            "_id": "5b8ce047d75475317f9900db",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T07:18:31.993Z",
            "updatedDate": "2018-09-03T07:18:31.993Z",
            "__v": 0
        },
        {
            "_id": "5b8ce783f7962c5134a1f6d8",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T07:49:23.207Z",
            "updatedDate": "2018-09-03T07:49:23.207Z",
            "__v": 0
        },
        {
            "_id": "5b8cf753f7962c5134a1f7de",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T08:56:51.927Z",
            "updatedDate": "2018-09-03T08:56:51.927Z",
            "__v": 0
        },
        {
            "_id": "5b8cf771f7962c5134a1f7f3",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T08:57:21.158Z",
            "updatedDate": "2018-09-03T08:57:21.158Z",
            "__v": 0
        },
        {
            "_id": "5b8d06f4f7962c5134a1f88e",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T10:03:32.163Z",
            "updatedDate": "2018-09-03T10:03:32.163Z",
            "__v": 0
        },
        {
            "_id": "5b8d1635f77f81543734f710",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T11:08:37.161Z",
            "updatedDate": "2018-09-03T11:08:37.161Z",
            "__v": 0
        },
        {
            "_id": "5b8d163af77f81543734f713",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T11:08:42.799Z",
            "updatedDate": "2018-09-03T11:08:42.799Z",
            "__v": 0
        },
        {
            "_id": "5b8d165af77f81543734f729",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T11:09:14.341Z",
            "updatedDate": "2018-09-03T11:09:14.341Z",
            "__v": 0
        },
        {
            "_id": "5b8d1675f77f81543734f738",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T11:09:41.275Z",
            "updatedDate": "2018-09-03T11:09:41.275Z",
            "__v": 0
        },
        {
            "_id": "5b8d1ecbf77f81543734f796",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T11:45:15.680Z",
            "updatedDate": "2018-09-03T11:45:15.680Z",
            "__v": 0
        },
        {
            "_id": "5b8d1ecff77f81543734f799",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T11:45:19.509Z",
            "updatedDate": "2018-09-03T11:45:19.509Z",
            "__v": 0
        },
        {
            "_id": "5b8d1f60f77f81543734f7a0",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-03T11:47:44.250Z",
            "updatedDate": "2018-09-03T11:47:44.250Z",
            "__v": 0
        },
        {
            "_id": "5b8dee73f77f81543734f7a7",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T02:31:15.037Z",
            "updatedDate": "2018-09-04T02:31:15.037Z",
            "__v": 0
        },
        {
            "_id": "5b8dee8ff77f81543734f7ac",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T02:31:43.624Z",
            "updatedDate": "2018-09-04T02:31:43.624Z",
            "__v": 0
        },
        {
            "_id": "5b8df131f77f81543734f7d1",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T02:42:57.135Z",
            "updatedDate": "2018-09-04T02:42:57.135Z",
            "__v": 0
        },
        {
            "_id": "5b8df6b635e1d657efb72483",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T03:06:30.936Z",
            "updatedDate": "2018-09-04T03:06:30.936Z",
            "__v": 0
        },
        {
            "_id": "5b8dfe9d35e1d657efb72486",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T03:40:13.107Z",
            "updatedDate": "2018-09-04T03:40:13.107Z",
            "__v": 0
        },
        {
            "_id": "5b8dfea335e1d657efb72489",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T03:40:19.798Z",
            "updatedDate": "2018-09-04T03:40:19.798Z",
            "__v": 0
        },
        {
            "_id": "5b8dff4a35e1d657efb7248c",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T03:43:06.523Z",
            "updatedDate": "2018-09-04T03:43:06.523Z",
            "__v": 0
        },
        {
            "_id": "5b8e02b535e1d657efb724a3",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T03:57:41.603Z",
            "updatedDate": "2018-09-04T03:57:41.603Z",
            "__v": 0
        },
        {
            "_id": "5b8e02b935e1d657efb724a6",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T03:57:45.301Z",
            "updatedDate": "2018-09-04T03:57:45.301Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a12d9894f5a6e2ca45a",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:37:22.274Z",
            "updatedDate": "2018-09-04T05:37:22.274Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a18d9894f5a6e2ca45d",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:37:28.322Z",
            "updatedDate": "2018-09-04T05:37:28.322Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a1ad9894f5a6e2ca461",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:37:30.702Z",
            "updatedDate": "2018-09-04T05:37:30.702Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a1dd9894f5a6e2ca464",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:37:33.486Z",
            "updatedDate": "2018-09-04T05:37:33.486Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a22d9894f5a6e2ca467",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:37:38.553Z",
            "updatedDate": "2018-09-04T05:37:38.553Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a25d9894f5a6e2ca46a",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:37:41.435Z",
            "updatedDate": "2018-09-04T05:37:41.435Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a28d9894f5a6e2ca46d",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:37:44.513Z",
            "updatedDate": "2018-09-04T05:37:44.513Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a31d9894f5a6e2ca470",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:37:53.600Z",
            "updatedDate": "2018-09-04T05:37:53.600Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a39d9894f5a6e2ca473",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:38:01.346Z",
            "updatedDate": "2018-09-04T05:38:01.346Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a40d9894f5a6e2ca476",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:38:08.591Z",
            "updatedDate": "2018-09-04T05:38:08.591Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a45d9894f5a6e2ca479",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:38:13.517Z",
            "updatedDate": "2018-09-04T05:38:13.517Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a50d9894f5a6e2ca47c",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:38:24.490Z",
            "updatedDate": "2018-09-04T05:38:24.490Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a56d9894f5a6e2ca47f",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:38:30.416Z",
            "updatedDate": "2018-09-04T05:38:30.416Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a59d9894f5a6e2ca482",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:38:33.699Z",
            "updatedDate": "2018-09-04T05:38:33.699Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a5cd9894f5a6e2ca485",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:38:36.717Z",
            "updatedDate": "2018-09-04T05:38:36.717Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a69d9894f5a6e2ca488",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:38:49.460Z",
            "updatedDate": "2018-09-04T05:38:49.460Z",
            "__v": 0
        },
        {
            "_id": "5b8e1a9bd9894f5a6e2ca48f",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:39:39.920Z",
            "updatedDate": "2018-09-04T05:39:39.920Z",
            "__v": 0
        },
        {
            "_id": "5b8e1aa2d9894f5a6e2ca499",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:39:46.887Z",
            "updatedDate": "2018-09-04T05:39:46.887Z",
            "__v": 0
        },
        {
            "_id": "5b8e1b37d9894f5a6e2ca4df",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:42:15.394Z",
            "updatedDate": "2018-09-04T05:42:15.394Z",
            "__v": 0
        },
        {
            "_id": "5b8e1b40d9894f5a6e2ca4ee",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:42:24.140Z",
            "updatedDate": "2018-09-04T05:42:24.140Z",
            "__v": 0
        },
        {
            "_id": "5b8e1b42d9894f5a6e2ca4f1",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b88a7f4978225176f3869a6",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T05:42:26.940Z",
            "updatedDate": "2018-09-04T05:42:26.940Z",
            "__v": 0
        },
        {
            "_id": "5b8e3424d9894f5a6e2ca4f4",
            "teacherOnly": false,
            "message": "UNDO MARKING ATTENDANCE",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T07:28:36.338Z",
            "updatedDate": "2018-09-04T07:28:36.338Z",
            "__v": 0
        },
        {
            "_id": "5b8e343ed9894f5a6e2ca4f7",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T07:29:02.426Z",
            "updatedDate": "2018-09-04T07:29:02.426Z",
            "__v": 0
        },
        {
            "_id": "5b8e363cd9894f5a6e2ca4fe",
            "teacherOnly": false,
            "message": "MARKED ABSENT",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T07:37:32.248Z",
            "updatedDate": "2018-09-04T07:37:32.248Z",
            "__v": 0
        },
        {
            "_id": "5b8e54d6c99b3f0ca57992b5",
            "teacherOnly": false,
            "courseId": "5b35ec844e007039a4160a7c",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "message": "Journal 1",
            "photo": null,
            "createdDate": "2018-09-04T09:48:06.055Z",
            "updatedDate": "2018-09-04T09:48:06.055Z",
            "__v": 0
        },
        {
            "_id": "5b8e5b468008c26024e569df",
            "teacherOnly": false,
            "message": "ATTENDANCE MARKED",
            "courseId": "5b8cda9ad75475317f98ffd1",
            "studentId": "5b063eaa36f2e0f83cdbac89",
            "createdDate": "2018-09-04T10:15:34.028Z",
            "updatedDate": "2018-09-04T10:15:34.028Z",
            "__v": 0
        }
    ]
};
  	public testParagraph = "Make it easier for recruiters and hiring managers to quickly understand your skills and experience. skil test test test";
  	public seeAll = false;
  	public wordLength:number = 0;

	constructor(private modalService: NgbModal, private _service: appService, public toastr: ToastsManager, vcr: ViewContainerRef) { 	
	}


	ngOnInit() {
		this.blankCrop = false; 
		this.getAllUsers('customer');
	}

	@HostListener('window:scroll', ['$event']) onScroll($event){    
	    if(window.pageYOffset > 10){
	      this.isSticky = true;
	    }else{
	      this.isSticky = false;
	    }
	    if(window.pageYOffset > 40){
	      this.navIsFixed = true;
	      this.isCreateFix = true;
	    }else{
	      this.navIsFixed = false;
	      this.isCreateFix = false;
	    }

	}


	getSingleInfo(ID){
		console.log(ID);
		this.getSingleUser(ID);
	}

	getSingleUser(ID){
		this._service.getCurrentUser(ID)
    	.subscribe((res:any) => {
  			console.log(res);
  			this.formFieldc = res;
  			this.isupdate = true;
  			this.returnProfile = res.profilePic;
  			console.log('~~~', this.returnProfile)
  			this.showCustDetail = false;
			this.goCreateForm();
	    }, err => {	
	    	console.log(err);
	    });
	}

	focusMethod(e){
		console.log('hi', e);
		$('.limit-wordcount').show('slow'); 
	}
	  
	blurMethod(e){
		console.log('blur', e);
		$('.limit-wordcount').hide('slow'); 
	}

	changeMethod(val : string){
		console.log(val);
		this.wordLength = val.length;
	}

	createUser(obj, apiState){
		console.log(obj);		
		this.atLeastOneMail = false;		
		let objData = new FormData();
		let getImg = document.getElementById("blobUrl");		
		let guardianArray;
		this.img = (getImg != undefined) ? document.getElementById("blobUrl").getAttribute("src") : this.img = obj.profilePic;
		guardianArray = (obj.guardianmail) ? obj.guardianmail.split(',') : '' ;
		this.atLeastOneMail = (!obj.guardianmail && !obj.email) ? true : false;
		obj.email = (obj.email == undefined) ? '' : obj.email;

		objData.append('regionId', this.regionID);
		objData.append('orgId', this.orgID);
		objData.append('firstName', obj.firstName);
		objData.append('lastName', obj.lastName);
		objData.append('preferredName', obj.preferredName);
		objData.append('email', obj.email);
		objData.append('guardianEmail', JSON.stringify(guardianArray));		
		objData.append('profilePic', this.img);
		console.log(objData);

		if(apiState == 'create'){
			objData.append('password', obj.password);
			objData.append('location', JSON.stringify([]));
			console.log('create');
			// this.blockUI.start('Loading...');
			// this._service.createUser(objData)
	  //   	.subscribe((res:any) => {
	  // 			console.log(res);
	  // 			this.toastr.success('Successfully Created.');
		 //  		this.blockUI.stop();
		 //  		this.back();
		 //  		this.getAllUsers('customer');
		 //    }, err => {		    	
		 //    	this.blockUI.stop();
		 //    	if(err.message == 'Http failure response for http://dev-app.brainlitz.com/api/v1/signup: 400 Bad Request'){
		 //    		this.toastr.error('Email already exist');
		 //    	}
		 //    	else {
		 //    		this.toastr.error('Create Fail');
		 //    	}
		 //    	console.log(err);
		 //    })
		}else{
			console.log('update');
			console.log(this.img);
			this._service.updateUser(obj.userId, objData)
	    	.subscribe((res:any) => {
	  			console.log(res);
	  			this.toastr.success('Successfully Created.');
		  		this.blockUI.stop();
		  		this.back();
		  		this.getAllUsers('customer');
		    }, err => {
		    	this.toastr.error('Create Fail');
		    	this.blockUI.stop();
		    	console.log(err);
		    })
		}
	}

	edit(id, type, modal){
		console.log(id);
		this.getAllpermission();
		this.blankCrop= true;
		this.notShowEdit = false;
		this.updateButton = true;
		this.createButton = false;
		this._service.userDetail(this.regionID, id)
		.subscribe((res:any) => {
			console.log('customer', res);
			this.formFieldc = res;
			//$("#upload-demo").append('<img src="' + res.profilePic + '" />');
			//$("#upload-demo img").css("width", "100%");
		})
		
	}

	getAllUsers(type){
		this.blockUI.start('Loading...');		
		this._service.getAllUsers(this.regionID, type)
		.subscribe((res:any) => {			
			this.customerLists = res;
			console.log('this.customerLists', this.customerLists);			
			setTimeout(() => {
		        this.blockUI.stop(); // Stop blocking
		    }, 300);
	    }, err => {
	    	console.log(err);
	    })
	}

	getAllpermission(){
		this._service.getAllPermission(this.regionID)
		.subscribe((res:any) => {
			this.permissionLists = res;
			console.log('this.permissionLists', this.permissionLists);
		})
	}

	getAllLocation(){
		this._service.getLocations(this.regionID)
		.subscribe((res:any) =>{
			this.locationLists = res;
			console.log('this.locationLists', this.locationLists);
		})
	}

	validateEmail(data){
		console.log(data);
		this.atLeastOneMail = false;
		if( !this.isValidateEmail(data)) { 
			this.emailAlert = true;
		}
		else {
			this.emailAlert = false;
		}
	}

	validateGuarmail(gData){
		console.log(gData);
		this.atLeastOneMail = false;
		if(!this.isValidateEmail(gData)) { 
			this.guardianAlert = true;
		}
		else {
			this.guardianAlert = false;
		}	
	}

	isValidateEmail($email) {
	  var emailReg = /^([A-Za-z0-9\.\+])+\@([A-Za-z0-9\.])+\.([A-Za-z]{2,4})$/;
	  if($email != ''){
	  	return emailReg.test( $email );
	  }
	  else {
	  	return true;
	  }	
	}

	goCreateForm(){
		this.showFormCreate = true;
		console.log('create');
		setTimeout(function() {
	      $(".frame-upload").css('display', 'none');
	    }, 10);
	}

	back(){
		this.formFieldc = new customer();
		this.isupdate = false;
		console.log('back');
		this.showFormCreate = false;
		this.blankCrop = false;
		this.imgDemoSlider = false;
		$(".frame-upload").css('display', 'none');
	}

	uploadCropImg($event: any) {
		console.log('hihi');
		var image:any = new Image();
	    this.blankCrop = true; 
	    $(".frame-upload").css('display', 'block');
	    this.imgDemoSlider = true;
	    $("#upload-demo img:first").remove();
	    this.input = $event.target.files[0];
	    if (this.input) {
	      	if (this.input && this.uploadCrop) {
	        	this.uploadCrop.destroy();
	      	}
	      	var reader:FileReader = new FileReader();
	        this.uploadCrop = new Croppie(document.getElementById("upload-demo"),{
		        viewport: {
			            width: 150,
			            height: 150,
			            type: 'circle'
			          },
			        boundary: {
			            width: 300,
			            height: 300
			        },
		          	enableExif: true
	        	});
		      	var $uploadCrop = this.uploadCrop;

		      	console.log($uploadCrop)
		      	reader.onload = function(e: any) {
		        $uploadCrop.bind({
		            url: e.target.result
		          })
		          .then(function(e: any) {});
		    };
	    	reader.readAsDataURL($event.target.files[0]);
	    }
  	}

  	cropResult(modal) {
  		
	    let self = this;
  		console.log(self.input);

	    this.imgDemoSlider = false;
	    setTimeout(function() {
	      $(".circular-profile img:last-child").attr("id", "blobUrl");
	      $(".frame-upload").css('display', 'none');
	      this.blankCrop = false;
	    }, 200);
	    this.uploadCrop
	      .result({
	      	circle: false,
	        type: "canvas",
	        size: {
				width: 800,
				height: 800
			},
			quality:1 
	      })
	      .then(function(resp: any) {
	        if (resp) {
	        	setTimeout(function() {
	        		$(".circular-profile img").remove();
	        		$(".circular-profile").append('<img src="' + resp + '" width="100%" />');
	           	}, 100);
	        }
	    });
  	}

  	dataURItoBlob(dataURI: any) {
	    var byteString = atob(dataURI.split(",")[1]);
	    var mimeString = dataURI
	      .split(",")[0]
	      .split(":")[1]
	      .split(";")[0];
	    var ab = new ArrayBuffer(byteString.length);
	    var ia = new Uint8Array(ab);
	    for (var i = 0; i < byteString.length; i++) {
	      ia[i] = byteString.charCodeAt(i);
	    }
	    return new Blob([ab], { type: mimeString });
	}

	backToUpload(){
		this.imgDemoSlider = false;
		$(".frame-upload").css('display', 'none');
	}


	showDetails(data, ID){
		console.log(ID);
		this.editId = ID;
		console.log("show details");
		this.showCustDetail = true;
		// this.custDetail = data;
		// this._service.getUserDetail(this.regionID,data.userId)
		// .subscribe((res:any) => {
		// 	this.custDetail = res;
		// 	console.log("CustDetail",res);
		// 	this.showCustDetail = true;
		// })
	}

	backToCustomer(){
		this.formFieldc = new customer();
		this.showCustDetail = false;
		this.isupdate = false;
		this.showFormCreate = false;
		this.blankCrop = false;
		this.imgDemoSlider = false;
		this.showCourse = 2;
		this.showProgress = 2;
		this.showBadge = 2;
		this.showRating = 2;
		$(".frame-upload").css('display', 'none');
	}
	showMoreClasses(){
		console.log("show More");
		this.showCourse = this.custDetail.courses.length;
		// if(type='course'){
		// 	this.showCourse = this.custDetail.courses.length;
		// }
		// else if(type='progress'){
		// 	this.showProgress = this.custDetail.widgets[0].APG.length;
		// }else if(type='badge'){
		// 	this.showBadge = this.custDetail.widgets[1].APG.length;
		// }else if(type=='rating'){
		// 	this.showRating = this.custDetail.ratings.length;
		// 	console.log(this.showRating)
		// }
	}
	showMoreRating(){
		this.showRating = this.custDetail.ratings.length;
	}
	showAll(){
		this.seeAll = true;
	}

}


import {
  Component,
  OnInit,
  HostListener,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  public activeType: any = 'New';
  public activeId: any;
  public activeObj: any;
  public reviewList = [
    {
      _id: '5df1ef3d31ce9f0014a15563',
      title: 'Attendance',
      type: 3,
      teacherOnly: false,
      isApproved: false,
      photo:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEA8PDw8PDw8PDw8PDQ8NDw8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFRAQFSsdFR0rLSsrKysrLS0rKysrLS0tKy0tKystLS0rLS0tKystLS0tLS03LTctMC0tLS0rKy0tLf/AABEIALcBFAMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAECBQAGB//EADQQAAICAQIEBAQEBQUAAAAAAAABAgMRBCESMUFRBRNhcSKBkbEGMsHwFCNCYnIkM1LR8f/EABoBAAMBAQEBAAAAAAAAAAAAAAECAwAEBQb/xAAlEQEBAAICAwACAgMBAQAAAAAAAQIRAxIEITETQSJRBTJhcSP/2gAMAwEAAhEDEQA/APQxIVIWIGXiBhEYVlE2mROkfoXZS3S56DdE8k16T0GnGjljKOqQ/jLOKOnDYFwWx4IGgSK/h0rDT8Uop9Wk/mymOO65+XDWNepr06SSSwksJLojunp5Nw2l1YDKS4aYn4n2qU+sZxx7Pp9heT/XbcOdx5cf+sjSahsht60rRquyZSU1CYDbEUzMHO1h2ADmbbOAzmFlWws7mZkqBmXSFZeJmXwYyEjA5hAbR6yVcsrdf1RfJoP2F+e41o+M0tb8UX2ab+wutFu7+mR4jrfMksLEY54c836i5U3Hhr3+ybkJpTbNi+hzrb0vFm1ppd/BosAiwNIxmuBXHElo8ai0xJa6VBTqTaFShpiG3OoFimIFtZPKOjAvwCyK3S8Fhp9U8oeenJyzc09HpbFOKa+a7PsW7PLyw0K4fth2S4PJfifUqxxqreYxfFOS5Sl0S9F++QueW5puLh/l2v6Z2m07WCcjsnpp01j6PDKibRtpwDQqSQumcoGkYTgG0Ac4gEPhMK8Yja2W2fs1XpJyWVFtd+5tF7QOylxeGmn67C6NMo6EQ6EwqzaFzqNoVHWbTByrFCAziLTaDaFohcQC2NrS6WMViKx69WdWOGOM9PKy5Ms7u0TV6CNkHt8aTcH1z2E5MJZ/1bhzuN3+nnYHBY9XZmpD4xqfogdGMTtNRgWkTqZQG0SqcBgUmgWK40CaQliuOegJoXqN5AZPAbEcs1I3STzFtPungVOyZfXW3WT2lOcl2cm0HYfix/pENOGD10Yr048CwxGoLLcAdDtDiLTY+w5RFNpyRoAiQQVnA2h2G4m0GzvhOmU577qKy137D5esUb/LLT0HAR2bqDqaFJNNe3dMMC+mB5fDJxfNPA8PLs1WjGE4DGUdYGDlAAlrKxdMUuiJR2VbFPp6qqJ1WvIxx2PGON303fsJctLY8VeOb37dTivuvT63GapmllMYS0/RI6MSU3CZUiWzApJmACcgtspbYLR2BO4W0LSl15O0u1a7MiymlOUoaKQ5XAdhoxGhauojEdwmoyW3RmOkXV/JHLny/wBPT4vEkn8gbtKuj+ok5vftXLxMbPRFtp4OjG7ebnjcbZRISKaSTJhC0JsxdnvB71GzD2Ulj59DZzeP/hcbrL/16AgspMMJXn9dJeZLHdfXA7YfFqZhhzCkZnNmFVgMDYgViGpQlgM6b3JVWX09hTOOM8Ucc85WDouUcWHHf6I+J+IJxdde6e0pdGuyObkz9aj1fF8X32zYGoW6+ZLjivmY6sqa5nRjHn2nKrS0KartGlDRiEhgdJGKWtCWs/UZFyCEbWyVGkLOLJKkGok8ghsa2NMVi0p+tDmFGJXZCAmmfxr5/Yny3WLo8Wb5IckzhtezIDNkrVIytdLE/kju4L/F5Pmz/wCnoOFp0SuGxaywOyWB8RtkGrYQamm8SnFYaUuze0vqLcIeWxGq8SlJYiuHu85YOoX2zWCqReEsGExGwYNp80LbT5gDRWcgUSd4tZnWR3JUdnqkTehh7WlEWx14XU2SveXt0K4Y6ef5PJ3y1ERiU+OWY2+ovwyQn5JFp42dnxau5p4exTHLaWWFx+w9RcPKnYajLI8LpScMhLS1lGTF0BPS+gtjE79J6E7i2gK9PuRvpXj4+100KFjmPjdmywuNO1zKMu5hDSOIIIU2mmua3BZuaPhl1ssPQ1EWueH2exxZ8dj2OPnwzn0DUamMeqb6JdSePFllfh8/Iwwn32w9Rc5SbfNnXJ1kjx+TO55bqK7BpSWCSmNsliYsaE6nNPHIdjMDkKjbN0qLKwUOtLTWAMhGFykU0TbnMMgXJysBTSpdgtNsGyWRKJaUSehg9bF1F5nYtZLYOoN5cqWkhtpi1RS9+pz55vR8fhkm1pM57m7sOMK3dPut0Hj5dUPI8fvhf7U01x6ONfP2NOmwpKWmMh2XTsB2WxSUUZtAWVoFbRThSZDknp0cHrKCWCYK8/tEZFXMtxBYSLGBYYFXE2m2BbEFHZC8jkaF1MQ48JjylsMVJvlkNy0OHHcvkaWlWOYszi34rPp6IezXBFiG2ncStleQp3EJ1s2wuNDZaIUNspIjcvbsiZK4ubI1WBSmLRU4xBXjIlKtp0ph7MFKRtmxm6M5nHnk9nix9REpnPlk78MZIJHQ2tZUGturS+5sccrZpPk8rixl3WWqrK2lZFxzyzyfsz08LY+auUyvpoaa5nRMidTsbRpS2L+eHYOdwQ0pO0GxLSeWTp8PVTYxcYryWVEUOjYLFBASKGgVdIaEqWhgL3oWjGZqCOSkLJEzm9FVxSw+S3YueXWOjxeD8uer8jWgl0Oa5WvcnFjj6noaD7hxy0TPimX6Wjb0LTPbgy4tXQy3KzJz54aS4DI6CtqCWwnbEvi5uSfssXnxxX6ukJlFsa5xIVeFLXuJW2HkURYnLHSJwjwodkDU0qitXLr9zk5MXq+PzSzX7bHg2kWPMlu3tDPRdwcXFv3Q8ryd/wAZfTWk+iOqR5XJyb9REqYyi4yScXzTKIPJ6qp02zrznhfwvvF7oaVXH3FXqA9h6phcaZj0MRkxpmW4obYdhoamiT5LbuLlnItx8GWfyGP4SXo/YE5JVcvFzxQqijmuKygEOlW4QwtiyG2SxLGIWuiLTRn31ksjwvGsQ22j4dXhtd0S5sdyO/8Ax+cmeUPKODn09fs7qbRbkPwLoPHNll7olUWVx9Obk9iFdoXFFg207iStgWwqHJj6KOvc6pfTzbjqrJCZHxWkiNjohC+O4lYAQ0gsWckdC/GOys5GGQlYtxLDzb1Phq/lV/4IfGTUc+Vuz0A0gsTRnk/xVL/ULHSuOffL/TAmWWqvxTcrI8wXLNeYvX/hnwOMoK61ZUvyQ6Nd2HDeXv8ATV6VaWvGOCGO3CsFdQGN4r4PFfHWsLK4o80lnmg9tBOPeUVqq6EtW/XqbmM1BFUHQdw56dZzgbtdJ/jx7b0jh9F9BN1Tpj/RfUV43X09S3Hna4fI4JjNwumdG3BYniG2SxSYtol51iWCr5Ium2sljdczWbmjY53G7gj1a6p5IZcVelh50s/lPYf8Ys7GnGGXmdvUaNck9+4IbLKjuQxd7DnMb9F0H5wsyNeNRyK45o5cYcjpxz9OLk4lB97c/XTpSJWqzElqJInapjgFFCbP0Anbg5opoOWpQxpiG9Wu4DdA3fuYdaei8A1qcfLk0pLPDnquw2Nc3Jjq7bkWNU0ajVQri5zeEvq32XdgtkaTbw2u1LtsnZLnJ5x2XRfQ58stu3DHrNFHLcjnVY+r+F48inh5eVDGP8UdnF/pEr9NlAC1LXBPPLhf2N9GXVlZlUdsoXq7O+4Lwh0G1ZRybTShyrF0eZF9VD4WNhPaXkZTozpI6Y8rKhthKkDI4Ray6ibTB2RMxOxAotbw/wDDzklOyTinuor82PXsIbVaD8FjFfy5yWOkviQOsUnJlGdbxRk4yWGuZuquPJt2AVSUKaI5R1YZBxlvgXHPVUzxmlmzpxzefyYe3JD/AJXP+PYdlbF77Njxs/UCZZr4caYLbqyV5VvwMbU6jCYdIY47Z8bJzb4eXd8ivHw5Z/HfweJeT4KtJbjKafpui98LOe47Mv8AH2TYddzzh7Y2aOe4WfXBy8Nx+xpaezkLpyZRp1eIXJbWS+ufuBG4Y/0V1Nk5vM5OT6cTzgSymxknwCSJWH7FrIiXE3Z6z8J/iWNcVp73iK/27HyS/wCMvT1H4s+vq/Avt7COvpayra2u6nHH3OqZS/srN1/isZ/BW8r+qXR+iK4Y/tPLL9B0W45FLjKGHJcRna31B0kNeXKr1Sx7Gyx22PP19LuxepPpT3ysYS1U8lccNOPl8m5X/jNmxiTLYWQCvEDCRRhWwZgrImZ3h9KlbBPk5LPtkSjJ7evwI6ESDC5MLxmPxwfVpr6Y/wCxonLql66QWLTJM9OSzi3HnondRuedy59a7ceTcRGJpzeks8dmKqxpzbJ+P9rzp2K48lbpolPS5Zf7DY3VV8pLZENOvtHhdfbhM7McduThx2d0MUor05e/VnveJxSR9T43FMcIejI7esWsJeKVbebH8y/P/cu55nnePNd44vJ4JlNqaS3ODx6+f5+PValIrjyWmhKQFiWG2HOIum2D5e4NezSndLnoWwsjdbfjY0s8c9jpxziOfHlPdjQrvKyp2ma7jFuRiMwpZVzZk6WvkbZbjtn2zAtiDGYpzEGFhomFdI1aKyiAQ624yUlzTTXuLYz02l1UZxynv1XVMTS0y2vbYkstpJdXyMXKsXUS8yfEuS2j6+o0LIYqrNaeJsrIclVxJ3VnieVnp08YCrOTDl27McDNVWOZ1ce2y0YlUsHoccc+ULWVbnbJ6c3bVLzo3F6K/kr514rVlM6MPpuHLVF8OnmCfrv6M9/xc5cH13jZzLjlaFbOmnyW1MPhkv7ZfY4vJznSxDPLWNpLSafGDwr7fN+Rl7atNYmnn5VeyAthC0oMXQiwoYtHQ9Oiy9+XUnnlpfh4u1NKjHI5rlXoYYzWl47c/sPjy2GvFjYHOzG65fY7eLn36eb5XjdfcNUXnVjk82w9TaU2TQs7RQ6bLW2A2aYaIXyNsQVIVjVVg8YzGwZhIyBRi4BQ4AYKUGuTa9tmLYCIKTe7b922DTN3SaB4Te3p1BtfHG6My0+PUW03XQEzm5cvR8SlqPB8rLbp4voUY7nN4/rL27bfS2dz0Mb7D9D1yPQ4faOc9Kziehi4Mi8mx+pO9fP9dTzBKrx5aYFWplRY1zhLmv1R1cHkXjr2/C8vp6vxsabxCL7fU7MvMlj08vMws9HY2cSwt883+hxcvN29PK8nzdzUP6XT8jnmLxs+TbQhpw6c9yRZQC4llCWmEyxUxpunSrqvkc3I7+Himt07CtJcjmyjtwkk+KW0onYbRScBFJYVvjzK8Vu3N5OuldpkenjXh5H65YLSpLytDsQLJgYrORgDbA2l67AysZrsH2BiEzMPBhYZA0O1ZxFomvCaU7FnomxMvUPxzdbxN0uMzKue7Xqzn5sbYWUvJHkcvj2ujDLSjOT8WWN+OvDKWKHTxy7UEjPB6fBHPzZSQWJ6GMefarKKKJvE6mrmKMrz+u0WZchXThyaTRosb45G2p+WtfR1BiOebY065FI5sq0a0MTa/lG0CPJFyimFGjWcueL0uPL0JwnPli6scg7ERsWxJWLmDrtLLP2R1E+hfiwcfkcvrUO6Ctdjpjzatemm29k38PdlcaQByGYKUgbbQcgbYKRhQpG22l42jSgapsKSlNwsGARWmbYsbMi00prQahQmm+T2fsxMpuHwy1W/GSe65EXTLtS+1RWX8l3YZNhbplSlk1wTmTsErxQ8yQ4E748UnJotNCzx5Kf81VSZfHDSWWexVMvIlapK0Yu3m7azFlIW0bi1SZLRp25A0PYemsMJcjVbHlJtoUzGAeMxgqzkCw2NXUjnyxdvHntDsIZR2YZAW3YJdN1TLlmE3Wdfc3ktOKPNz58sqRkxtaT3sWm2S5Sa+bGmiUaMn/6MmIkw1kOAoqSiEApIwhyMymTNoaq0eUthqu0eUo8JjbAWMzMPWzGNVWSXKTXs2gdYParSm3u2377m6wdpjIWng0BbDR0mDTANG6shxG0wVjNIWlJ27jE2RsibRYStQptpqibTWiqINBtJmMVTDKI8bBpQE4xtgq7QWbNjloOd7JXCLTnoE556g6yBc8stF7GButBkgWemEohuCQtrUppz0KSEMx0LG6gpZpWhNCTuqDoCk0LTz2pKt4zgXtFPxZa3oKcQz2W42IiGEsHgxpS0xCY8pTFbG2x2iJoY3GAW0iUQGkBcsAqkgkdQJapMEq4HYei8XkOwuIvDsHZKV1EQwlZti3CnQNQGlhGfMURIIaQtXTBYKJC2Gjo2CGFjIO20LGQ8pUSGChTBQiaatuKXyRycvJZ6ex4Xh45ztkI4Rf8ASvlsQnJXpXxOPWuoVlC6fIvjnuPP8jxevuLaaG5fGbeVn6um/oKCnwsasdOhLkeYg36VYNvbdWLrKcZB+y2MizmbKDhlqh2XNkekjpy57lNfoFsMRtRgYlWiEBYsaUp/SwKRo1NPAxpDcYmMratjNIy9XPAmVdPHjCX8Vgla6sePYleq9TdlLw+mlprMjxyck0dgxnPQdQgwlZlkdxkqV8QrcW4vmngapYZMychFFozDttL8YR05zAOkSQlh5BapCj1F4gyl0hzGmQaRnJuwaMvksdjg5fr6Pw7OkBbJR36Wzt9C/HHL5epgvS9ztw+PnOX/AGeg8Plsh8ko1YshVpVbZbBka1heKSG0lkwLma/AhaTJZKRGQM4Yq0QwKJDmNCtjSLYqEaVLMeGExTBXPYIxi66QMovx5aYF97yc+T0eGb9opueUS97d2p1b+it5F8HleRJK1KrCrhqLrDJ2s+yW4ydG8ZrTm/ZZGnuOfGMSzT7g6q7V4AaNKpKtg0eVThZtHi/EJtWYiwF21xEZkqDOw2xkcpmlbqPVa17E88Nuvx/IvH6/S87Y/tEPxV6WPnYa3QHdn9Do48NRw+T5X5L/AMEpsLz083K7a2i1WOo+9kasNau5umx2rdrEDrodsbXajItKyrGL+hgMidPFRRSNAXiNC0SLwxoU/VqEXkDZ6jUeodNMjUbhdG2i2zY2h2zNTXkFh8aybdHvyOfLF38XLpWGmwyfV3fkmmjRHhRSTTh5ctnK7SsceUdZcZKkbLtzbI0bpZbb6lYnMdFbKwt1tLSqA211SbRtrKhPoaw8yBs0pK4r45qeQydxP3S4MOkcqR1GRafFSmTyCGp+CGTtUsRtDKXmzSm67WrtN2LcDMLmuQ0yT0LHVspMg056tsW5DpSVglyDQMxdjoJoAqgFyDAqeLA8hbQbdRgrjhallnIFDX78zrw4q5c+eHKvEfUp+IMeVo0a7luJeLS05TkL89SOWK2Ge18ZJ1aKTqRKxfG6CVO+RLF5nb6MQ0y6/Qlln+o6OPhlm8hnpkltsxsc7PpOXhxs9M2+Rd5mUZllm4my6bMbclrdQcMd0ZTIZV6PHjFLopptLDX0aBhy2XTc/i45Y3KfYDVI6o8jQ0UatKl1iqSu8oGjbBsrBoKQvoFuJ8aHXQCYjaZUcBsKXvYPhsZ7I+ZuKt1GhHIAyHjAKNqXEISqcQLTaR5glN1RxhCoAFRJBgKthgUrfaX48d1z82fWMjV6x5wj0uLhjwvI8q71CHmyzzZ24YRw3PL+zNN0l1L/AI5S/lzx+Vo6TVTexPLgx0a/5DPCPQeH6jO3U4+Xhkdnif5G8l1ptadHnZ46fRcPJ2g8oZI107C4fiSJcnyujhm8oYUTmkejarbZhN9kPPpc/WNrz+ruOivFrLnZuID/2Q==',
      message:
        'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
      type_detail: {
        attendance: true,
        date: '2019-12-12T09:41:49.000Z'
      },
      sender: {
        preferredName: 'Arron Walm TEST',
        profilePic:
          'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
        senderId: '5b063ee136f2e0f83cdbac8c'
      },
      student: {
        preferredName: 'Rachel',
        profilePic:
          'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
        studentId: '5de8ca0631f64d0013c2bd39'
      },
      course: {
        courseCode: 'Yogayago',
        name: 'Yoga Beginner Class',
        courseId: '5de8caad31f64d0013c2bd40'
      }
    },
    {
      _id: '5df1ef3d31ce9f0014a15565',
      title: 'Attendance',
      type: 3,
      teacherOnly: false,
      isApproved: false,
      message:
        'Attendance confirmed for Yoga Beginner Class, December 12, 2019 8:00 PM;',
      type_detail: {
        attendance: true,
        date: '2019-12-12T09:41:49.000Z'
      },
      sender: {
        preferredName: 'John',
        profilePic:
          'https://brainlitz-dev.s3.amazonaws.com/profile/153024702410236101155153024710196819002479153024835851660964289153025062134548629028_original.jpg',
        senderId: '5b063ee136f2e0f83cdbac8c'
      },
      student: {
        preferredName: 'June',
        profilePic:
          'https://brainlitz-dev.s3.amazonaws.com/development/stgbl-cw1/profile/15755371584864828423_original.jpg',
        studentId: '5de8ca0631f64d0013c2bd39'
      },
      course: {
        courseCode: 'Yogayago',
        name: 'Yoga Beginner Class',
        courseId: '5de8caad31f64d0013c2bd40'
      }
    }
  ];

  @Output() backto = new EventEmitter();

  constructor() {}

  ngOnInit() {
    if (this.reviewList.length > 0) {
      this.activeId = this.reviewList[0]._id;
      this.activeObj = this.reviewList[0];
    }
  }

  @HostListener('window:scroll', ['$event']) onScroll($event) {
    var navbar = document.getElementById('navbar');
    var list = document.getElementById('message-list');
    var allfix = document.getElementById('all-fix');
    var sticky = navbar.offsetTop;
    if (window.pageYOffset > 40) {
      navbar.classList.add('sticky');
      list.classList.add('addtop');
      allfix.classList.add('addtop');
    } else {
      allfix.classList.remove('addtop');
      list.classList.remove('addtop');
      navbar.classList.remove('sticky');
    }
  }

  backToCourses() {
    this.backto.emit(false);
  }

  showMessageDetail(obj) {
    console.log('exit');
    this.activeId = obj._id;
    this.activeObj = obj;
    console.log(this.activeId);
  }
}

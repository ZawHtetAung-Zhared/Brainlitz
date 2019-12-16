import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApgComponent } from './apg.component';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { FormsModule } from '@angular/forms';
import { UserGradingComponent } from './user-grading/user-grading.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { appService } from '../../service/app.service';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastModule } from 'ng5-toastr/ng5-toastr';

describe('ApgComponent', () => {
  let component: ApgComponent;
  let fixture: ComponentFixture<ApgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApgComponent, UserGradingComponent],
      imports: [
        DragulaModule.forRoot(),
        FormsModule,
        NgbModule.forRoot(),
        HttpModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ToastModule.forRoot()
      ],
      providers: [appService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

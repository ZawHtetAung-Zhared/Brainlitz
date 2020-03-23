import { Component, OnInit, Input } from '@angular/core';

import { appService } from '../../../../service/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-apg-modal',
  templateUrl: './delete-apg-modal.component.html',
  styleUrls: ['./delete-apg-modal.component.css']
})
export class DeleteApgModalComponent implements OnInit {
  public regionID = localStorage.getItem('regionId');

  @Input() public deleteApg;

  constructor(private _service: appService, public toastr: ToastrService) {}

  ngOnInit() {
    console.log(this.deleteApg);
  }

  closeDeleteModal() {
    this._service.closeDeleteApgModal();
  }

  apgDelete() {
    this._service.deleteAPG(this.regionID, this.deleteApg._id).subscribe(
      (res: any) => {
        console.log('deleteapg', res);
        this.toastr.success('Successfully APG deleted.');
        // this.getAllAPG(20, 0); //call parent functions
      },
      err => {
        this.toastr.error('Fail to delete APG!');
      }
    );
    this._service.closeDeleteApgModal();
  }
}

import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface IData {
  id: number;
  city: string;
  start_date: string;
  end_date: string;
  price: string;
  status: string;
  color: string;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {
  action: string;
  dialogBoxLocalData: any;
  isDisable: boolean;
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IData) {
    this.dialogBoxLocalData = { ...data };
    this.action = this.dialogBoxLocalData.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.dialogBoxLocalData });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit() {
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { FormControl } from '@angular/forms';
import * as _moment from 'moment';
import { fromEvent } from 'rxjs';
// import {default as _rollupMoment} from 'moment';

const moment = _moment;
export interface IData {
  id: number;
  city: string;
  start_date: string;
  end_date: string;
  price: string;
  status: string;
  color: string;
}

export interface IDateFilter {
  start_date: Date;
  end_date: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'city', 'start_date', 'end_date', 'price', 'status', 'color', 'action'];
  dataSource: MatTableDataSource<IData>;
  details = [];
  selectedFromDate = new FormControl(new Date());
  selectedToDate = new FormControl(new Date());
  DateFilter: IDateFilter = {
    start_date: this.selectedFromDate.value,
    end_date: this.selectedToDate.value,
  };
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  constructor(private apiService: ApiService, public dialog: MatDialog) { }
  ngOnInit() {
    this.apiService.getAll().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event === 'Add') {
          this.addRowData(result.data);
        } else if (result.event === 'Update') {
          this.updateRowData(result.data);
        } else if (result.event === 'Delete') {
          this.deleteRowData(result.data);
        }
      }
    });
  }


  addRowData(rowObject: IData) {
    this.apiService.updateData(rowObject).subscribe((res: any) => {
      console.log(res);
      this.dataSource.data.push(rowObject);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.apiService.getAll().subscribe((data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
    );
  }
  updateRowData(rowObject: IData) {
    this.apiService.updateData(rowObject).subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = this.dataSource.data.filter((value, key) => {
        if (value.id === rowObject.id) {
          value.id = rowObject.id;
          value.city = rowObject.city;
          value.start_date = rowObject.start_date;
          value.end_date = rowObject.end_date;
          value.price = rowObject.price;
          value.status = rowObject.status;
          value.color = rowObject.color;
        }
        return true;
      });
    }
    );

  }
  deleteRowData(rowObject: IData) {
    console.log('Delete data REST API CALL', rowObject);
    this.apiService.deleteData(rowObject).subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = this.dataSource.data.filter((value, key) => {
        return value.id !== rowObject.id;
      });
    });
  }

  addFromDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selectedFromDate = new FormControl(new Date(event.value));
    console.log(this.DateFilter);
    this.DateFilter.start_date = this.selectedFromDate.value;
    this.apiService.getDateFilterData(this.DateFilter).subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addToDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selectedToDate = new FormControl(new Date(event.value));
    console.log(this.DateFilter);
    this.DateFilter.end_date = this.selectedToDate.value;
    this.apiService.getDateFilterData(this.DateFilter).subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}

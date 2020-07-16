import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private SERVER_URL = 'http://localhost:5000';
  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.SERVER_URL + '/sms/allData');
  }

  public updateData(data: any): Observable<any> {
    return this.httpClient.put<any>(this.SERVER_URL + '/sms/data', data);
  }

  public deleteData(data: any): Observable<any> {
    console.log('Delete data', data);
    return this.httpClient.delete(this.SERVER_URL + '/sms/data/' + data.id);
  }

  public getDateFilterData(data: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('start_date', data.start_date);
    params = params.append('end_date', data.end_date);
    return this.httpClient.get<any>(this.SERVER_URL + '/sms/data', {params});
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getAuthHeaders(){
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    return headers;
  }
  getHeaders(){
    let headers = {
      'accept': 'application/json',

    }
    return headers;
  }

   getMMDDYYYY() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear()

    return mm + '-' + dd + '-' + yyyy;
  }

  getMMDDYYYY_calendar(date:Date) {
    let today = new Date(date);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  }



}

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
    //.set('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization')
    //.set('Access-Control-Allow-Origin', '*')
    //.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
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
    let yyyy = today.getFullYear();
    return mm + '-' + dd + '-' + yyyy;
  }

  getMMDDYYYY_calendar(date:Date) {
    let today = new Date(date);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    return mm + '-' + dd + '-' + yyyy;
  }



}

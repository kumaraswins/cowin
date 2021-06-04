import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HelperService} from './helper.service'
import {environment} from '../environments/environment'
import { sha256, sha224 } from 'js-sha256';

@Injectable({
  providedIn: 'root'
})

export class CowinService {

  SECRET =  "U2FsdGVkX1+z/4Nr9nta+2DrVJSv7KS6VoQUSQ1ZXYDx/CJUkWxFYG6P3iM/VW+6jLQ9RDQVzp/RcZ8kbT41xw=="
  SEND_OTP = environment.cowin + "/auth/generateMobileOTP"
  STATES = environment.cowin +  '/admin/location/states'
  DISTRICTS = environment.cowin + '/admin/location/districts/'
  VALIDATE_OTP = environment.cowin + '/auth/validateMobileOtp'

  constructor(private http: HttpClient, private helperService: HelperService) { }

  getDistrictData(value:string, date:string):  Observable<any>{
    let url = '/appointment/sessions/public/calendarByDistrict?district_id='+value+'&date='+ date
    return this.http.get(environment.cowin + url, { headers: this.helperService.getHeaders()})
  }

  encrpt(otp:string){
    return sha256(otp.toString());
  }


  getStates():  Observable<any>{
    return this.http.get(this.STATES, { headers: this.helperService.getHeaders()})
  }

  getDistricts(id:string):  Observable<any>{
    return this.http.get(this.DISTRICTS+id, { headers: this.helperService.getHeaders()})
  }

  getOtp(number:string):  Observable<any>{
    let json = {}
    json["mobile"]=  number
    json['secret'] = this.SECRET
    return this.http.post( this.SEND_OTP,json, { headers: this.helperService.getHeaders()})
  }

  validateOtp(otp:string, txn:string):  Observable<any>{
    let json = {}
    json["otp"]=  this.encrpt(otp)
    json['txnId'] = txn
    return this.http.post( this.VALIDATE_OTP, json, { headers: this.helperService.getHeaders()})
  }



}

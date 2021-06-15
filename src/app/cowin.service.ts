import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { HttpClient, HttpResponse,HttpErrorResponse } from '@angular/common/http';
import {HelperService} from './helper.service'
import {environment} from '../environments/environment'
import { CenterList } from './centers';
import { States, District } from './state';
//import 'rxjs/add/operator/catch'; // don't forget this, or you'll get a runtime error

@Injectable({
  providedIn: 'root'
})

export class CowinService {

  SECRET =  "U2FsdGVkX1+z/4Nr9nta+2DrVJSv7KS6VoQUSQ1ZXYDx/CJUkWxFYG6P3iM/VW+6jLQ9RDQVzp/RcZ8kbT41xw=="
  SEND_OTP = environment.cowin + "/auth/generateMobileOTP"
  STATES = environment.cowin +  '/admin/location/states'
  DISTRICTS = environment.cowin + '/admin/location/districts/'
  VALIDATE_OTP = environment.cowin + '/auth/validateMobileOtp'
  BENFICIARY = environment.cowin +  '/appointment/beneficiaries';

  constructor(private http: HttpClient, private helperService: HelperService) { }

  getDistrictData(value:string, date:string):  Observable<CenterList>{
    let url = '/appointment/sessions/public/calendarByDistrict?district_id='+value+'&date='+ date
    return this.http.get<CenterList>(environment.cowin + url, { headers: this.helperService.getHeaders()})
  }

   getHash(str:string) {
    let strBuf = new TextEncoder().encode(str);
    return crypto.subtle.digest("SHA-256", strBuf)
      .then(hash => {
        let result = '';
        const view = new DataView(hash);
        for (let i = 0; i < hash.byteLength; i += 4) {
          result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
        }
        return result;
      });
  }

  /**
   *
   * @returns
   */
  getStates():  Observable<States>{
    return this.http.get<States>(this.STATES)
  }

  getDistricts(id:string):  Observable<District>{
    return this.http.get<District>(this.DISTRICTS+id)
  }

  getOtp(number:string):  Observable<any>{
    let json = {}
    json["mobile"]=  number
    json['secret'] = this.SECRET
    return this.http.post( this.SEND_OTP,json)
  }

  validateOtp(otp:string, txn:string):  Observable<any>{
    let json = {}
    json["otp"]=  otp
    json['txnId'] = txn
    return this.http.post( this.VALIDATE_OTP, json)

  }

  benificary():  Observable<any>{
    return this.http.get( this.BENFICIARY)

  }
}

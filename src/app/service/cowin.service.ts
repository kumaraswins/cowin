import { Registered } from './../cowin/interface/beneficiary';
import { Otp, ValidateOtp } from './../cowin/interface/mobile';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import {HelperService} from './helper.service'
import {environment} from '../../environments/environment'
import { CenterList } from '../cowin/interface/centers';
import { States, District } from '../cowin/interface/state';

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

  /**
   *
   * @param value
   * @param date
   * @returns
   */
  getDistrictData(value:number, date:string):  Observable<CenterList>{
    let url = '/appointment/sessions/public/calendarByDistrict?district_id='+value+'&date='+ date
    return this.http.get<CenterList>(environment.cowin + url, { headers: this.helperService.getHeaders()})
  }
  /**
   *
   * @param str
   * @returns
   */
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
  /**
   *
   * @param id
   * @returns
   */
  getDistricts(id:number):  Observable<District>{
    return this.http.get<District>(this.DISTRICTS+id)
  }
  /**
   *
   * @param number
   * @returns
   */
  getOtp(number:string):  Observable<any>{
    let otp :  Otp = {"mobile":number,"secret":this.SECRET};
    return this.http.post( this.SEND_OTP,otp)
  }
  /**
   *
   * @param otp
   * @param txn
   * @returns
   */
  validateOtp(otp:string, txn:string):  Observable<any>{
    let validate : ValidateOtp = {"otp":otp,"txnId":txn};
    return this.http.post( this.VALIDATE_OTP, validate)
  }
  /**
   *
   * @returns
   */
  benificary():  Observable<Registered>{
    return this.http.get<Registered>( this.BENFICIARY)

  }
}

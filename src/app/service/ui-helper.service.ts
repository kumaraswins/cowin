import { Injectable } from '@angular/core';
import { StringLiteralType } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class UiHelperService {

  constructor() { }

  getModels(){
    return  {
      "selectedState" :"",
      "selectedDistrict":"",
      "stateList":[],
      "districtData":[],
      "benificiaryList":[],
      "vaccineType":"COVAXIN",
      "ageGroup":"18",
      "vaccineFee":"Any",
      "dose":"dose1",
      "mobile":"",
      "otp":"",
      "availability":"0",
      "date":new Date(),
      "txnId":""
    }
  }
  getViews(){
    return {
      "listOfData":[],
      "showCancel" : false,
      "disableMobile" : false,
      "disableOtp" : true,
      "refreshTime"  : 5,
      "isRefresh" : false,
      "showLoader" : false,
      "loaderText" : ""
    }
  }

  generteData(centers:any,sessions:any,j :number){
    let json:any = {}
    json['name'] =  centers['name']+ centers['block_name'];
    json['vaccine'] =  sessions[j]['vaccine'];
    json['date'] =  sessions[j]['date'];
    json['dose1'] = sessions[j]['available_capacity_dose1']
    json['dose2'] = sessions[j]['available_capacity_dose2']
    json['min_age'] = sessions[j]['min_age_limit']
    json['price'] = centers['fee_type']
    return json
  }

  formData(vaccineType,sessions,centers, listOfData,json,age,fee,j){
    if (vaccineType == "any"
              && sessions[j]['min_age_limit'] == parseInt(age) && fee == centers['fee_type']){
            json = this.generteData(centers, sessions, j)
            listOfData.push(json)
          }
          else if (sessions[j]['min_age_limit'] == parseInt(age)
            && vaccineType == sessions[j]['vaccine'] && fee == centers['fee_type']){
            json = this.generteData(centers, sessions, j)
            listOfData.push(json)
          }
          else if (sessions[j]['min_age_limit'] == parseInt(age)
          && vaccineType == sessions[j]['vaccine'] && fee == "Any"){
            json = this.generteData(centers, sessions, j)
            listOfData.push(json)
          }
  }

  generateTable(data:any, listOfData:any, age:string, vaccineType:string, fee:string, availabilty:string){
    listOfData = [];
    for (let i=0;i < data['centers'].length;i++){
      let centers  = data['centers'][i];
      let sessions  = data['centers'][i]['sessions'];
      for (let j=0;j<sessions.length;j++){
        let json = {};
        if( sessions[j]["available_capacity"] >1){
          this.formData(vaccineType, sessions,centers,listOfData,json,age,fee,j)
        }
      }
    }
    return listOfData
  }
}

import { UiHelperService } from '../service/ui-helper.service';
import { Component, OnInit } from '@angular/core';
import { CowinService } from '../service/cowin.service';
import {HelperService} from '../service/helper.service'


@Component({
  selector: 'app-cowincomponent',
  templateUrl: './cowin.component.html',
  styleUrls: ['./cowin.component.css']
})

export class CowinComponent implements OnInit {
  model = this.ui.getModels() // defines the default value
  view = this.ui.getViews()
  constructor(  private api:CowinService, private helper:HelperService, private ui:UiHelperService) {
  }

   /**
    *
    */
   loadDefautltData(){
     let mobile = localStorage.getItem("mobile")
     if (mobile){
      this.model.mobile = mobile;
     }
     if(localStorage.getItem("vaccineType")){
        this.model.vaccineType = localStorage.getItem("vaccineType")
      }
     if(localStorage.getItem("ageGroup"))
        this.model.ageGroup = localStorage.getItem("ageGroup")
     if(localStorage.getItem("dose"))
        this.model.dose = localStorage.getItem("dose")
      let d : Date = new Date();
      this.model.date = d
   }
  /**
   *
   */
  ngOnInit() {

    this.api.getStates()
    .subscribe(data => {
      this.model.stateList =  data['states'];
      this.model.selectedState = 31;
      this.onChangeState()
    })
    this.loadDefautltData()
  }
  /**
   *
   * @param value
   */
  onChangeState(): void{
    this.model.districtData = [];
    this.api.getDistricts(this.model.selectedState).subscribe(data => {

      this.model.districtData = data['districts'];
      this.model.selectedDistrict = 571;
      this.getHospitalData()

      //localStorage.setItem("selectedState",this.model.selectedState);
    })
  }
  /**
   *
   * @param value
   */
  getDistrictsSessions(value:number){
    this.api.getDistrictData(value, this.helper.getMMDDYYYY_calendar(this.model.date)).subscribe(data => {
      this.view.listOfData = [];
      //this.ui.generateTable(data,  this.listOfData, this.ageGroup);
    })

  }
  /**
   *
   */
  refreshData() {
    //localStorage.setItem("selectedDistrict",this.model.selectedDistrict);
     setInterval(() => {
        console.log('setTimeOut');
        //if (this.view.isRefresh)
          this.getHospitalData()
    }, this.view.refreshTime * 1000);
  }
  /**
   *
   */
  setData(){
    localStorage.setItem("vaccineType",this.model.vaccineType)
    localStorage.setItem("ageGroup", this.model.ageGroup)
    localStorage.setItem("dose", this.model.dose)
  }
  /** */
  beneficiary(){
    this.model.benificiaryList = [];
    this.api.benificary().subscribe(data => {
        let benificaries = data['beneficiaries']
        for (let i=0;i < benificaries.length ;i++){
          benificaries[i]['enable'] = true;
        }
        this.model.benificiaryList =  benificaries;

    })
  }

  /**
   *
   * @param value
   */
  getHospitalData(): void{
    this.setData()
    if (this.model.selectedState == 0 && this.model.selectedDistrict == 0) return;
    this.view.isRefresh =true;
    this.api.getDistrictData(this.model.selectedDistrict, this.helper.getMMDDYYYY_calendar(this.model.date)).subscribe(data => {
      //localStorage.setItem("selectedDistrict", this.model.selectedDistrict)
      this.view.listOfData = this.ui.generateTable(data,  this.view.listOfData, this.model.ageGroup, this.model.vaccineType, this.model.vaccineFee, this.model.availability);
      console.log(this.view.listOfData)
    });

    //this.refreshData()

  }
  /**
   *
   */
  sendOtp(){
    this.view.showLoader = true;
    this.view.loaderText = "Enter OTP ... "
    this.view.disableMobile = true;
    this.view.disableOtp = false;
    this.api.getOtp(this.model.mobile).subscribe(data => {
      this.model.txnId = data['txnId'];
      localStorage.setItem("mobile",this.model.mobile)
    })
  }
  /**
   *
   */
  validateOtp(){
    this.api.getHash(this.model.otp)
      .then(hashedOtp => {
        this.api.validateOtp(hashedOtp, this.model.txnId).subscribe(data => {
          localStorage.setItem("token", data['token']);
          this.beneficiary();
          this.view.showLoader = false;
          this.view.loaderText = ""
        })
      });
  }
  /**
   *
   */
  cancelLogin(){
    this.view.showCancel = false;
    this.view.disableMobile = false;
    this.view.disableOtp = true;
    localStorage.clear()
  }
  /**
   *
   */
  stopRefresh(){
    this.view.isRefresh = false;
  }
  changeBeneficiiary(ben:any){
    for (let entry of this.model.benificiaryList) {
      console.log( this.model.benificiaryList)
    }
  }
}

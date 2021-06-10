import { UiHelperService } from './ui-helper.service';
import { Component, OnInit } from '@angular/core';
import { CowinService } from './cowin.service';
import {HelperService} from './helper.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'cowin-angular';
  selectedState = ""
  selectedDistrict = ""
  stateList = [];
  districtData = [];
  vaccineType = "COVAXIN";
  ageGroup = "18";
  vaccineFee = "Any";
  dose = "dose2";
  date = new Date();
  listOfData = [];
  benificiaryList = [];
  selectedbeneficiary = []
  mobile = ""
  otp = ''
  txnId = ''
  showCancel = false;
  disableMobile = false;
  disableOtp = true;
  refreshTime  = 5
  isRefresh = false;
  showLoader = false;
  loaderText = "";

  constructor(  private api:CowinService, private helper:HelperService, private ui:UiHelperService) {

   }
   /**
    *
    */
   loadDefautltData(){
     let mobile = localStorage.getItem("mobile")
     if (mobile){
      this.mobile = mobile;
     }

     if(localStorage.getItem("vaccineType")){
        this.vaccineType = localStorage.getItem("vaccineType")
      }

     if(localStorage.getItem("ageGroup"))
        this.ageGroup = localStorage.getItem("ageGroup")

      if(localStorage.getItem("dose"))
        this.dose = localStorage.getItem("dose")
   }
  /**
   *
   */
  ngOnInit() {

    this.api.getStates()
    .subscribe(data => {
      localStorage.setItem("states", data);
      this.stateList =  data['states'];
      if(localStorage.getItem("selectedState")){
        this.selectedState = localStorage.getItem("selectedState")
      }
      if(localStorage.getItem("token")){
        this.beneficiary()
      }
    })
    this.vaccineType ="COVAXIN"
    this.loadDefautltData()
  }
  /**
   *
   * @param value
   */
  onChangeState(): void{
    this.districtData = [];
    this.api.getDistricts(this.selectedState).subscribe(data => {
      localStorage.setItem("districts",data);
      this.districtData = data['districts'];
      if(localStorage.getItem("selectedState")){
        this.selectedDistrict = localStorage.getItem("selectedState")
      }
      localStorage.setItem("selectedState",this.selectedState);
    })
  }
  /**
   *
   * @param value
   */
  getDistrictsSessions(value:string){
    this.api.getDistrictData(value, this.helper.getMMDDYYYY_calendar(this.date)).subscribe(data => {
      this.listOfData = [];
      //this.ui.generateTable(data,  this.listOfData, this.ageGroup);
    })

  }
  /**
   *
   */
  refreshData() {
    localStorage.setItem("selectedDistrict",this.selectedDistrict);
     setInterval(() => {
        console.log('setTimeOut');
        if (this.isRefresh)
          this.getHospitalData()
    }, this.refreshTime * 1000);
  }
  /**
   *
   */
  setData(){
    localStorage.setItem("vaccineType",this.vaccineType)
    localStorage.setItem("ageGroup", this.ageGroup)
    localStorage.setItem("dose", this.dose)
  }
  /** */
  beneficiary(){
    this.benificiaryList = [];
    this.api.benificary().subscribe(data => {


        let benificaries = data['beneficiaries']
        for (let i=0;i < benificaries.length ;i++){
          benificaries[i]['enable'] = true;
        }
        this.benificiaryList =  benificaries;

    })
  }

  /**
   *
   * @param value
   */
  getHospitalData(): void{
    this.setData()
    if (this.selectedState == '' && this.selectedDistrict == '') return;
    this.isRefresh =true;
    this.api.getDistrictData(this.selectedDistrict, this.helper.getMMDDYYYY_calendar(this.date)).subscribe(data => {
      localStorage.setItem("selectedDistrict", this.selectedDistrict)
      this.listOfData = this.ui.generateTable(data,  this.listOfData, this.ageGroup, this.vaccineType, this.vaccineFee);
    });

    //this.refreshData()

  }
  /**
   *
   */
  sendOtp(){
    this.showLoader = true;
    this.loaderText = "Enter OTP ... "
    this.disableMobile = true;
    this.disableOtp = false;
    this.api.getOtp(this.mobile).subscribe(data => {
      this.txnId = data['txnId'];
      localStorage.setItem("mobile",this.mobile)
    })
  }
  /**
   *
   */
  validateOtp(){
    this.api.getHash(this.otp)
      .then(hashedOtp => {
        this.api.validateOtp(hashedOtp, this.txnId).subscribe(data => {
          localStorage.setItem("token", data['token']);
          this.beneficiary();
          this.showLoader = false;
          this.loaderText = ""
        })
      });
  }
  /**
   *
   */
  cancelLogin(){
    this.showCancel = false;
    this.disableMobile = false;
    this.disableOtp = true;
    localStorage.clear()
  }
  /**
   *
   */
  stopRefresh(){
    this.isRefresh = false;
  }
  changeBeneficiiary(ben:any){
    for (let entry of this.benificiaryList) {
      console.log( this.benificiaryList)
    }
  }
}

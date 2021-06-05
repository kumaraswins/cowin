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
  vaccineFee = "Free";
  dose = "dose1";
  date = new Date();
  listOfData = []
  mobile = ""
  otp = ''
  txnId = ''
  showCancel = false;
  disableMobile = false;
  disableOtp = true;
  refreshTime  = 5 //seconds
  isRefresh = false;

  constructor(  private api:CowinService, private helper:HelperService, private ui:UiHelperService) {

   }
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
      this.stateList =  data['states'];
      if(localStorage.getItem("selectedState")){
        console.log()
        this.selectedState = localStorage.getItem("selectedState")
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
      this.districtData = data['districts'];
      if(localStorage.getItem("selectedState")){
        this.selectedDistrict = localStorage.getItem("selected")
      }
      localStorage.setItem("selectedState",this.selectedState);
    })
  }

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
  /**
   *
   * @param value
   */
  getHospitalData(): void{
    this.setData()
    if (this.selectedState == '' && this.selectedDistrict == '') return;
    this.isRefresh =true;
    this.api.getDistrictData(this.selectedDistrict, this.helper.getMMDDYYYY_calendar(this.date)).subscribe(data => {
      this.listOfData = this.ui.generateTable(data,  this.listOfData, this.ageGroup, this.vaccineType, this.vaccineFee);
    });
    //this.refreshData()

  }
  sendOtp(){
    this.disableMobile = true;
    this.disableOtp = false;
    this.api.getOtp(this.mobile).subscribe(data => {
      this.txnId = data['txnId'];
      localStorage.setItem("mobile",this.mobile)
    })
  }

  validateOtp(){
    this.api.getHash(this.otp)
      .then(hash => {
        this.api.validateOtp(hash, this.txnId).subscribe(data => {
          localStorage.setItem("token", data['token']);
        })
      });
  }
  cancelLogin(){
    this.showCancel = false;
    this.disableMobile = false;
    this.disableOtp = true;
    localStorage.clear()
  }
  stopRefresh(){
    this.isRefresh = false;
  }
}

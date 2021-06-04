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

  constructor(  private api:CowinService, private helper:HelperService, private ui:UiHelperService) {
    //this.date = new Date();
   }
  /**
   *
   */
  ngOnInit() {
    this.api.getStates()
    .subscribe(data => {
      this.stateList =  data['states']
    })
    this.vaccineType ="COVAXIN"
    //this.date = new Date();
  }
  /**
   *
   * @param value
   */
  onChangeState(value:string): void{
    this.districtData = [];
    this.api.getDistricts(this.selectedState).subscribe(data => {
      this.districtData = data['districts']
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
     setInterval(() => {
        console.log('setTimeOut');
        this.getHospitalData()
    }, this.refreshTime * 1000);
  }

  /**
   *
   * @param value
   */
  getHospitalData(): void{
    if (this.selectedState == '' && this.selectedDistrict == '') return;
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
    })
  }

  validateOtp(){

    this.api.validateOtp(this.otp, this.txnId).subscribe(data => {
      localStorage.setItem("token", data['token']);
    })
  }
  cancelLogin(){
    localStorage.clear()
  }
}

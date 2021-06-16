
import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-toasts',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})

export class ToastComponent implements OnInit{

  @Input() listOfData?: any;

  constructor() {
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

}

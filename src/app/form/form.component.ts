import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from './hero';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  favoriteColorControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

  powers = ['','Really Smart', 'Super Flexible',
  'Super Hot', 'Weather Changer'];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  submitted = false;

  onSubmit() { this.submitted = true; }

}

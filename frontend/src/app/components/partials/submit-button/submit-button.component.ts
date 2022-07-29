import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent implements OnInit {
@Input() type:'submit' | 'button' = 'submit';
@Input() text:string = 'Submit';
@Input() bgColor= 'white';
@Input() color='black';
@Input() fontsizeRem = 1.3;
@Input() widthrem = 8;
@Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
@Input() message = "Nothing found";
@Input() visible = false;
@Input()  resetLinktext = "reset";
@Input()  resetLink = "/";
  constructor() { }

  ngOnInit(): void {
  }

}

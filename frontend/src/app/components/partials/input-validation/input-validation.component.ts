import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
const VALIDATORS_MESSAGES: any = {
  required: 'This field is required',
  email: 'This field must be a valid email',
};

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css'],
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input() control!: AbstractControl;
  @Input() showErrorswhen: boolean = false;
  @Input() errorMessage: string[] = [];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.checkvalidation();
  }

  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkvalidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkvalidation();
    });
  }
  checkvalidation() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessage = [];
      return;
    }
    const errorKeys = Object.keys(errors);
    this.errorMessage = errorKeys.map(key =>
      this.errorMessage = VALIDATORS_MESSAGES[key]);
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';

import { selectState } from '../../../../../../../shared/data/form-control';

@Component({
  selector: 'app-personal-info',
  imports: [CommonModule, Select2Module, FormsModule, ReactiveFormsModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})

export class PersonalInfoComponent {

  @Input() active: number;
  @Output() changeTab = new EventEmitter<number>();

  public selectState = selectState;
  public validate: boolean = false;

  public formValidation = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    state: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    agree: new FormControl('', Validators.required),
  });
  
  next() {
    this.validate = true;
    this.formValidation.markAllAsTouched();
    if (this.formValidation.valid) {
      this.active = this.active + 1;
      this.changeTab.emit(this.active);
    }
  }

}

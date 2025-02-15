import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-filter-product',
  standalone: true,
  imports: [NgSelectModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './filter-product.component.html',
  styleUrl: './filter-product.component.scss'
})
export class FilterProductComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder){
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      destinations: [[]],
      travelMonth: [[]],
      // noOfAdults: [[]],
      planningStage: [[]],
    });
  }
}

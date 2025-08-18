import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

import { SvgIconComponent } from "../../../shared/components/ui/svg-icon/svg-icon.component";
import { CompaniesFilterComponent } from "./companies-filter/companies-filter.component";
import { companyDetails } from '../../../shared/data/jobs/companies';

@Component({
  selector: 'app-companies',
  imports: [CommonModule,RouterModule, NgbRatingModule, 
    CompaniesFilterComponent, SvgIconComponent],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})

export class CompaniesComponent {

  public companyDetails = companyDetails;

  constructor(public config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }

}

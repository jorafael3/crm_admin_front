import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CompanyInfoComponent } from './widgets/company-info/company-info.component';
import { CompanyOverviewComponent } from './widgets/company-overview/company-overview.component';
import { FinancialInfoComponent } from './widgets/financial-info/financial-info.component';
import { FinishComponent } from './widgets/finish/finish.component';
import { PersonalInfoComponent } from './widgets/personal-info/personal-info.component';
import { addSeller } from '../../../shared/data/seller';

@Component({
  selector: 'app-create-store-modal',
  imports: [CommonModule, PersonalInfoComponent,CompanyInfoComponent,CompanyOverviewComponent,FinancialInfoComponent,FinishComponent],
  templateUrl: './create-store-modal.component.html',
  styleUrl: './create-store-modal.component.scss'
})

export class CreateStoreModalComponent {
  
  @ViewChild("createStoreModal", { static: false }) CreateStoreModal: TemplateRef<string>;

  public addSeller = addSeller;
  public activeTab: number = 1;
  public closeResult: string;
  public modalOpen: boolean = false;

  constructor(private modalService: NgbModal) { }

  async openModal() {
    this.modalOpen = true;
    this.modalService.open(this.CreateStoreModal, {
      ariaLabelledBy: 'store-Modal',
      centered: true,
      size: 'xl',
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  handleStep(value: number) {
    if(value == -1) {
      this.activeTab = this.activeTab - 1;
    } else if(value == 1 && this.activeTab < this.addSeller.length) {
      this.activeTab = this.activeTab + 1;
    }
    
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

}

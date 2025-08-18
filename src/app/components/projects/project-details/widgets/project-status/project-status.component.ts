import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { CardDropdownButtonComponent } from "../../../../../shared/components/ui/card/card-dropdown-button/card-dropdown-button.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { projectDetails, projectStatus, projectStatusOptions } from '../../../../../shared/data/project';
import { ChatService } from '../../../../../shared/services/chat.service';

@Component({
  selector: 'app-project-status',
  imports: [CommonModule, NgbTooltipModule, FeatherIconComponent, CardDropdownButtonComponent, SvgIconComponent],
  templateUrl: './project-status.component.html',
  styleUrl: './project-status.component.scss'
})

export class ProjectStatusComponent {

  public projectStatus = projectStatus;
  public projectStatusOptions = projectStatusOptions;
  public projects = projectDetails.project_status;

  constructor(public chatService: ChatService) {}
  
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { colorsTwo } from '../../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-link-light-theme',
  imports: [CommonModule, NgbAlertModule, CardComponent],
  templateUrl: './link-light-theme.component.html',
  styleUrl: './link-light-theme.component.scss'
})

export class LinkLightThemeComponent {

  public colors = colorsTwo;

}

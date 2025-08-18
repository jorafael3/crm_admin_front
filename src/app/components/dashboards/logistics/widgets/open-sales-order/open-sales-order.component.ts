import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { openSalesOrder } from '../../../../../shared/data/dashboard/logistics';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-open-sales-order',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './open-sales-order.component.html',
  styleUrl: './open-sales-order.component.scss'
})

export class OpenSalesOrderComponent {

  public cardToggleOption = cardToggleOptions3;
  public openSalesOrder = openSalesOrder;

}

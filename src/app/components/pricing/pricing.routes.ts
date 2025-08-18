import { Routes } from '@angular/router';

import { PricingComponent } from './pricing.component';

export const pricing: Routes = [
    {
        path: '',
        component: PricingComponent,
        data: {
            breadcrumb: 'Pricing'
        },
    }
];
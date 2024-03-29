import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent,
        children: [
          { path: '', redirectTo: 'products', pathMatch: 'full' },
          {
            path: 'products',
            component: ProductsComponent,
            title: 'Admin Products | Nutripedia',
          },
          {
            path: 'suggestions',
            component: SuggestionsComponent,
            title: 'Admin Suggestions | Nutripedia',
          },
        ],
      },
    ]),
  ],
})
export class AdminModule {}

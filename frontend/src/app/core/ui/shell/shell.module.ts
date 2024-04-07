import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';
import { CommunityComponent } from '../../../pages/community/community.component';
import { ProfileComponent } from '../../../pages/profile/profile.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./../../../pages/products/products.module').then(
                (m) => m.ProductsModule
              ),
          },
          {
            path: 'blog',
            loadChildren: () =>
              import('./../../../pages/blog/blog.module').then(
                (m) => m.BlogModule
              ),
          },
          {
            path: 'product/:id',
            loadChildren: () =>
              import('./../../../pages/product/product.module').then(
                (m) => m.ProductModule
              ),
          },
          {
            path: 'group/:groupId',
            component: CommunityComponent,
          },
          {
            path: 'profile/:userId',
            component: ProfileComponent,
          },
          {
            path: 'my-activity',
            loadChildren: () =>
              import('./../../../pages/my-activity/my-activity.module').then(
                (m) => m.MyActivityModule
              ),
          },
          {
            path: 'user',
            loadChildren: () =>
              import('./../../../pages/user/user.module').then(
                (m) => m.UserModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class ShellModule {}

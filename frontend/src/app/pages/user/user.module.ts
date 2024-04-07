import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { SettingsComponent } from './settings/settings.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProductsComponent } from './products/products.component';
import { ChatComponent } from './chat/chat.component';
import { FriendsComponent } from './friends/friends.component';
import { CommunitiesComponent } from './communities/communities.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent,
        children: [
          { path: '', redirectTo: 'products', pathMatch: 'full' },
          {
            path: 'friends',
            component: FriendsComponent,
            title: 'User Friends | Nutripedia',
          },
          {
            path: 'groups',
            component: CommunitiesComponent,
            title: 'User Groups | Nutripedia',
          },
          {
            path: 'settings',
            component: SettingsComponent,
            title: 'User Settings | Nutripedia',
          },
          {
            path: 'suggestions',
            component: SuggestionsComponent,
            title: 'User Suggestions | Nutripedia',
          },
          {
            path: 'notifications',
            component: NotificationsComponent,
            title: 'User Notifications | Nutripedia',
          },
          {
            path: 'products',
            component: ProductsComponent,
            title: 'User Products | Nutripedia',
          },
          {
            path: 'assistent',
            component: ChatComponent,
            title: 'AI Chat | Nutripedia',
          },
        ],
      },
    ]),
  ],
})
export class UserModule {}

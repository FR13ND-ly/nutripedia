import { Component } from '@angular/core';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-activity',
  standalone: true,
  imports: [SidebarComponent, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './my-activity.component.html',
  styleUrl: './my-activity.component.scss',
})
export class MyActivityComponent {}

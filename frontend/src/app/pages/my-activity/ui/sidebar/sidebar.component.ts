import { Component } from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'activity-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}

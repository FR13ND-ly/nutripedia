import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../../core/feature/material/material.module';

@Component({
  selector: 'days',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './days.component.html',
  styleUrl: './days.component.scss',
})
export class DaysComponent {
  @Input() days: any;
  @Input() selectedIndex: any;
  @Output() selectDay = new EventEmitter();

  onSelect(index: any) {
    this.selectDay.emit(index);
  }
}

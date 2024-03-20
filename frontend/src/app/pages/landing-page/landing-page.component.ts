import { Component } from '@angular/core';
import { HeaderComponent } from './ui/header/header.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  bg =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHPu4nqUj0FViuYvmGrT1O1hs74m9d_JGCY7r9F_1X0GjE4xx4UsIQiKc3GGao9mgO5Ds&usqp=CAU';
}

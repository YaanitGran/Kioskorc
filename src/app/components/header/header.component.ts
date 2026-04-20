import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonTitle],
})
export class HeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

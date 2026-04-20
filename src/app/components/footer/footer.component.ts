import { Component, OnInit } from '@angular/core';
import { IonFooter, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoFacebook, logoTwitter, logoInstagram } from 'ionicons/icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonFooter, IonToolbar, IonButton, IonIcon],
})
export class FooterComponent  implements OnInit {

  constructor() { 
    addIcons({ logoFacebook, logoTwitter, logoInstagram });
  }

  ngOnInit() {}

}

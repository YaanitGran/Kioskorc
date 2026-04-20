import { Component } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonSearchbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent
 } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  documentTextOutline, 
  folderOpenOutline, 
  locationOutline 
} from 'ionicons/icons';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonSearchbar,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class HomePage {
  constructor() {
    addIcons({documentTextOutline,folderOpenOutline,locationOutline,});
  }
  /**
   * @param procedure Type of civil registry procedure selected by the user.
   */
  abrirTramite(procedure: string) {
    console.log('Opening procedure:', procedure);
    // Logic for navigation or opening a modal with requirements will go here
  }
 /**
   * Navigation handler to switch between components/views
   * @param view The name of the target view
   */
  navigateTo(view: string) {
    console.log('Navigating to:', view);
    // Logic to switch components will go here
  }
}

import { Component } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonSearchbar,
  IonLabel,
  IonItem,
  IonList,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonButton,
  IonCard,
 } from '@ionic/angular/standalone';
 import { addIcons } from 'ionicons';
import { 
  heartOutline, 
  ribbonOutline, 
  business, 
  time, 
  searchOutline, personAddOutline } from 'ionicons/icons';

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
    IonLabel,
    IonItem,
    IonList,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonButton,
    IonCard,
  ],
})
export class HomePage {
  constructor() {
    addIcons({personAddOutline,heartOutline,ribbonOutline,business,time,searchOutline});
  }
  /**
   * @param procedure Type of civil registry procedure selected by the user.
   */
  abrirTramite(procedure: string) {
    console.log('Opening procedure:', procedure);
    // Logic for navigation or opening a modal with requirements will go here
  }
  /**
   * Filters the procedures based on user input in the search bar.
   * Implementation for the "Intelligent Search Engine" defined in the backlog.
   * @param event CustomEvent from ion-searchbar
   */
  buscarTramite(event: any) {
    const query = event.target.value.toLowerCase();
    console.log('Filtering procedures for:', query);
    // Logic to filter the list of procedures dynamically
  }
}

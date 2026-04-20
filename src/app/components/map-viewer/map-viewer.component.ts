import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonGrid, IonRow, IonCol, IonList, IonItem, 
  IonLabel, IonIcon, IonButton, IonNote 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mapOutline, arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-map-viewer',
  standalone: true,
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss'],
  imports: [
    CommonModule,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonNote,
  ],
})
export class MapViewerComponent  implements OnInit {
  @Output() onBack = new EventEmitter<void>();

  selectedOffice: any = null;

  // Static data for offices (this will come from MySQL later)
  offices = [
    { id: 1, name: 'Juzgado 01', address: 'Arcos de Belén 19, Centro', hours: '08:00 - 15:00' },
    { id: 2, name: 'Juzgado 19', address: 'Calz. de Tlalpan 2508', hours: '08:00 - 15:00' },
    { id: 3, name: 'Sede Central', address: 'Plaza de la Constitución S/N', hours: '09:00 - 18:00' }
  ];

  constructor() { 
    addIcons({ mapOutline, arrowBackOutline });
  }

  selectOffice(office: any) {
    this.selectedOffice = office;
  }

  goBack() {
    this.onBack.emit();
  }

  ngOnInit() {}

}

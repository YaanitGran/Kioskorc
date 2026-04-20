import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonGrid, IonRow, IonCol, IonList, IonItem, 
  IonLabel, IonIcon, IonButton 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  listOutline, footstepsOutline, checkmarkCircleOutline, 
  qrCodeOutline, arrowBackOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-info-display',
  templateUrl: './info-display.component.html',
  styleUrls: ['./info-display.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonGrid, IonRow, IonCol, IonList, IonItem, 
    IonLabel, IonIcon, IonButton
  ],
})
export class InfoDisplayComponent  implements OnInit {
  @Input() data: any;
  @Output() onBack = new EventEmitter<void>();

  constructor() {
    addIcons({ 
      listOutline, footstepsOutline, checkmarkCircleOutline, 
      qrCodeOutline, arrowBackOutline 
    });
   }

  goBack() {
    this.onBack.emit();
  }

  ngOnInit() {}

}

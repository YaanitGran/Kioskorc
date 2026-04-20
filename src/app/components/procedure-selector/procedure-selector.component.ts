import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
  IonIcon, IonButton 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  documentTextOutline, bookOutline, personOutline, 
  heartOutline, ribbonOutline, arrowBackOutline, closeOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-procedure-selector',
  standalone: true,
  templateUrl: './procedure-selector.component.html',
  styleUrls: ['./procedure-selector.component.scss'],
  imports: [
    CommonModule, 
    IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
    IonIcon, IonButton
  ],
})
export class ProcedureSelectorComponent  implements OnInit {
  @Input() title: string = '';
  @Input() options: any[] = [];
  @Output() onSelect = new EventEmitter<any>();
  @Output() onBack = new EventEmitter<void>();

  constructor() {
    addIcons({ 
      documentTextOutline, bookOutline, personOutline, 
      heartOutline, ribbonOutline, arrowBackOutline, closeOutline 
    });
  }
  
  selectOption(option: any) {
    this.onSelect.emit(option);
  }

  goBack() {
    this.onBack.emit();
  }

  ngOnInit() {}

}

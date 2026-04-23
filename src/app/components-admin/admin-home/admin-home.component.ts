import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  documentTextOutline, locationOutline, hardwareChipOutline, 
  helpCircleOutline, arrowBackOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AdminHomeComponent implements OnInit {

  /** Emits the selected category to the parent component */
  @Output() onOptionSelected = new EventEmitter<string>();
  
  /** Emits the logout event to return to the login screen */
  @Output() onLogout = new EventEmitter<void>();

  constructor() {
    /** Initialize icons used in the template */
    addIcons({ 
      documentTextOutline, 
      locationOutline, 
      hardwareChipOutline, 
      helpCircleOutline, 
      arrowBackOutline 
    });
  }

  ngOnInit() {}

  /** Triggers the logout event */
  logout() {
    this.onLogout.emit();
  }

  /**
   * Notifies the parent which administrative category was selected.
   * @param category The category identifier (e.g., 'tramites', 'juzgados')
   */
  selectAction(category: string) {
    console.log('Selected Category:', category);
    this.onOptionSelected.emit(category);
  }
}
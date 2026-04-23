import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, addOutline, createOutline, 
  trashOutline, searchOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ListComponent implements OnInit {
  /** Category received from AdminHome */
  @Input() category: string = '';
  
  /** Return to the dashboard */
  @Output() onBack = new EventEmitter<void>();
  
  /** Trigger Add/Edit/Delete actions */
  @Output() onAction = new EventEmitter<{type: string, data?: any}>();

  title: string = '';
  headers: string[] = [];
  items: any[] = [];
  filteredItems: any[] = [];

  constructor() {
    addIcons({ arrowBackOutline, addOutline, createOutline, trashOutline, searchOutline });
  }

  ngOnInit() {
    this.loadData();
  }

  /**
   * Mock data loader based on category
   */
  loadData() {
    switch (this.category) {
      case 'tramites':
        this.title = 'Gestión de Trámites';
        this.headers = ['ID', 'Nombre', 'Costo', 'Acciones'];
        this.items = [
          { id: 1, col1: 'Acta de Nacimiento', col2: '$50.00' },
          { id: 2, col1: 'Acta de Matrimonio', col2: '$120.00' }
        ];
        break;
      case 'juzgados':
        this.title = 'Gestión de Juzgados';
        this.headers = ['ID', 'Nombre / Ubicación', 'Alcaldía', 'Acciones'];
        this.items = [
          { id: 101, col1: 'Juzgado 01', col2: 'Cuauhtémoc' },
          { id: 102, col1: 'Juzgado 15', col2: 'Iztapalapa' }
        ];
        break;
      default:
        this.title = 'Gestión de Registros';
        this.headers = ['ID', 'Dato 1', 'Dato 2', 'Acciones'];
        this.items = [];
    }
    this.filteredItems = [...this.items];
  }

  /**
   * This is the function that was missing!
   * Filters the table as you type in the search bar.
   */
  handleSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredItems = this.items.filter(item => 
      item.col1.toLowerCase().includes(query) || 
      item.id.toString().toLowerCase().includes(query)
    );
  }

  performAction(type: string, data?: any) {
    this.onAction.emit({ type, data });
  }

  goBack() {
    this.onBack.emit();
  }
}
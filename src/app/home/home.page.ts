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
  documentTextOutline, folderOpenOutline, locationOutline, 
  personOutline, heartOutline, ribbonOutline, bookOutline 
} from 'ionicons/icons';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ProcedureSelectorComponent } from '../components/procedure-selector/procedure-selector.component';
import { MapViewerComponent } from '../components/map-viewer/map-viewer.component';
import { InfoDisplayComponent } from '../components/info-display/info-display.component';


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
    ProcedureSelectorComponent,
    MapViewerComponent,
    InfoDisplayComponent,
  ],
})
export class HomePage {

  viewState: string = 'main';
  
  /** * Properties to pass data to the procedure-selector component */
  selectorTitle: string = '';
  currentOptions: any[] = [];

  constructor() {
    addIcons({documentTextOutline,folderOpenOutline,locationOutline, personOutline,heartOutline,ribbonOutline,bookOutline});
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
    if (view === 'certified-copy') {
      this.selectorTitle = 'Solicite su Acta Certificada';
      this.currentOptions = [
        { 
          id: 1, 
          label: 'Extracto de Acta', 
          description: 'Copia rápida con datos esenciales del registro.', 
          icon: 'document-text-outline', 
          color: '#3b5998' 
        },
        { 
          id: 2, 
          label: 'Copia del Libro', 
          description: 'Imagen fiel y completa del acta original.', 
          icon: 'book-outline', 
          color: '#3b5998' 
        }
      ];
      this.viewState = 'selector';
    } 
    else if (view === 'procedures') {
      this.selectorTitle = 'Catálogo de Trámites';
      this.currentOptions = [
        { 
          id: 10, 
          label: 'Nacimiento', 
          description: 'Requisitos para registro y actas de nacimiento.', 
          icon: 'person-outline', 
          color: '#2d5a4c' 
        },
        { 
          id: 11, 
          label: 'Matrimonio', 
          description: 'Información para celebrar matrimonios civiles.', 
          icon: 'heart-outline', 
          color: '#2d5a4c' 
        },
        { 
          id: 12, 
          label: 'Defunción', 
          description: 'Guía y documentos para actas de defunción.', 
          icon: 'ribbon-outline', 
          color: '#2d5a4c' 
        }
      ];
      this.viewState = 'selector';
    }
    else if (view === 'locations') {
      this.viewState = 'locations';
    }
  }

  handleBack() {
    this.viewState = 'main';
  }

  /**
   * Logic to handle when a specific procedure is clicked in the selector
   * @param option The selected procedure object
   */
  handleOptionSelected(option: any) {
    const details = this.proceduresDatabase[option.label];
  
  if (details) {
    this.selectedProcedureData = details;
    this.viewState = 'info';
  } else {
    // Fallback if no specific data is found yet
    this.selectedProcedureData = {
      title: option.label,
      requirements: ['Cargando requisitos legales...'],
      steps: ['Paso 1: Acudir a ventanilla.'],
      cost: option.cost || 0
    };
    this.viewState = 'info';
  }
  }

  // Add this property to your HomePage class
selectedProcedureData: any = null;

// Mock database for specific procedure details
proceduresDatabase: any = {
  'Extracto de Acta': {
    title: 'REQUISITOS Y PASOS PARA EL EXTRACTO DE ACTA',
    requirements: [
      'Identificación oficial vigente.',
      'CURP (si está disponible).',
      'Datos de la persona (Nombre, fecha de nacimiento, lugar de registro).'
    ],
    steps: [
      'Acuda al Kiosko.',
      'Seleccione "Solicite acta certificada".',
      'Elija "Extracto de Acta".',
      'Proporcione datos de Identificación.',
      'Realice el pago.',
      'Imprima el extracto.'
    ],
    cost: 90.00
  },
  'Nacimiento': {
    title: 'REQUISITOS PARA REGISTRO DE NACIMIENTO',
    requirements: [
      'Certificado de nacimiento emitido por el hospital.',
      'Identificación oficial de los padres.',
      'Acta de matrimonio (si aplica).',
      'Dos testigos con identificación.'
    ],
    steps: [
      'Presentarse con el menor en el juzgado.',
      'Entregar documentación completa.',
      'Firma de documentos y toma de huellas.',
      'Recepción de la primera copia certificada gratuita.'
    ],
    cost: 0.00 // Generalmente el primer registro es gratuito
  }
};
}

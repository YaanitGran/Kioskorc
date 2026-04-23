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
import { ProcedureService } from '../services/procedure';

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
  selectorTitle: string = '';
  currentOptions: any[] = [];

  constructor(private procedureService: ProcedureService) {
    addIcons({
      documentTextOutline,
      folderOpenOutline,
      locationOutline, 
      personOutline,
      heartOutline,
      ribbonOutline,
      bookOutline
    });
  }

  navigateTo(view: string) {
    if (view === 'certified-copy') {
      this.selectorTitle = 'Solicite su Acta Certificada';
      this.currentOptions = [
        { id: 1, label: 'Extracto de Acta', description: 'Copia rápida con datos esenciales del registro.', icon: 'document-text-outline', color: '#3b5998' },
        { id: 2, label: 'Copia del Libro', description: 'Imagen fiel y completa del acta original.', icon: 'book-outline', color: '#315dbd' }
      ];
      this.viewState = 'selector';
    } 
    else if (view === 'procedures') {
      this.selectorTitle = 'Catálogo de Trámites';
      this.currentOptions = [
        { id: 10, label: 'Nacimiento', description: 'Requisitos para registro y actas de nacimiento.', icon: 'person-outline', color: '#b9b0b4' },
        { id: 11, label: 'Matrimonio', description: 'Información para celebrar matrimonios civiles.', icon: 'heart-outline', color: '#63b683' },
        { id: 12, label: 'Defunción', description: 'Guía y documentos para actas de defunción.', icon: 'ribbon-outline', color: '#ecc67e' },
        { id: 13, label: 'Divorcio Administrativo', description: 'Guía y documentos para actas de Divorcio.', icon: 'ribbon-outline', color: '#98a1f7' },
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

  handleOptionSelected(option: any) {

    
    if (option.label === 'Extracto de Acta') {
      this.selectorTitle = 'Seleccione modalidad';
      this.currentOptions = [
        { id: 'extracto_online', label: 'En línea', icon: 'document-text-outline' },
        { id: 'extracto_presencial', label: 'Presencial', icon: 'location-outline' }
      ];
      this.viewState = 'selector';
      return;
    }

    if (option.id === 'extracto_online') {
      this.selectedProcedureData = this.proceduresDatabase['Extracto en linea'];
      this.viewState = 'info';
      return;
    }

    if (option.id === 'extracto_presencial') {
      this.selectedProcedureData = this.proceduresDatabase['Extracto presencial'];
      this.viewState = 'info';
      return;
    }

    const details = this.proceduresDatabase[option.label];
  
    if (details) {
      this.selectedProcedureData = details;
      this.viewState = 'info';
    } else {
      this.selectedProcedureData = {
        title: option.label,
        requirements: ['Cargando requisitos legales...'],
        steps: ['Paso 1: Acudir a ventanilla.'],
        cost: option.cost || 0
      };
      this.viewState = 'info';
    }
  }

  selectedProcedureData: any = null;

  proceduresDatabase: any = {

    
    'Extracto en linea': {
      title: 'REQUISITOS Y PASOS PARA EL EXTRACTO DE ACTA EN LÍNEA',
      requirements: [
        'Datos del acta a solicitar (numero de juzgado, número de libro,número de acta, fecha de registro, nombre completo).',
        'CURP del titular del acta.'
      ],
      steps: [
        'Inicia sesión con Llave CDMX Expediente Si no tienes una cuenta, deberás crearla.',
        'Da clic en "Tramita una copia de tu acta".',
        'Selecciona "Acta de Nacimiento, Defunción o Matrimonio".',
        'Si el acta es para ti, confirma tu CURP o captura la CURP del titular del acta.',
        'Confirma que sea el acta que requieres.',
        'Realiza el pago de derechos.',
        'Descarga tu Acta Digital.'
      ],
      cost: 98.00
    },

    'Extracto presencial': {
      title: 'REQUISITOS Y PASOS PARA EL EXTRACTO DE ACTA PRESENCIAL',
      requirements: [
        'Datos del acta a solicitar (numero de juzgado, número de libro,número de acta, fecha de registro, nombre completo).',
        'Pago ya realizado en línea o en cualquier institución bancaria o tiendas de autoservicio (Clave 54) $98.00 cada acta certificada.'
      ],
      steps: [
        
        'Acudir al juzgado al registro civil más cercano o de su preferencia.',
        'Imprimir su línea de captura de pago (PAGO YA REALIZADO EN LINEA O EN CUALQUIER INSTITUCION BANCARIA O TIENDAS DE AUTOSERVICIO). (Clave 54) $98.00 cada acta certificada.',
        'Presentar copia o datos del acta a solicitar.'
      ],
      cost: 98.00
    },

    'Copia del Libro': {
      title: 'REQUISITOS Y PASOS PARA LA COPIA DEL LIBRO',
      requirements: [
        'Imprimir su línea de captura de pago (PAGO YA REALIZADO EN LINEA O EN CUALQUIER INSTITUCION BANCARIA O TIENDAS DE AUTOSERVICIO).',
        '(Clave 54) $98.00 cada acta certificada.',
        'Presentar copia o datos del acta a solicitar.'
      ],
      steps: [
        'Acudir al juzgado de su acta, ejemplo: si acta dice juzgado 5°, solo en ese juzgado podrá tramitar su acta.',
      ],
      cost: 98.00
    },

    'Nacimiento': {
      title: 'REQUISITOS PARA REGISTRO DE NACIMIENTO',
      requirements: [
        'Solicitud de nacimiento.',
        'Certificado de nacimiento en original.',
        'Acta certificada de nacimiento de ambos padres o acta de matrimonio.',
        'En caso de que alguna acta de nacimiento se encuentre en idioma distinto al español, se deberá adjuntar, traducción al español por persona perita autorizada por el Tribunal Superior de Justicia de la Ciudad de México.',
        'Identificación oficial vigente y una copia (Credencial para votar INE o Licencia para conducir o Pasaporte)',
        'CURP de los padres.'
      ],
      steps: [
        'Presentarse con el menor en el juzgado.',
        'El trámite se realiza de manera presencial y deberá acudir al registro civil más cercano o de su preferencia.',
        'Presentar todos los requisitos en original y copia, en buen estado (NO rotos, NO manchados, NO doblados)',
        'Esperar la revisión de los documentos e indicaciones del personal del registro civil.',
        'Si el trámite requiere pago, debe de esperar que el personal le indique que puede realizar el pago.'
      ],
      cost: 'Trámite gratuito.'
    },

    'Matrimonio': {
      title: 'REQUISITOS PARA CELEBRACION DE MATRIMONIO',
      requirements: [
        'Solicitud de matrimonio.',
        'Acta certificada de nacimiento de ambos contrayentes.',
        'En caso de que alguna acta de nacimiento se encuentre en idioma distinto al español, se deberá adjuntar, traducción al español por persona perita autorizada por el Tribunal Superior de Justicia de la Ciudad de México.',
        'Identificación oficial vigente y una copia (Credencial para votar INE o Licencia para conducir o Pasaporte)',
        'Comprobante de domicilio.',
        'Certificado de Registro de Deudores Alimentarios Morosos.',
        'Convenio del Régimen Matrimonial (Facilitado por el Registro Civil).',
        'Curso prenupcial (Impartido por Registro Civil)',
        'Si uno o ambos contrayentes estuvieron previamente casados, deberá presentar acta certificada de matrimonio con anotación de la disolución del vínculo matrimonial.'
      ],
      steps: [
        'El trámite se realiza de manera presencial y deberá acudir al registro civil más cercano o de su preferencia.',
        'Presentar todos los requisitos en original y copia.',
        'Esperar revisión.',
        'Realizar pago cuando se indique.'
      ],
      cost: 'Este costo puede variar según la modalidad elegida'
    },

    'Defunción': {
      title: 'REQUISITOS DEFUNCIÓN',
      requirements: [
        'Solicitud de Defunción.',
        'Certificado Original de Defunción.',
        'Identificación oficial vigente.',
        'Permiso de la Secretaría de Salud si aplica.',
        'Carta poder simple.'
      ],
      steps: [
        'Acudir al registro civil.',
        'Entregar documentación.',
        'Seguir indicaciones.'
      ],
      cost: 'Trámite gratuito.'
    },

    'Divorcio Administrativo': {
      title: 'REQUISITOS DIVORCIO ADMINISTRATIVO',
      requirements: [
        'Solicitud de Divorcio Administrativo.',
        'Identificación oficial vigente.',
        'Copia certificada de matrimonio.',
        'Documentación de hijos si aplica.',
        'Convenio de bienes si aplica.'
      ],
      steps: [
        'Acudir al registro civil.',
        'Entregar documentos.',
        'Comparecencia.'
      ],
      cost: 1652.00
    }
  };
}
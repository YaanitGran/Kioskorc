import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { 
  IonGrid, IonRow, IonCol, IonItem, 
  IonLabel, IonIcon, IonButton, IonNote,
  IonSelect, IonSelectOption // 1. Nuevas importaciones para el menú
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mapOutline, arrowBackOutline, funnelOutline } from 'ionicons/icons'; // Icono de filtro
import * as L from 'leaflet';

const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map-viewer',
  standalone: true,
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss'],
  imports: [
    CommonModule, IonGrid, IonRow, IonCol, IonItem,
    IonLabel, IonIcon, IonButton, IonNote,
    IonSelect, IonSelectOption // ¡Se deben agregar aquí también!
  ],
})
export class MapViewerComponent implements OnInit {
  @Output() onBack = new EventEmitter<void>();

  selectedOffice: any = null;
  mapa: any;
  capaMarcadores: any; // Agrupador de Leaflet para poder borrar pines fácilmente

  // Nuevas variables para el funcionamiento del filtro
  todasLasOffices: any[] = []; 
  offices: any[] = []; 
  listaAlcaldias: string[] = []; 

  constructor(private http: HttpClient) { 
    addIcons({ mapOutline, arrowBackOutline, funnelOutline });
  }

  ngOnInit() {
    this.iniciarMapa();
    this.obtenerJuzgadosDesdeBD();
  }

  obtenerJuzgadosDesdeBD() {
    this.http.get('http://localhost:3000/api/juzgados').subscribe((datos: any) => {
      this.todasLasOffices = datos;
      this.offices = [...this.todasLasOffices]; // Al inicio, mostramos todos
      
      // 2. Extraemos las Alcaldías únicas para llenar el menú desplegable
      const alcaldiasSet = new Set(datos.map((j: any) => j.alcaldia));
      this.listaAlcaldias = Array.from(alcaldiasSet).sort() as string[];

      this.dibujarPines();
    });
  }

  // 3. Función que se ejecuta al seleccionar una alcaldía
  filtrarPorAlcaldia(event: any) {
    const alcaldiaSeleccionada = event.detail.value;
    
    if (alcaldiaSeleccionada === 'Todas') {
      this.offices = [...this.todasLasOffices]; // Restauramos la lista completa
    } else {
      this.offices = this.todasLasOffices.filter(o => o.alcaldia === alcaldiaSeleccionada);
    }
    
    this.selectedOffice = null; // Limpiamos la selección si había alguna
    this.dibujarPines(); // Redibujamos el mapa solo con los filtrados
  }

  dibujarPines() {
    // Borramos los pines anteriores para que no se encimen
    if (this.capaMarcadores) {
      this.capaMarcadores.clearLayers();
    }

    // Dibujamos los pines de la lista ACTUAL
    this.offices.forEach((office: any) => {
      if (office.latitud && office.latitud !== "0.00000000") {
        const pin = L.marker([office.latitud, office.longitud]).addTo(this.capaMarcadores);
        pin.bindPopup(`<b>${office.nombre}</b><br>${office.alcaldia}`);
        
        pin.on('click', () => {
          this.selectOffice(office);
        });
      }
    });
  }

  iniciarMapa() {
    if (this.mapa !== undefined && this.mapa !== null) {
      this.mapa.remove();
    }

    this.mapa = L.map('mapId').setView([19.4271, -99.1491], 11);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    // Inicializamos la capa donde vivirán nuestros pines
    this.capaMarcadores = L.layerGroup().addTo(this.mapa);

    setTimeout(() => {
      this.mapa.invalidateSize();
    }, 500);
  }

  selectOffice(office: any) {
    this.selectedOffice = office;
    if (office.latitud && office.latitud !== "0.00000000") {
      this.mapa.flyTo([office.latitud, office.longitud], 16);
    }
  }

  goBack() {
    this.onBack.emit();
  }
}

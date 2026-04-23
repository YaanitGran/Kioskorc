import { Injectable } from '@angular/core';
import { Procedure } from '../models/procedure.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProcedureService {
  private procedures: Procedure[] = [
    {
      id: 1,
      label: 'Extracto de Acta',
      title: 'EXTRACTO DE ACTA CERTIFICADA',
      description: 'Copia rápida con datos esenciales.',
      icon: 'document-text-outline',
      color: '#3b5998',
      requirements: ['Identificación oficial', 'CURP', 'Datos del acta'],
      steps: ['Seleccionar', 'Ingresar datos', 'Pagar', 'Imprimir'],
      cost: 90,
      category: 'acta'
    },
    {
      id: 11,
      label: 'Matrimonio',
      title: 'REQUISITOS PARA MATRIMONIO CIVIL',
      description: 'Información para celebrar matrimonios.',
      icon: 'heart-outline',
      color: '#2d5a4c',
      requirements: ['Solicitud llenada', 'Actas de nacimiento', 'Identificaciones', 'Certificados médicos'],
      steps: ['Presentar documentos', 'Agendar cita', 'Pagar derechos', 'Celebración'],
      cost: 1530,
      category: 'tramite'
    }
  ];
  constructor(private http: HttpClient) { }

  getProcedures(): Observable<Procedure[]> {
    // Cuando el backend esté listo, esto será: return this.http.get<Procedure[]>('url_api');
    const mockData: Procedure[] = [
      /* Tus datos de Matrimonio, etc. */
    ];
    return of(mockData);
  }

  /** * Gets all procedures by category */
  getProceduresByCategory(category: 'acta' | 'tramite'): Procedure[] {
    return this.procedures.filter(p => p.category === category);
  }

  /** * Gets a single procedure by its label/name */
  getProcedureByLabel(label: string): Procedure | undefined {
    return this.procedures.find(p => p.label === label);
  }
}

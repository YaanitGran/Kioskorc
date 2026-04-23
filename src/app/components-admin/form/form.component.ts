import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBackOutline, saveOutline, trashOutline, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class FormComponent implements OnInit {
  /** 'add', 'edit', or 'delete' */
  @Input() actionType: string = '';
  /** 'tramites', 'juzgados', 'kioskos', or 'faq' */
  @Input() category: string = '';
  /** Data to populate if editing or deleting */
  @Input() data: any = null;

  @Output() onBack = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();

  dynamicForm!: FormGroup;
  isReadOnly: boolean = false;

  constructor(private fb: FormBuilder) {
    addIcons({ arrowBackOutline, saveOutline, trashOutline, addOutline });
  }

  ngOnInit() {
    this.isReadOnly = this.actionType === 'delete';
    this.initForm();
    
    if (this.data) {
      this.dynamicForm.patchValue(this.data);
    }

    if (this.isReadOnly) {
      this.dynamicForm.disable(); // Blocks all inputs for 'delete' mode
    }
  }

  /**
   * Initializes the form structure based on the database table
   */
  initForm() {
  const config: any = {};

  if (this.category === 'tramites') {
    config['id_tramite'] = [{value: '', disabled: true}];
    config['nombre'] = ['', Validators.required];
    config['descripcion'] = ['', Validators.required];
    config['id_costo'] = ['', Validators.required]; // Llave foránea a tabla costo
  } 
  else if (this.category === 'juzgados') {
    config['id_juzgado'] = [{value: '', disabled: true}];
    config['nombre'] = ['', Validators.required];
    config['alcaldia'] = ['', Validators.required];
    config['telefono'] = [''];
    config['direccion'] = ['', Validators.required];
    config['latitud'] = ['', Validators.required];
    config['longitud'] = ['', Validators.required];
    config['horario_atencion'] = [''];
    config['estado'] = ['activo'];
  }
  else if (this.category === 'kioskos') {
    config['id_kiosco'] = [{value: '', disabled: true}];
    config['numero_serie'] = ['', Validators.required];
    config['ubicacion_fisica'] = ['', Validators.required];
    config['estado'] = ['activo']; // ENUM('activo', 'mantenimiento', 'inactivo')
  }
  else if (this.category === 'faq') {
    config['id_pregunta'] = [{value: '', disabled: true}];
    config['pregunta'] = ['', Validators.required];
    config['respuesta'] = ['', Validators.required];
    config['categoria'] = ['General']; // Para clasificar las dudas
  }
  // En form.component.ts, dentro de initForm()
else if (this.category === 'administradores') {
    config['id_administrador'] = ['', [Validators.required, Validators.pattern('^[0-9]*$')]];
    config['nombre'] = ['', Validators.required];
    config['ap_paterno'] = ['', Validators.required];
    config['ap_materno'] = ['']; 
    config['contrasena'] = ['', [Validators.required, Validators.minLength(6)]];
  }

  this.dynamicForm = this.fb.group(config);
}

  submit() {
    if (this.dynamicForm.valid || this.isReadOnly) {
      // Return rawValue to include disabled fields if necessary
      this.onSave.emit(this.dynamicForm.getRawValue());
    }
  }
}
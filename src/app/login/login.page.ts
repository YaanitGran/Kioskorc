import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AdminHomeComponent } from '../components-admin/admin-home/admin-home.component';
import { ListComponent } from '../components-admin/list/list.component';
import { FormComponent } from '../components-admin/form/form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule, CommonModule, FormsModule, ReactiveFormsModule,
    HeaderComponent, FooterComponent, AdminHomeComponent, 
    ListComponent, FormComponent
  ]
})
export class LoginPage implements OnInit {
  adminViewState: string = 'login'; 
  selectedCategory: string = '';
  currentAction: string = '';
  selectedItem: any = null;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      adminId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  onLogin() {
    if (this.loginForm.valid) {
      const { adminId, password } = this.loginForm.value;
      // Por ahora validación local, luego será con BD
      if (adminId == 1 && password === 'admin123') {
        this.adminViewState = 'admin-home';
      } else {
        alert('ID o contraseña incorrectos');
      }
    }
  }

  /** Mueve la vista al formulario de registro de admin */
  goToRegister() {
    this.selectedCategory = 'administradores';
    this.currentAction = 'add';
    this.adminViewState = 'register';
  }

  openCategoryList(category: string) {
    this.selectedCategory = category;
    this.adminViewState = 'admin-list';
  }

  handleListAction(event: {type: string, data?: any}) {
    this.currentAction = event.type;
    this.selectedItem = event.data; 
    this.adminViewState = 'form';
  }
}
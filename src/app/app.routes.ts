import { Routes } from '@angular/router';
import { AdminTableComponent } from './admin-table/admin-table.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { StudentHomeComponent } from './pages/student-home/student-home.component';
import { StudentInscriptionsComponent } from './pages/student-inscriptions/student-inscriptions.component';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';
import { CreateClassComponent } from './pages/teacher-home/components/create-class/create-class.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo : 'login',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Inicio de sesion'
    },
    {
        path: 'registro',
        component: RegisterComponent,
        title: 'Registro'
    },
    {
        path: 'student-home',
        component: StudentHomeComponent,
        title: 'Home'
    },
    {
        path: 'student-incriptions',
        component: StudentInscriptionsComponent,
        title: 'Clases inscritas'
    },
    {
        path: 'admin-table',
        component: AdminTableComponent,
        title: 'Admin Table'
    },
    {
        path: 'teacher-home',
        component: TeacherHomeComponent,
        title: 'Home'
    },
    {
        path: 'create-class',
        component: CreateClassComponent,
        title: 'Crear clase'
    }
];

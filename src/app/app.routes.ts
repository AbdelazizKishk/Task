import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    title: 'Dashboard',
  },
  {
    path: 'vacancies',
    loadComponent: () =>
      import('./components/vacancies/vacancies.component').then(
        (m) => m.VacanciesComponent
      ),
    title: 'vacancies',
  },
  {
    path: 'seafarers',
    loadComponent: () =>
      import('./components/seafarers/seafarers.component').then(
        (m) => m.SeafarersComponent
      ),
    title: 'Seafarers',
  },
  {
    path: 'vessels',
    loadComponent: () =>
      import('./components/vessels/vessels.component').then(
        (m) => m.VesselsComponent
      ),
    title: 'vessels',
  },
  {
    path: 'pre-joining',
    loadComponent: () =>
      import('./components/pre-joining/pre-joining.component').then(
        (m) => m.PreJoiningComponent
      ),
    title: 'pre-joining',
  },
  {
    path: 'planning',
    loadComponent: () =>
      import('./components/planning/planning.component').then(
        (m) => m.PlanningComponent
      ),
    title: 'planning',
  },
  {
    path: 'payroll',
    loadComponent: () =>
      import('./components/payroll/payroll.component').then(
        (m) => m.PayrollComponent
      ),
    title: 'payroll',
  },
  {
    path: 'reports',
    loadComponent: () =>
      import('./components/reports/reports.component').then(
        (m) => m.ReportsComponent
      ),
    title: 'reports',
  },
  {
    path: 'setting',
    loadComponent: () =>
      import('./components/setting/setting.component').then(
        (m) => m.SettingComponent
      ),
    title: 'setting',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
    title: 'Error',
  },
];

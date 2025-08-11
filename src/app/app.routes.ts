import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'movies', pathMatch: 'full' },
    { path: 'movies', loadChildren: () => import('./movies/movie.routes').then(m => m.movieRoutes) },
    { path: 'auth', loadChildren: () => import('./auth/auth.route').then(m => m.authRoutes) },
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.route').then(m => m.dashboardRoutes), canActivate: [authGuard] },
];
